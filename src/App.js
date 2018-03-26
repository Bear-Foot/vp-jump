import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

const levelFormat = {
  startPosition: { x: 0, y: 0 },
  wrappingBox: { width: 1000, height: 1000 },
  blocks: [{ width: 100, height: 100, x: 200, y: 300 }],
  finishPoint: {
    radius: 20,
    x: 900,
    y: 900,
  },
  avatarSize: { width: 80, height: 160 },
  fps: 40,
  moveMultiplier: 1,
  jumpForce: 20,
  gravityForce: 1,
}