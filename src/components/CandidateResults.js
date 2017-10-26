import React from 'react';
import PropTypes from 'prop-types';
import ResultDisplay from './ResultDisplay';
import { resultSection } from './candidateResult.css';

const CandidateResults = ({ commPercentile, codePercentile }) => {
  // extend as needed
  const categories = [
    { name: 'Communication', percentile: commPercentile },
    { name: 'Coding', percentile: codePercentile },
  ];

  const allResults = categories.map(category => (
    <ResultDisplay
      key={category.name}
      categoryName={category.name}
      percentile={category.percentile}
    />
  ));

  return (
    <section className={resultSection}>
      {allResults}
    </section>
  );
};

CandidateResults.propTypes = {
  commPercentile: PropTypes.number.isRequired,
  codePercentile: PropTypes.number.isRequired,
};

export default CandidateResults;
