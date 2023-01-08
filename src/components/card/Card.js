// basics
import { Component } from "react";
// styles
import "./Card.css";

class Card extends Component {

    render() {

        const { name, color } = this.props;

        return (
            <li className="list__card" style={{
                backgroundColor: `${color}`
            }}>
                {name}
            </li>
        )
    }
}

export default Card;