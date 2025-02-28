import React from "react";
import logo from "./logo.svg";
import "./App.css";

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() }
    }

    componentDidMount() {
        this.timerId = setInterval(
            () => this.tick(),
            1000
        )
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    tick () {
        this.setState({
            date: new Date()
        })
    }

    render() {
        return (
            <div>
                <h1> Текущее время {this.state.date.toLocaleTimeString()}</h1>
            </div>
        )
    }




}
export default Clock;
