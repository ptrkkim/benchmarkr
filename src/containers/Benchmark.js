import React, { Component } from 'react';
import CandidateInput from '../components/CandidateInput';
import CandidateResults from '../components/CandidateResults';
import getRankings from './utils/rankingUtils';

class Benchmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      validId: true,
      commPercentile: 0,
      codePercentile: 0,
    };
  }

  handleChange = (evt) => {
    this.setState({
      inputValue: evt.target.value,
    });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { candidates, companies } = this.props; // eslint-disable-line
    const candidateId = +this.state.inputValue;

    // show validation error if lookup attempt on nonexistent candidate
    if (!candidates[candidateId]) {
      this.setState({
        validId: false,
        commPercentile: 0,
        codePercentile: 0,
      });
    } else {
      const [commPercentile, codePercentile] = getRankings(candidateId, candidates, companies);
      this.setState({
        validId: true,
        commPercentile,
        codePercentile,
      });
    }
  }

  render() {
    const { commPercentile, codePercentile, validId } = this.state;
    const resultsCalculated = commPercentile !== 0 && codePercentile !== 0;
    const results = resultsCalculated
      ? (
        <CandidateResults
          commPercentile={commPercentile}
          codePercentile={codePercentile}
        />)
      : null;

    return (
      <section className="bench-container">
        <CandidateInput
          validId={validId}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        {results}
      </section>
    );
  }
}


export default Benchmark;
