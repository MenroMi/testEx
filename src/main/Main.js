// basics
import { Component } from 'react';

// components
import Filter from '../filter/Filter';


class Main extends Component {

    render() {

        const { details, endedElement, colors, onChangePage } = this.props;

        return (
            <>
                <Filter
                    items={colors}
                    openModalWithInfo={this.props.openWin}
                />
                <ul className="list">
                    {details}
                </ul>
                <button
                    className='button'
                    style={{
                        display: `${endedElement ? 'none' : 'block'}`
                    }}
                    onClick={() => onChangePage(2)}
                >Click me</button>
            </>
        )
    }
}

export default Main;