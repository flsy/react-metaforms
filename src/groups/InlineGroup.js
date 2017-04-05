import React, { PropTypes } from 'react';
import getComponent from '../utils/getComponent';

const InlineGroup = ({id, legend, fields, update, validate, getErrorMessage, getValue}) => (
    <div className="formField">
        {fields.map(field => getComponent({...field,
            key: field.id,
            value: getValue,
            update,
            validate,
            errorMessage: getErrorMessage
        }))}
    </div>
);

export default InlineGroup;