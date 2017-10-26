import React from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import { container, categoryHead, number, rankMsg, feedbackMsg } from './resultDisplay.css';

const createFeedback = (categoryName, percentile) => {
  const category = categoryName.toLowerCase();
  let feedback;

  if (percentile <= 0.4) {
    feedback = `That ain't good. You need to work on your ${category} skills...`;
  } else if (percentile >= 0.7) {
    feedback = `Yer a wizard!!! Your ${category} skills are solidly above average. Tell your parents. Hang this up on the fridge. Go you.`;
  } else {
    feedback = `Your ${category} skills are nice and average :)`;
  }

  return feedback;
};

const ResultDisplay = ({ categoryName, percentile }) => {
  const feedback = createFeedback(categoryName, percentile);
  const roundedPercentile = Math.round(+percentile * 100);

  return (
    <section className={container}>
      <header className={categoryHead}>
        <h3>{categoryName.toUpperCase()}</h3>
      </header>
      <div className={number}>
        <div className={rankMsg}>Your percentile rank:</div>
        <CountUp
          start={0}
          end={roundedPercentile}
          duration={2}
        />
      </div>
      <div className={feedbackMsg}>{feedback}</div>
    </section>
  );
};

ResultDisplay.propTypes = {
  categoryName: PropTypes.string.isRequired,
  percentile: PropTypes.number.isRequired,
};

export default ResultDisplay;
