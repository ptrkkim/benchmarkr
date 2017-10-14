import React, { Component } from 'react';
import logo from './logo.svg';
import { app, appLogo, appHeader, appIntro } from './App.css';

class App extends Component {
  render() {
    return (
      <div className={app}>
        <div className={appHeader}>
          <img src={logo} className={appLogo} alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className={appIntro}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
