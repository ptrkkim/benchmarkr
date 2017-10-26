import React, { Component } from 'react';
import { getCandidatesData, getCompaniesData } from './utils/dataUtils';
import Benchmark from '../containers/Benchmark';
import { app, appHeader } from './Main.css';

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
      this.setState({
        candidates,
        companies,
      });
    });
  }

  render() {
    const trendyAppName = 'BENCHMARKR';

    return (
      <main className={app}>
        <header className={appHeader}>
          <h2>{trendyAppName}</h2>
        </header>
        <Benchmark
          candidates={this.state.candidates}
          companies={this.state.companies}
        />
      </main>
    );
  }
}

export default Main;
