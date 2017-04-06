import React, { PropTypes } from 'react';
import Label from '../fields/Label';
import GroupFields from './GroupFields';

const InlineGroup = ({ id, legend, components }) => (
  <div>
    <Label fieldId={id} label={legend} />
    <GroupFields components={components} className="inline-group-fields" />
  </div>
);

InlineGroup.propTypes = {
  id: PropTypes.string.isRequired,
  legend: PropTypes.string.isRequired,
  components: PropTypes.arrayOf(PropTypes.node)
};

InlineGroup.defaultProps = {
  components: []
};

export default InlineGroup;