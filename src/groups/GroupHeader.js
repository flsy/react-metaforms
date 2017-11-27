import React from 'react';
import PropTypes from 'prop-types';

import Label from '../fields/Label';

const GroupHeader = ({
  id, legend, action, buttonLabel,
}) => (
  <div>
    {legend ? <Label fieldId={id} label={legend} /> : null}
    {action ? <button type="button" onClick={() => action()}>{buttonLabel}</button> : null}
  </div>
);

GroupHeader.propTypes = {
  id: PropTypes.string.isRequired,
  legend: PropTypes.string,
  action: PropTypes.func,
  buttonLabel: PropTypes.string,
};

GroupHeader.defaultProps = {
  action: null,
  buttonLabel: '',
  legend: null,
};

export default GroupHeader;
