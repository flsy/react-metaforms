import React, { PropTypes } from 'react';
import Label from '../fields/Label';

const InlineGroup = ({ id, legend, components }) => (
  <div>
    <Label fieldId={id} label={legend} />
    <div className="inline-group-fields">
        {components.map(component => <span key={component.key}>{component}</span>)}
    </div>
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