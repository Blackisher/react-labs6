import React, { Component } from 'react'
import PageEmployee from "./PageEmployee";
import PageEmployeesList from "./PageEmployeesList";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (<div>
            <h1>Minimal React</h1>
            <h3>Lab8</h3>
            <PageEmployeesList/>
            <PageEmployee/>
        </div>);
    }
}

export default App