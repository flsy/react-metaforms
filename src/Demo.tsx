/* tslint:disable:no-console */

import * as React from 'react';
import Form, { ButtonProps, FieldType } from './export';
import { getFormData } from 'metaforms';

const fields1: FieldType[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    validation: [
      {
        type: 'required',
        rules: [
          {
            message: 'This field is required.',
          },
        ],
      },
    ],
  },
  {
    name: 'button',
    label: 'Button example',
    type: 'button',
  },
  {
    name: 'agree',
    type: 'checkbox',
    label: 'Agree ?',
  },
  {
    name: 'my-textarea',
    type: 'textarea',
    value: 'Text area',
  },
  {
    type: 'group',
    name: 'first-group',
    legend: 'Inline group', // optional
    fields: [
      {
        name: 'inline-button',
        label: 'Inline Button',
        type: 'button',
      },
      {
        type: 'text',
        name: 'inline-input',
        label: 'Inline Input',
        validation: [
          {
            type: 'required',
            rules: [
              {
                message: 'Please choose a inline text value',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'submit',
    type: 'submit',
  },
];

const fields2: FieldType[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    value: 'banana',
  },
  {
    name: 'submit',
    type: 'submit',
  },
];

const submit = (props: ButtonProps) => (
  <button type="submit" style={{ margin: '10px 0' }}>
    {props.label} [OK] Custom button
  </button>
);

const Demo = () => {
  const [fields, onFieldsChange] = React.useState<FieldType[]>(fields1);

  return (
    <div>
      <button onClick={() => onFieldsChange(fields1)}>form 1</button>
      <button onClick={() => onFieldsChange(fields2)}>form 2</button>

      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid' }}>
        <div style={{ padding: '10px' }}>
          <Form
            id="demo-form"
            fields={fields}
            onFieldsChange={onFieldsChange}
            onSubmit={formData => console.log('onSubmit', formData)}
            onButtonClick={(field, fs) => console.log('onButtonClick', field, fs)}
            customComponents={{ submit }}
          />
        </div>
        <div style={{ padding: '10px', borderLeft: '1px solid' }}>
          <pre>{JSON.stringify(getFormData(fields), null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default Demo;
