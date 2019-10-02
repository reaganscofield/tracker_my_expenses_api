import React, { Component } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import './App.css';



class App extends Component {
  render() {
    return (
      <div id="main">
       <Navigation />
       <div>
        <Dashboard />
       </div>
      </div>
    );
  }
}

export default App;
