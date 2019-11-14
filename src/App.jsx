import React, {Component} from 'react'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: [],
            isLoading: false
        }
    }
    componentDidMount() {
        this.setState({isLoading: true})
        fetch('http://localhost:3004/employees')
            .then(response => response.json())
            .then(data => this.setState({ employee: data }))
            .then(()=>this.setState({isLoading: false}));
    }

    render() {
        return (<div>
            <h1>Minimal React</h1>
            <h3>Lab6</h3>
            Data: {this.state.isLoading ? "Loading..." : ""}
            <hr/>
            {this.state.employee.length}


        </div>);
    }
}

export default App