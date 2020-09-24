import Form from '../export';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { getFormData, IForm } from 'metaforms';
import { storiesOf } from '@storybook/react';
import { ButtonField, CheckboxField, GroupField, SubmitField, TextAreaField, TextField } from './interfaces';
import { Checkbox, Group, Input, Submit, Textarea } from './components';

type Form1 = IForm<{
  name: TextField;
  button: ButtonField;
  agree: CheckboxField;
  'my-textarea': TextAreaField;
  'first-group': GroupField<{ 'inline-button': ButtonField; 'inline-input': TextField }>;
  actions: GroupField<{ submit: SubmitField }>;
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
    legend: 'Inline group Label',
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
  actions: {
    type: 'group',
    fields: {
      submit: {
        label: 'Submit',
        type: 'submit',
      },
    },
  },
};

const FormStory = ({ form }: { form: Form1 }) => {
  const [fields, onFieldsChange] = React.useState<Form1>(form);

  const handleFieldChange = (state: Form1) => {
    action('onFieldsChange')(getFormData(state));
    onFieldsChange(state);
  };

  return (
    <Form<Form1>
      form={fields}
      onFormChange={handleFieldChange}
      onSubmit={(data, formData) => action('submit')(data, formData)}
      components={({ name, component, ref, actions, groupChildren }) => {
        switch (component.type) {
          case 'text':
            return <Input ref={ref} name={name} {...component} {...actions} />;
          case 'submit':
            return <Submit name={name} {...component} {...actions} />;
          case 'group': {
            return <Group {...component} children={groupChildren} />;
          }
          case 'checkbox':
            return <Checkbox ref={ref} name={name} {...component} {...actions} />;
          case 'button':
            return <button>{component.label}</button>;
          case 'textarea':
            return <Textarea ref={ref} name={name} {...component} {...actions} />;
          default:
            return;
        }
      }}
    />
  );
};

storiesOf('Nested Form', module).add('nested form', () => <FormStory form={fields1} />);
