import React, { Component } from 'react'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: [],
            isFormHidden: true,
            userToAdd_isActive:'true',
            userToAdd_age: '2',
            userToAdd_name:'Pluto',
            userToAdd_company:'Alpha',
            userToAdd_email:'pluto@alpha.com',
            isSaving: false,
            id: 0,
            isLoading: false
        }

        this.addEmployeeButtonOnClickHandler = this.addEmployeeButtonOnClickHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.cancelHandler = this.cancelHandler.bind(this);
        this.userToAddIsActiveOnChangeHandler = this.userToAddIsActiveOnChangeHandler.bind(this);
        this.userToAddAgeOnChangeHandler = this.userToAddAgeOnChangeHandler.bind(this);
        this.userToAddNameOnChangeHandler = this.userToAddNameOnChangeHandler.bind(this);
        this.userToAddCompanyOnChangeHandler = this.userToAddCompanyOnChangeHandler.bind(this);
        this.userToAddEmailOnChangeHandler = this.userToAddEmailOnChangeHandler.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.load = this.load.bind(this);
    }


    userToAddIsActiveOnChangeHandler(e) {
        this.setState({userToAdd_isActive: e.target.value})
    }

    userToAddAgeOnChangeHandler(e) {
        this.setState({userToAdd_age: e.target.value})
    }

    userToAddNameOnChangeHandler(e) {
        this.setState({userToAdd_name: e.target.value})
    }

    userToAddCompanyOnChangeHandler(e) {
        this.setState({userToAdd_company: e.target.value})
    }

    userToAddEmailOnChangeHandler(e) {
        this.setState({userToAdd_email: e.target.value})
    }

    addEmployeeButtonOnClickHandler(e) {
        this.setState({
            isFormHidden: false
        })
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
            .then(()=>this.load());
        this.setState({id: 0})
    }

    submitHandler(e) {
        this.setState({isSaving: true})
        //alternative to fetch is 'axios' - benefit - add error handling
        fetch('http://localhost:3004/employees', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({isActive: this.state.userToAdd_isActive,
                age: this.state.userToAdd_age,
                name: this.state.userToAdd_name,
                company: this.state.userToAdd_company,
                email: this.state.userToAdd_email
            })})
            .then(()=>this.setState({isSaving: false}))
            .then(()=>this.load())
            .then(()=>this.setState({isFormHidden: true}));
    }

    cancelHandler(e) {
        this.setState((prevState, props) => ({
            isFormHidden: true,
            userToAdd_isActive: 'true',
            userToAdd_age: 1,
            userToAdd_name: 'baby',
            userToAdd_company: 'MOON',
            userToAdd_email: 'baby@moon.com'
        }))
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

    addNewUserTemplate() {
        return (<>{
            this.state.isFormHidden ? "" :
            <>
                Active: <input value={this.state.userToAdd_isActive} onChange={this.userToAddIsActiveOnChangeHandler}/><br/>
                Age: <input value={this.state.userToAdd_age} onChange={this.userToAddAgeOnChangeHandler}/><br/>
                Name: <input value={this.state.userToAdd_name} onChange={this.userToAddNameOnChangeHandler}/><br/>
                Company: <input value={this.state.userToAdd_company} onChange={this.userToAddCompanyOnChangeHandler}/><br/>
                Emails: <input value={this.state.userToAdd_email} onChange={this.userToAddEmailOnChangeHandler}/><br/>

                <button name="Submit" onClick={this.submitHandler} disabled={this.state.isSaving}>Submit</button>
                <button name="Cancel" onClick={this.cancelHandler} disabled={this.state.isSaving}>Cancel</button><br/>
                {this.state.isSaving ? "SAVING" : ""}
            </>
        }</>)
    }

    render() {
        const addNewUser = this.addNewUserTemplate()

        return (<div>
            <h1>Minimal React</h1>
            <h3>Lab6</h3>
            Data: {this.state.isLoading ? "Loading..." : ""}
            <hr/>
            {this.state.employee.length}
            <hr/>
            <h3>Lab6 Task 2</h3>
            Add an “Add employee” button that will show a form to add a new employee
            (all fields served from the API are editable except the id)
            and a button to submit or cancel (hides the form)
            <hr/>
            {this.state.isFormHidden && !this.state.isLoading ?
                <button name="Add employee" onClick={this.addEmployeeButtonOnClickHandler}>
                    Add employee</button> : ""
            }
            {addNewUser}
            <hr/>
            Add a “Delete” button that will delete an employee from the list by
            calling the DELETE endpoint on /employees/:id.When the employee is
            being deleted the whole row for the employee should show “Deleting
            …” and then the list should be reloaded.
            <hr/>
            so i need list
            <hr/>
            {this.state.employee.map(employee => <li key={employee.id}>{employee.name}
            <button name={employee.id}
                    onClick={this.deleteHandler}
                    hidden={this.state.isSaving || this.state.isLoading}
                    disabled={this.state.isDeleting || this.state.isSaving || this.state.isLoading}>Delete</button>
            </li>)}

        </div>);
    }
}

export default App