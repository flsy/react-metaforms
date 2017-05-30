import React, { createElement } from 'react';
import PropTypes from 'prop-types';

import Input from '../fields/Input';
import Textarea from '../fields/Textarea';
import Checkbox from '../fields/Checkbox';
import Button from '../fields/Button';
import InlineGroup from '../groups/InlineGroup';
import CollapsingGroup from '../groups/CollapsingGroup';

const getComponent = (props, customComponents) => {
  const component = customComponents && customComponents[props.type];
  if (component) {
    return createElement(component, props);
  }

  switch (props.type) { // todo: use the 'types' constant in <Input />
    case 'text':
    case 'email':
    case 'password':
      return <Input {...props} />;
    case 'textarea':
      return <Textarea {...props} />;
    case 'checkbox':
      return <Checkbox {...props} />;
    case 'button':
    case 'submit':
      return <Button {...props} />;
    case 'inlineGroup':
      return <InlineGroup {...props} />;
    case 'collapsingGroup':
      return <CollapsingGroup {...props} />;
    default:
      return null;
  }
};

getComponent.propTypes = {
  type: PropTypes.string.isRequired,
};

export default getComponent;
