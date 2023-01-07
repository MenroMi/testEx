// basics
import { Component } from "react";
import Select, { StylesConfig } from "react-select";

// styles
import "./Filter.css";

class Filter extends Component {


    state = {
        data: []
    }

    componentDidMount() {
        this.getInformationInSelect(this.props.items);

    }

    componentDidUpdate(prevProps) {
        if (prevProps.items !== this.props.items) {
            this.getInformationInSelect(this.props.items);

        }
    }

    getInformationInSelect = (data) => {

        this.setState({
            data: data.map(item => {
                const { color, id, name, year, pantone_value } = item;
                return {
                    color,
                    label: `${id}. ${name} - ${year}`,
                    id,
                    name,
                    year,
                    pantone_value
                }

            })
        })
    }

    render() {

        const { data } = this.state;


        const colourStyles = {
            control: (styles) => ({ ...styles, backgroundColor: 'white' }),
            option: (styles, { data, isDisabled, isFocused }) => {
                const color = data.color;
                return {
                    ...styles,
                    backgroundColor: isFocused ? color : "white",
                    color: isFocused ? 'white' : "black",
                    cursor: isDisabled ? 'not-allowed' : 'default',
                };

            },
        }

        return (
            <Select
                options={data}
                styles={colourStyles}
                onChange={this.props.openModalWithInfo}
                className="filter"
                placeholder="Search..."
                isSearchable={true}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: "5px",
                })}
            />
        )
    }
}

export default Filter;