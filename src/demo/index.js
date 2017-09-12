/* eslint-disable */

import React from 'react';
import Form from '../export';
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

export default () => (
  <Form
    id="testForm"
    fields={form}
    onButtonClick={(fields) => console.log("btn action:", fields)}
    onSubmit={onSubmit}
    customComponents={customComponents} />
)
