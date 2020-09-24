import Form from '../export';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { getFormData, IForm } from 'metaforms';
import { storiesOf } from '@storybook/react';
import { SelectField, SubmitField, TextField } from './interfaces';
import { Input, Select, Submit } from './components';

type MyForm = IForm<{ name: TextField; groups: SelectField; submit: SubmitField }>;

export const myForm: MyForm = {
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
  form: MyForm;
}

const FormStory = ({ form }: IProps) => {
  const [fields, onFieldsChange] = React.useState(form);

  const handleFieldChange = (state: IProps['form']) => {
    action('onFieldsChange')(getFormData(state));
    onFieldsChange(state);
  };

  return (
    <Form<MyForm>
      form={fields}
      onFormChange={handleFieldChange}
      onSubmit={(data) => action('submit')(getFormData(data))}
      components={({ name, component, ref, actions }) => {
        switch (component.type) {
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

storiesOf('Form', module).add('example', () => <FormStory form={myForm} />);
