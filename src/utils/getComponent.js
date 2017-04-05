import React from 'react';

import Text from '../fields/Text';
import Button from '../fields/Button';
import InlineGroup from '../groups/InlineGroup';

export default (props) => {
  switch (props.type) {
    case 'text':
    case 'password':
      return <Text {...props} />;
    case 'button':
    case 'submit':
      return <Button {...props} />;
    case 'inlineGroup':
        return <InlineGroup {...props} />;
    default:
      return null;
  }
};
