import { Component } from "react";

class ErrorBoundary extends Component {
    state = {
        error: null,
        errInfo: null,
    }

    componentDidCatch(error, errInfo) {
        this.setState({ error, errInfo })
    }

    render() {
        const { error } = this.state;

        if (error) {
            return (
                <div style={{ display: "block", textAlign: "center" }}>
                    <h2>Something went wrong</h2>
                    <h3 style={{
                        display: "block",
                        maxHeight: "200px",
                    }}>Please reload the page. If the error persists, contact the admins.
                        <br />
                    </h3>
                </div>
            )
        }

        return this.props.children;


    }

}

export default ErrorBoundary;