import React, { Component } from "react";

interface IState {
    message: string;
}

class Bootstrap extends Component<{}, IState> {
    constructor(props: {}) {
        super(props);

        this.onButtonClick = this.onButtonClick.bind(this);

        this.state = {
            message: "Hello",
        };
    }

    onButtonClick() {
        this.setState({ message: "You clicked on button" });
    }

    render() {
        const { message } = this.state;

        return (
            <div>
                <button onClick={this.onButtonClick}>Button</button>
                {message}
            </div>
        );
    }
};

export default Bootstrap;