// basics
import { Component } from 'react';

// components
import Filter from '../filter/Filter';

// styles
import "./Main.css"

class Main extends Component {

    onChangePage = (e) => {
        e.preventDefault();
        const arrow = e.target.id;
        const { totalPages, currentPage } = this.props;

        let pageValue = currentPage;

        if (arrow === "prev") {
            pageValue = currentPage - 1 !== 0 ? currentPage - 1 : 1;
        }

        if (arrow === "next") {
            pageValue = currentPage !== totalPages ? currentPage + 1 : totalPages;
        }

        this.props.handlePageChange(pageValue);

    }

    render() {

        const { details, onFilter, err, load, color, onModal } = this.props;
        return (
            <main>
                <Filter
                    onFilter={onFilter}
                    data={color}
                    onModal={onModal}
                />
                {load}
                {err}
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