// basics
import { Component } from "react";

// plugins
import { v4 as uuidv4 } from "uuid";

// styles
import "./Filter.css";

class Filter extends Component {

    state = {
        search: "",
        focus: false,
        item: null
    }

    onChangeValue = (e) => {
        let value = e.target.value
        let pattern = /(?=(.*[a-zA-Z]))|(?=.*[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])/;

        if (pattern.test(e.target.value)) {
            return;
        }

        this.setState({ search: value });
        this.props.onFilter(value);
    }

    onVisibleLinks = () => {
        this.setState({ focus: true });
    }
    onUnvisibleLinks = (e) => {
        let target = e.nativeEvent.explicitOriginalTarget;
        this.setState({ focus: false, search: '' });


        if (parseInt(target.id) || target.parentElement.tagName.toLowerCase() === "li") {
            this.onModalWindow(e);
        }

    }

    onFocusItem = (e) => {
        const value = parseInt(e.target.id);
        this.setState({ item: value, search: e.target.textContent });
    }


    onChangeDropdownList = (data) => {

        const { focus } = this.state;

        if (!data || data.length === 0) {
            return;
        }

        return data.map(({ color, id, name, year, ...item }) => {
            return <li
                onMouseMove={this.onFocusItem}
                style={
                    {
                        display: focus ? "block" : "none",
                        backgroundColor: this.state.item === +id ? color : "none",
                        color: this.state.item === +id ? "white" : "black"
                    }
                }
                key={uuidv4()}
                id={id}
                color={color}
                {...item}
            >{id}. {color} - {year}</li>
        })

    }

    onModalWindow = (e) => {
        const { data } = this.props;
        const { item } = this.state;
        let chosenCard = data.filter(el => +el.id === item);
        this.props.onModal(e, chosenCard);
    }


    render() {

        const { search } = this.state;
        const { data } = this.props;
        const dropdownList = this.onChangeDropdownList(data);

        return (
            <div className="filter">
                <div className="filter__dropdown"
                    onFocus={this.onVisibleLinks}
                >
                    <label htmlFor="search">
                        <input
                            id="search"
                            name="search"
                            value={search}
                            onChange={this.onChangeValue}
                            onBlur={this.onUnvisibleLinks}

                            placeholder="Search item..." />
                        <ul className="filter__dropdown-item"

                        >
                            {dropdownList}
                        </ul>
                    </label>
                </div>
            </div>
        )
    }

}

export default Filter;