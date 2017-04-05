import React, { PropTypes } from 'react';

const ErrorMessage = ({ message }) => (
    !!message ? <div className="error-message">{message}</div> : null
);

ErrorMessage.propTypes = {
    message: PropTypes.string,
};

ErrorMessage.defaultProps = {
    message: null,
};

export default ErrorMessage;