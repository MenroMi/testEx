// basic
import { Component } from 'react';

// plugins
import { v4 as uuidv4 } from 'uuid';

// services
import Products from '../service/resources';

// components
import ModalWindow from "../modal/Modal"
import Card from '../card/Card';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

// styles
import './App.css';
import Main from '../main/Main';


class App extends Component {

    products = new Products(); // class instance with request method


    state = {
        colors: [], // data with items
        modalColor: {}, // selected item when modal open
        disabled: true, // modal off or on
        currentPage: 1,
        itemsPerPage: 5,
        totalPages: null, // data from server
    }

    // in mounting get request on server and create listener on key button "escape"
    componentDidMount() {
        this.getProducts();
        document.addEventListener("keydown", this.closeModalWindow, false);
    }

    // in unmounting remove listener from escape
    componentWillUnmount() {
        document.removeEventListener("keydown", this.closeModalWindow, false);
    }

    // after select one of item app open modal with info
    openModalWindow = (chosenCard) => {
        let arrCard = Object.entries(chosenCard);

        this.setState(() => {
            return {
                disabled: false,
                modalColor: arrCard
            }
        });

    }

    // after click on cross or escape or click on overlay modal window is closed
    closeModalWindow = (e) => {
        if (e.key === 'Escape' || e.target.id === "crossClose" || e.target.className === "overlay") {
            this.setState({ disabled: true });
        }
    }

    // get request on server
    getProducts = async () => {
        await this.products.getProducts().then(this.onChangeData).catch();
    }

    // change state of data after mounting
    onChangeData = (req) => {
        const { data, total } = req;
        const { itemsPerPage } = this.state;
        const totalPages = Math.ceil(total / itemsPerPage);
        const newData = [];


        for (let i = 0; i < total / data.length; i++) {
            newData.push(...data);
        }

        this.setState(() => ({
            colors: [...newData],
            totalPages
        }))
    }

    // output available data on page
    addElementOnTable = (data) => {
        return data.map((item) => {
            return <Card
                {...item}
                key={uuidv4()}
            />
        })
    }

    // change page by user after click button prev or next
    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    }

    render() {

        const { disabled, colors, modalColor, totalPages,
            itemsPerPage, currentPage } = this.state;

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;

        const details = this.addElementOnTable(colors.slice(indexOfFirstItem, indexOfLastItem));

        return (
            <>
                <ErrorBoundary>
                    <Main
                        openWin={this.openModalWindow}
                        details={details}
                        colors={colors.slice(indexOfFirstItem, indexOfLastItem)}
                        handlePageChange={this.handlePageChange}
                        totalPages={totalPages}
                    />
                </ErrorBoundary>

                <ModalWindow
                    disabled={disabled}
                    closeWin={this.closeModalWindow}
                    item={modalColor} />

            </>
        )
    }
}

export default App;