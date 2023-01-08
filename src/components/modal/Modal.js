// styles
import { Component } from "react";
import "./Modal.css";

// plugins
import { v4 as uuidv4 } from 'uuid';

// images
import cross from "./cross50.png";

class ModalWindow extends Component {

    componentDidUpdate(prevProps) {
        if (prevProps.item !== this.props.item) {
            this.dataFromCard(this.props.item);
        }
    }

    dataFromCard = (arr) => {
        return arr.map((item) => {

            if (item.includes("label")) {
                return null;
            }

            return (<li className="descr-line" key={uuidv4()}>
                <span className="descr-line__text">
                    {item[0]}: {item[1]}
                </span>
            </li>)
        })
    }

    render() {
        const { disabled, closeWin, item } = this.props;
        const details = disabled ? null : this.dataFromCard(item);
        const color = disabled ? null : item[0][1];
        return (
            <div
                style={{ display: disabled ? 'none' : 'block' }}
                className="overlay"
                onClick={closeWin}
            >
                <div className="modal-window">
                    <ul className="modal-window__info">
                        {details}
                    </ul>
                    <div className="modal-window__card" style={{
                        backgroundColor: color
                    }}>{color}</div>
                    <a
                        onClick={closeWin}
                        className="cross"
                        href="#top"><img id="crossClose" src={cross} alt="Cross for exit" /></a>

                </div>
            </div>
        )
    }
}

export default ModalWindow;
