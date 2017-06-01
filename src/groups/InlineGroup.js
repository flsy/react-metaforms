import React from 'react';
import PropTypes from 'prop-types';
import GroupFields from './GroupFields';
import GroupHeader from './GroupHeader';

const InlineGroup = ({ id, legend, components, className }) => (
  <div>
    <GroupHeader id={id} legend={legend} />
    <GroupFields components={components} className={`inline-group-fields ${className}`} />
  </div>
);

InlineGroup.propTypes = {
  id: PropTypes.string.isRequired,
  legend: PropTypes.string,
  components: PropTypes.arrayOf(PropTypes.node),
  className: PropTypes.string,
};

InlineGroup.defaultProps = {
  components: [],
  legend: null,
  className: '',
};

export default InlineGroup;
