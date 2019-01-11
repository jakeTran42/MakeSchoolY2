import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/App.css';

// Components imports
import LinkList from './LinkList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <LinkList />
      </div>
    );
  }
}

export default App;
