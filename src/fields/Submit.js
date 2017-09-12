import React from 'react';
import PropTypes from 'prop-types';

const Submit = ({ label, disabled }) => (
  <div className="formField">
    <button
      disabled={disabled}
      type="submit"
    >
      {label}
    </button>
  </div>
);

Submit.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

Submit.defaultProps = {
  disabled: false,
};

export default Submit;
