// basic
import { Component } from 'react';


// plugins
import { v4 as uuidv4 } from 'uuid';

// services
import Products from './service/resources';

// components
import ModalWindow from './modal/Modal';
import Card from './card/Card';

// styles
import './App.css';
import Main from './main/Main';


class App extends Component {

    products = new Products();


    state = {
        colors: [],
        modalColor: {},
        disabled: true,
        page: null,
        totalPages: null,
        endedElement: false,
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


    onChangeData = (newData) => {
        const { data, page, total_pages } = newData;

        this.setState(({ colors }) => {
            return {
                colors: [...colors, ...data],
                page,
                totalPages: total_pages
            }
        })
    }

    onChangePage = (page) => {

        if (page < this.state.totalPages) {
            this.setState({ page });
        } else {
            this.setState({ endedElement: true });
        }

        this.getProducts();

    }

    addElementOnTable = (data) => {
        return data.map(({ ...item }) => {
            return <Card
                {...item}
                key={uuidv4()}
            />
        })
    }

    render() {

        const { disabled, endedElement, colors, modalColor } = this.state;
        const details = this.addElementOnTable(colors);

        return (
            <>
                <Main
                    openWin={this.openModalWindow}
                    details={details}
                    endedElement={endedElement}
                    colors={colors}
                    onChangePage={this.onChangePage}
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