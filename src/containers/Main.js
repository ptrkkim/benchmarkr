import React, { Component } from 'react';
import { getCandidatesData, getCompaniesData } from './utils/dataUtils';
// import Benchmark from '../containers/Benchmark';
import { app, appHeader } from './App.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: {},
      companies: {},
    };
  }

  componentDidMount() {
    // consolidate data fetching into a single setState + re-render
    const allData = Promise.all([getCandidatesData(), getCompaniesData()]);
    allData.then(([candidates, companies]) => {
      console.log(candidates, companies);
      this.setState({
        candidates,
        companies,
      });
    });
  }

  render() {
    return (
      <main className={app}>
        <header className={appHeader}>
          <h2>Benchmarkr</h2>
        </header>
        {/* <Benchmark
          candidates={this.state.candidates}
          companies={this.state.companies}
        /> */}
      </main>
    );
  }
}

export default Main;
