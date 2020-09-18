import React, { Component } from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox'
import './App.css';

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('http://localhost:1337/profiles/')
            .then (response => response.json())
            .then (users => {this.setState({robots : users})})
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value  })
    }

    render() {

        const filteredRobots = this.state.robots.filter(robots => {
            return robots.Name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        })
        if ( this.state.robots.length === 0) {
            return <h1 className='tc f1'>Loading</h1>
        } else {
            return (
                <div className='tc' >
                    <h1 className='f1' >MR ROBOT</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <CardList robots = {filteredRobots} />
                </div>
            );
        }
    }
}

export default App;