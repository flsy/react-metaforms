import React from 'react';
import PropTypes from 'prop-types';

const GroupFields = ({ components, className, rendered }) => (
  rendered ?
    <div className={className}>
      {components.map(component => <span key={component.key}>{component}</span>)}
    </div> : null
);

GroupFields.propTypes = {
  className: PropTypes.string,
  rendered: PropTypes.bool,
  components: PropTypes.arrayOf(PropTypes.node)
};

GroupFields.defaultProps = {
  components: [],
  className: "",
  rendered: true
};

export default GroupFields;