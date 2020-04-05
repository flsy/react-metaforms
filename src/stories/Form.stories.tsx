import Form, { ButtonProps, FieldType } from '../export';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { getFormData } from 'metaforms';
import { storiesOf } from '@storybook/react';

export const fields1: FieldType[] = [
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

export const fields2: FieldType[] = [
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

export const fields3: FieldType[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    value: 'banana',
  },
  {
    name: 'groups',
    type: 'select',
    options: [{ value: 'first' }, { value: 2, label: 'Second' }],
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

interface IProps {
  fieldsDefault: FieldType[];
}

const FormStory = ({ fieldsDefault }: IProps) => {
  const [fields, onFieldsChange] = React.useState<FieldType[]>(fieldsDefault);

  const handleFieldChange = (state: FieldType[]) => {
    action('onFieldsChange')(getFormData(fields));
    onFieldsChange(state);
  };

  return (
    <Form
      id="demo-form"
      fields={fields}
      onFieldsChange={handleFieldChange}
      onSubmit={action('submit')}
      onButtonClick={action('button click')}
      customComponents={{ submit }}
    />
  );
};

storiesOf('Form', module)
  .add('example 1', () => <FormStory fieldsDefault={fields1} />)
  .add('example 2', () => <FormStory fieldsDefault={fields2} />)
  .add('example 3', () => <FormStory fieldsDefault={fields3} />);
