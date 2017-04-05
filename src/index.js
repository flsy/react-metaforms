import React from 'react';
import ReactDOM from 'react-dom';
import Form from './Form';
import './index.css';
import { form } from './example';

ReactDOM.render(
  <Form id="testForm" fields={form} />,
  document.getElementById('root')
);
