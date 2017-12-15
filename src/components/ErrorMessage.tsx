import * as React from 'react';

interface Props {
    message: string;
}

const ErrorMessage = ({ message }: Props) => (<div className="error-message">{message}</div>);

export default ErrorMessage;
