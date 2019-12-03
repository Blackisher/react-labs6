import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import PageEmployee from "./PageEmployee";
import PageEmployeesList from "./PageEmployeesList";

class App extends Component {

    render() {
        return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <PageEmployeesList></PageEmployeesList>
                </Route>
                <Route exact path="/new">
                    <PageEmployee></PageEmployee>
                </Route>
            </Switch>
        </Router>);
    }
}

export default App