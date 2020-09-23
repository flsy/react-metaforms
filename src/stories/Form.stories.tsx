import Form from '../export';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { getFormData, IForm } from 'metaforms';
import { storiesOf } from '@storybook/react';
import {
  ButtonField,
  CheckboxField,
  GroupField,
  SelectField,
  SubmitField,
  TextAreaField,
  TextField,
} from './interfaces';
import { Checkbox, Group, Input, Submit, Textarea } from './components';

type Form1 = IForm<{
  name: TextField;
  button: ButtonField;
  agree: CheckboxField;
  'my-textarea': TextAreaField;
  'first-group': GroupField<{ 'inline-button': ButtonField; 'inline-input': TextField }>;
  submit: SubmitField;
}>;

export const fields1: Form1 = {
  name: {
    type: 'text',
    label: 'Name',
    validation: [
      {
        type: 'required',
        message: 'This field is required.',
      },
    ],
  },
  button: {
    label: 'Button example',
    type: 'button',
  },
  agree: {
    type: 'checkbox',
    label: 'Agree ?',
  },
  'my-textarea': {
    type: 'textarea',
    value: 'Text area',
  },
  'first-group': {
    type: 'group',
    legend: 'Inline group',
    fields: {
      'inline-button': {
        type: 'button',
        label: 'Inline Button',
      },
      'inline-input': {
        type: 'text',
        label: 'Inline Input',
        validation: [
          {
            type: 'required',
            message: 'Please choose a inline text value',
          },
        ],
      },
    },
  },
  submit: {
    label: 'Submit',
    type: 'submit',
  },
};

export const fields2: IForm<{ name: TextField; submit: SubmitField }> = {
  name: {
    label: 'Name',
    type: 'text',
    value: 'banana',
  },
  submit: {
    type: 'submit',
  },
};

export const fields3: IForm<{ name: TextField; groups: SelectField; submit: SubmitField }> = {
  name: {
    label: 'Name',
    type: 'text',
    value: 'banana',
  },
  groups: {
    type: 'select',
    options: [{ value: 'first' }, { value: 'second', label: 'Second' }],
  },
  submit: {
    label: 'Submit',
    type: 'submit',
  },
};

interface IProps {
  form: IForm<any>;
}

const FormStory = ({ form }: IProps) => {
  const [fields, onFieldsChange] = React.useState(form);

  const handleFieldChange = (state: IProps['form']) => {
    action('onFieldsChange')(getFormData(state));
    onFieldsChange(state);
  };

  return (
    <Form<Form1>
      form={fields}
      onFormChange={handleFieldChange}
      onSubmit={(data) => action('submit')(getFormData(data))}
      components={({ name, component, ref, actions }) => {
        switch (component.type) {
          case 'text':
            return <Input ref={ref} name={name} {...component} {...actions} />;
          case 'submit':
            return <Submit name={name} {...component} {...actions} />;
          case 'group':
            return <Group {...component} />;
          case 'checkbox':
            return <Checkbox ref={ref} name={name} {...component} {...actions} />;
          case 'button':
            return <button>{component.label}</button>;
          case 'textarea':
            return <Textarea ref={ref} name={name} {...component} {...actions} />;
        }
      }}
    />
  );
};

storiesOf('Form', module)
  .add('example 1', () => <FormStory form={fields1} />)
  .add('example 2', () => <FormStory form={fields2} />)
  .add('example 3', () => <FormStory form={fields3} />);
