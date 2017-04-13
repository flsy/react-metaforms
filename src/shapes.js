import PropTypes from 'prop-types';
import 'react';

export const fieldShape = PropTypes.shape({
  id: PropTypes.string.isRequired
});

export const validationShape = PropTypes.shape({
  type: PropTypes.string.isRequired,
  rules: PropTypes.array // todo
});
