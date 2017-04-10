import React, { PropTypes } from 'react';

const ErrorMessage = ({ message }) => (<div className="error-message">{message}</div>);

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
};

export default ErrorMessage;