import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ label, type, disabled, tooltip, action }) => (
  <div className="formField">
    <button
      disabled={disabled}
      type={type}>{label}</button>
  </div>
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  tooltip: PropTypes.string,
  action: PropTypes.shape({
    type: PropTypes.string.isRequired,
    payload: PropTypes.string.isRequired,
  }),
};

Button.defaultProps = {
  disabled: false,
};

export default Button;