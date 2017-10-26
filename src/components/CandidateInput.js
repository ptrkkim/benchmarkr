import React from 'react';
import PropTypes from 'prop-types';
import { error, inputSection, inputContainer, idInput, form, submit } from './candidateInput.css';

const CandidateInput = ({ validId, handleChange, handleSubmit }) => {
  const validationError = validId
    ? null
    : <div className={error}>We have no record of that candidate. Try another ID</div>;

  return (
    <section className={inputSection}>
      <form className={form} onSubmit={handleSubmit}>
        <div className={inputContainer}>
          <input
            className={idInput}
            onChange={handleChange}
            type="text"
            placeholder={'Enter your ID'}
          />
          {validationError}
        </div>
        <button className={submit} type="submit">BENCHMARK ME</button>
      </form>
    </section>
  );
};

CandidateInput.propTypes = {
  validId: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default CandidateInput;
