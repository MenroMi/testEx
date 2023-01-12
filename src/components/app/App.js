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
import Spinner from '../../spinnerLoading/Spinner';

// styles
import './App.css';
import Main from '../main/Main';


class App extends Component {

    products = new Products(); // class instance with request method

    constructor(props) {
        super(props);
        this.state = {
            colors: [], // data with items
            modalColor: {}, // selected item when modal open
            search: "",
            disabled: true, // modal off or on
            currentPage: 1, // current page on screen
            itemsPerPage: 5, // how much items should be on page
            totalPages: null, // data from server
            error: false,
            loading: true,
        }
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
    openModalWindow = (e, chosenCard = null) => {
        const { colors, currentPage, itemsPerPage } = this.state;

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const data = colors.slice(indexOfFirstItem, indexOfLastItem);
        const target = e.target.textContent;
        const card = data.filter(item => item.name === target);


        if (chosenCard) {
            const [arr] = chosenCard;

            let arrCard = Object.entries(arr);
            this.setState(() => {
                return {
                    disabled: false,
                    modalColor: arrCard
                }
            });
        } else {
            const [arr] = card;

            let arrCard = Object.entries(arr);
            this.setState(() => {
                return {
                    disabled: false,
                    modalColor: arrCard
                }
            });
        }

    }

    // change term value after user type
    updateTerm = (search) => {
        this.setState({ search });
    }

    // process filtering data
    onChangeData = (data) => {
        const { search } = this.state;

        if (search.length > 0 && typeof +search === "number") {
            let filterData = data.filter(item => item.id === parseInt(search));
            return filterData;
        } else {
            return data;
        }
    }

    // first process data from API
    reqData = (req) => {
        const { data, total } = req;
        const { itemsPerPage } = this.state;
        const totalPages = Math.ceil(total / itemsPerPage);

        const newData = [];
        for (let i = 0; i < Math.ceil(total / data.length); i++) {
            newData.push(...data);
        }
        this.setState(() => ({
            colors: [...newData],
            totalPages,
            loading: false
        }))
    }

    // after click on cross or escape or click on overlay modal window is closed
    closeModalWindow = (e) => {
        if (e.key === 'Escape' || e.target.id === "crossClose" || e.target.className === "overlay") {
            this.setState({ disabled: true });
        }
    }

    onErrorCatch = () => {
        this.setState({ error: true });
    }

    errorMessage = () => {
        return (
            <h2 style={{ gridColumn: "1/4", justifySelf: "center" }}>ERROR. Please contant with administration.</h2>
        )
    }

    // get request on server
    getProducts = async () => {
        try {
            await this.products.getProducts().then(this.reqData).catch(this.onErrorCatch);
        } catch {
            this.onErrorCatch();
        }
    }

    // // change state of data after mounting

    // output available data on page
    addElementOnTable = (data) => {
        return data.map((item) => {
            return <Card
                onOpenModal={this.openModalWindow}
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

        const {
            disabled,
            colors,
            modalColor,
            totalPages,
            itemsPerPage,
            currentPage,
            error,
            loading
        } = this.state;

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;

        const load = loading ? <Spinner /> : null;
        const errMessage = error ? this.errorMessage() : null;
        const details = !(loading || error) ? this.addElementOnTable(this.onChangeData(colors.slice(indexOfFirstItem, indexOfLastItem))) : null;
        const colorDropdownList = this.onChangeData(colors.slice(indexOfFirstItem, indexOfLastItem));

        return (
            <>
                <ErrorBoundary>

                    <Main
                        onModal={this.openModalWindow}
                        onFilter={this.updateTerm}
                        details={details}
                        color={colorDropdownList}
                        handlePageChange={this.handlePageChange}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        load={load}
                        err={errMessage}
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