import React, { PropTypes } from 'react';
import Label from '../fields/Label';
import GroupFields from './GroupFields';

const CollapsingGroup = ({ id, legend, isCollapsed, components }) => {
  return (
    <div>
      <Label fieldId={id} label={legend}/>
      <GroupFields components={components} rendered={!isCollapsed} className="collapsing-group-fields" />
    </div>
  );
};

CollapsingGroup.propTypes = {
  id: PropTypes.string.isRequired,
  legend: PropTypes.string.isRequired,
  components: PropTypes.arrayOf(PropTypes.node)
};

CollapsingGroup.defaultProps = {
  components: []
};

export default CollapsingGroup;