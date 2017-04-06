import React, { PropTypes } from 'react';
import Label from '../fields/Label';

const GroupHeader = ({ id, legend, action, buttonLabel }) => (
  <div>
    <Label fieldId={id} label={legend} />
    {action ? <button type="button" onClick={() => action()}>{buttonLabel}</button> : null}
  </div>
);

GroupHeader.propTypes = {
  id: PropTypes.string.isRequired,
  legend: PropTypes.string.isRequired,
  action: PropTypes.func,
  buttonLabel: PropTypes.string
};

GroupHeader.defaultProps = {
  action: null,
  buttonLabel: ""
};

export default GroupHeader;