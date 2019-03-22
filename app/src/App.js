import React, { Component } from 'react';
import Projects from './containers/Projects';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello</h1>
        <Projects />
      </div>
    );
  }
}

export default App;
