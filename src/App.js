import React, { Component } from 'react';
import './App.css';
import MiniSweeper from './minesweeper/minesweeper'

class App extends Component {
  render() {
    return (
      <div className="App">
        <MiniSweeper/>
      </div>
    );
  }
}

export default App;
