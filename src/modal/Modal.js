// styles
import { Component } from "react";
import "./Modal.css";

class ModalWindow extends Component {

    // state = {
    //     disabled: false
    // }
    // componentDidMount() {
    //     this.changeDisabled(this.props.disabled);
    // }

    // changeDisabled = (bool) => {
    //     this.setState({ disabled: bool })
    // }

    render() {
        const { disabled } = this.props;
        console.log(disabled);
        return (
            <div style={{
                display: disabled ? 'none' : 'block'
            }} className="overlay">
                <div className="modal-window">

                </div>
            </div>
        )
    }
}

export default ModalWindow;
