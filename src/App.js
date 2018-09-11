import React, { Component } from 'react';
import './App.css';
import MiniSweeper from './minesweeper/minesweeper';
import Options from './options/options';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Options/>
        <MiniSweeper/>
      </div>
    );
  }
}

export default App;
