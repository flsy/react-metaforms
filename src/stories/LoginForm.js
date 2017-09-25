import React from 'react';
import PropTypes from 'prop-types';

import Form from '../export';

const fields = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    validation: [
      {
        type: 'required',
        rules: [
          {
            message: 'Please choose a username',
          },
        ],
      },
      {
        type: 'minlength',
        rules: [
          {
            value: 3,
            message: 'Your username should have min 3 chars',
          },
        ],
      },
    ],
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
  },
  {
    name: 'submit',
    label: 'Login',
    type: 'submit',
  },
];

const LoginForm = ({ onSubmit }) => (
  <Form
    id="testForm"
    fields={fields}
    onSubmit={onSubmit}
  />
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default LoginForm;

