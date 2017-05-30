import React from 'react';
import PropTypes from 'prop-types';
import GroupFields from './GroupFields';
import GroupHeader from './GroupHeader';

const InlineGroup = ({ id, name, legend, components }) => (
  <div>
    <GroupHeader id={id} legend={legend} />
    <GroupFields components={components} className="inline-group-fields" />
  </div>
);

InlineGroup.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  legend: PropTypes.string,
  components: PropTypes.arrayOf(PropTypes.node)
};

InlineGroup.defaultProps = {
  components: []
};

export default InlineGroup;
