import React, { Component } from 'react'
import {
    Link
} from "react-router-dom";

class PageEmployeesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employee: [],
            isFormHidden: true,
            userToAdd_isActive: 'true',
            userToAdd_age: '2',
            userToAdd_name: 'Pluto',
            userToAdd_company: 'Alpha',
            userToAdd_email: 'pluto@alpha.com',
            isSaving: false,
            id: 0,
            isLoading: false
        }
        this.deleteHandler = this.deleteHandler.bind(this);
        this.load = this.load.bind(this);
    }

    deleteHandler(e) {
        this.setState({id: e.target.name})
        this.setState({isDeleting: true})
        fetch('http://localhost:3004/employees/' + e.target.name, {
            method: 'DELETE',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({id: e.target.name
            })})
            .then(()=>this.setState({isDeleting: false}))
            .then(()=>this.load())
            .then(()=>this.setState({id: 0}));
    }

    load() {
        this.setState({isLoading: true})
        //alternative to fetch is 'axios' - benefit - add error handling
        fetch('http://localhost:3004/employees')
            .then(response => response.json())
            .then(data => this.setState({ employee: data }))
            .then(()=>this.setState({isLoading: false}));
    }

    componentDidMount() {
        this.load()
    }

    employeesList() {
        return (<>
            Data: {this.state.isLoading ? "Loading..." : ""}
            <hr/>
            {this.state.employee.length}
            {this.state.employee.map(employee => employee.id === this.state.id ? <li>Deleting ...</li> : <li key={employee.id}>{employee.name}
                <button name={employee.id}
                        onClick={this.deleteHandler}
                        hidden={this.state.isSaving || this.state.isLoading}
                        disabled={this.state.isDeleting || this.state.isSaving || this.state.isLoading}>Delete</button>
            </li>)}
        </>)
    }

    render() {
        const employeesList = this.employeesList()
        return (<>
            {employeesList}
            <hr/>
            <Link to="/new"><button>Create new employee</button></Link>
        </>);
    }

}

export default PageEmployeesList