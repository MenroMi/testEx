// basic
import { Component } from 'react';

// plugins
import { v4 as uuidv4 } from 'uuid';

// components
import Products from './service/resources';
import Card from './card/Card';
import Filter from './filter/Filter';
import ModalWindow from './modal/Modal';

// styles
import './App.css';


class App extends Component {

    products = new Products();


    state = {
        colors: [],
        page: null,
        totalPages: null,
        endedElement: false,
    }

    componentDidMount() {
        this.getProducts();

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

    addElementOnTable = (data) => {
        return data.map(({ ...item }) => {
            return <Card
                {...item}
                key={uuidv4()}
            />
        })
    }

    openModalWithInfo = (e) => {
        return
    }

    onChangePage = (page) => {

        if (page < this.state.totalPages) {
            this.setState({ page });
        } else {
            this.setState({ endedElement: true });
        }

        this.getProducts();

    }

    getProducts = async () => {

        await this.products.getProducts().then(this.onChangeData);
    }


    render() {


        const { colors, endedElement } = this.state;
        const details = this.addElementOnTable(colors);

        return (
            <>
                <ModalWindow disabled={false} />
                <Filter
                    items={colors}
                    openModalWithInfo={this.openModalWithInfo}
                />
                <ul className="list">
                    {details}
                </ul>
                <button
                    className='button'
                    style={{
                        display: `${endedElement ? 'none' : 'block'}`
                    }}
                    onClick={() => this.onChangePage(2)}
                >Click me</button>
            </>
        )
    }
}

export default App;