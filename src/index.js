/* eslint-disable */

import React from 'react';
import { render } from 'react-dom';
import Form from './Form';
import './index.css';
import { form } from './example';

const onSubmit = formData => console.log('submitted', formData);

const customComponents = {
  message: props => (<div className="formField"><i>{props.value}</i></div>),
  group: ({ id, legend, components, className }) => (
    <div style={{background:'lightblue'}}>
      {components.map(component => <span key={component.key}>{component}</span>)}
    </div>),
};

render(
  <Form
    id="testForm"
    fields={form}
    onBtnClick={(action) => console.log(`btn action: ${action}`)}
    onSubmit={onSubmit}
    customComponents={customComponents} />,
  document.getElementById('root')
);
