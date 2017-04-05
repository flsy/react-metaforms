import React, { PropTypes } from 'react';

const Button = ({ id, label, type, disabled, tooltip, action }) => (
  <div className="formField">
    <button
      id={id}
      disabled={disabled}
      type={type}>{label}</button>
  </div>
);

Button.propTypes = {
  id: PropTypes.string.isRequired,
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