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
      validId: true,
    });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { candidates, companies } = this.props; // eslint-disable-line
    const candidateId = this.state.inputValue;

    // show validation error if lookup attempt on nonexistent candidate
    if (!candidates[candidateId]) {
      this.setState({
        valid: false,
      });
    } else {
      const [communicationRank, codingRank] = getRankings(candidateId, candidates, companies);
      this.setState({
        validId: true,
        communicationRank,
        codingRank,
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
      <section>
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
