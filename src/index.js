import React from 'react';
import ReactDOM from 'react-dom';
import Form from './Form';
import './index.css';
import { form } from './example';


const onSubmit = (formData) => console.log('submitted', formData)

ReactDOM.render(
  <Form id="testForm" fields={form} onSubmit={onSubmit} />,
  document.getElementById('root')
);
