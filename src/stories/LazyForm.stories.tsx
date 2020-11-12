import Form from '../export';
import React, { useEffect } from 'react';
import { action } from '@storybook/addon-actions';
import { getFormData, IForm } from 'metaforms';
import { storiesOf } from '@storybook/react';
import { CheckboxField, SelectField, SubmitField, TextField } from './interfaces';
import { Checkbox, Input, Select, Submit } from './components';

type MyForm = IForm<{ name: TextField; groups: SelectField; sendNewsLetter: CheckboxField; submit: SubmitField }>;

export const myForm: MyForm = {
  name: {
    label: 'Name',
    type: 'text',
  },
  groups: {
    type: 'select',
    options: [{ value: 'first' }, { value: 'second', label: 'Second' }],
  },
  sendNewsLetter: {
    type: 'checkbox',
    value: false,
  },
  submit: {
    label: 'Submit',
    type: 'submit',
  },
};

interface IProps {
  form: MyForm;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchFields = async (): Promise<any> => {
  await delay(1000);
  return myForm;
};

const FormStory = () => {
  const [fields, onFieldsChange] = React.useState<any>({});

  const handleFieldChange = (state: IProps['form']) => {
    action('onFieldsChange')(getFormData(state));
    onFieldsChange(state);
  };

  useEffect(() => {
    fetchFields().then(onFieldsChange);
  }, []);

  return (
    <Form
      form={fields}
      onFormChange={handleFieldChange}
      onSubmit={({ formData }) => action('submit')(formData)}
      components={({ name, component, ref, actions }) => {
        switch (component.type) {
          case 'checkbox':
            return <Checkbox ref={ref} name={name} {...component} {...actions} />;
          case 'select':
            return <Select ref={ref} name={name} {...component} {...actions} />;
          case 'text':
            return <Input ref={ref} name={name} {...component} {...actions} />;
          case 'submit':
            return <Submit name={name} {...component} {...actions} />;
          default:
            return;
        }
      }}
    />
  );
};

storiesOf('Lazy form', module).add('example', () => <FormStory />);
