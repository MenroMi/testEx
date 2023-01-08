// basic
import { Component } from 'react';


// plugins
import { v4 as uuidv4 } from 'uuid';

// services
import Products from '../service/resources';

// components
import ModalWindow from "../modal/Modal"
import Card from '../card/Card';

// styles
import './App.css';
import Main from '../main/Main';


class App extends Component {

    products = new Products();


    state = {
        colors: [],
        modalColor: {},
        disabled: true,
        currentPage: 1,
        itemsPerPage: 5,
        totalPages: null,
    }

    componentDidMount() {
        this.getProducts();
        document.addEventListener("keydown", this.closeModalWindow, false);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.closeModalWindow, false);
    }

    openModalWindow = (chosenCard) => {
        let arrCard = Object.entries(chosenCard);

        this.setState(() => {
            return {
                disabled: false,
                modalColor: arrCard
            }
        });

    }

    closeModalWindow = (e) => {
        if (e.key === 'Escape' || e.target.id === "crossClose" || e.target.className === "overlay") {
            this.setState({ disabled: true });
        }
    }

    getProducts = async () => {
        await this.products.getProducts().then(this.onChangeData);
    }


    onChangeData = (req) => {
        const { data, total } = req;
        const { itemsPerPage } = this.state;
        const totalPages = Math.ceil(total / itemsPerPage);
        const newData = [];
        for (let i = 0; i < total / data.length; i++) {
            newData.push(...data);
        }

        this.setState(() => {
            return {
                colors: [...newData],
                totalPages
            }
        })
    }

    addElementOnTable = (data) => {
        return data.map((item) => {
            return <Card
                {...item}
                key={uuidv4()}
            />
        })
    }

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
                <Main
                    openWin={this.openModalWindow}
                    details={details}
                    colors={colors.slice(indexOfFirstItem, indexOfLastItem)}
                    handlePageChange={this.handlePageChange}
                    totalPages={totalPages}

                />
                <ModalWindow
                    disabled={disabled}
                    closeWin={this.closeModalWindow}
                    item={modalColor} />

            </>
        )
    }
}

export default App;