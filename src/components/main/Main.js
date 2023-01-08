// basics
import { Component } from 'react';

// components
import Filter from '../filter/Filter';

// styles
import "./Main.css"

class Main extends Component {

    state = {
        page: 1
    }

    onChangePage = (e) => {
        e.preventDefault();
        const arrow = e.target.id;
        const { page } = this.state;
        const { totalPages } = this.props;

        let pageValue = page;

        if (arrow === "prev") {
            pageValue = page - 1 !== 0 ? page - 1 : 1;
            this.setState(() => ({ page: page - 1 !== 0 ? page - 1 : 1 }))
        }

        if (arrow === "next") {
            pageValue = page !== totalPages ? page + 1 : totalPages;
            this.setState(() => ({ page: page !== totalPages ? page + 1 : totalPages }))
        }

        this.props.handlePageChange(pageValue);

    }

    render() {

        const { details, colors, openWin } = this.props;
        return (
            <main>
                <Filter
                    items={colors}
                    openModalWithInfo={openWin}
                />
                <ul className="list">
                    {details}
                </ul>
                <div className="buttons">
                    <a href="#top"
                        onClick={this.onChangePage}
                    ><button id='prev'>Previous</button></a>
                    <a href="#top"
                        onClick={this.onChangePage}
                    ><button id="next">Next</button></a>

                </div>
            </main>
        )
    }
}

export default Main;