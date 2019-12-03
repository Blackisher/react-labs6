import React, { Component } from 'react'


class PageEmployee extends Component {

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

        this.submitHandler = this.submitHandler.bind(this);
        this.cancelHandler = this.cancelHandler.bind(this);
        this.userToAddIsActiveOnChangeHandler = this.userToAddIsActiveOnChangeHandler.bind(this);
        this.userToAddAgeOnChangeHandler = this.userToAddAgeOnChangeHandler.bind(this);
        this.userToAddNameOnChangeHandler = this.userToAddNameOnChangeHandler.bind(this);
        this.userToAddCompanyOnChangeHandler = this.userToAddCompanyOnChangeHandler.bind(this);
        this.userToAddEmailOnChangeHandler = this.userToAddEmailOnChangeHandler.bind(this);
        this.addEmployeeButtonOnClickHandler = this.addEmployeeButtonOnClickHandler.bind(this);
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

    addNewUserTemplate() {
        return (<>
            {this.state.isFormHidden && !this.state.isLoading ?
                <button name="Add employee" onClick={this.addEmployeeButtonOnClickHandler}>
                    Add employee</button> : ""
            }
            {
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

    render() {
        const addNewUser = this.addNewUserTemplate()
        return (<>
            {addNewUser}
        </>);
    }

}

export default PageEmployee