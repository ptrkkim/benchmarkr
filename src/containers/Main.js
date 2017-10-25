import React, { Component } from 'react';
import { getCandidatesData, getCompaniesData } from '../utils';
import { app, appHeader, appIntro } from './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: {},
      companies: {},
    };
  }

  componentDidMount() {
    const allData = Promise.all([getCandidatesData(), getCompaniesData()]);
    allData.then(([candidates, companies]) => {
      this.setState({
        candidates,
        companies,
      });
    });
  }

  render() {
    console.log('rendering!!!!!!!!!!!!!!!!!!!!');
    console.log('scores', this.state);

    return (
      <div className={app}>
        <div className={appHeader}>
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
