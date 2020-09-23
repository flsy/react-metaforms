import Form from '../export';
import React from 'react';
import { getFormData, IForm } from 'metaforms';
import { storiesOf } from '@storybook/react';
import { CheckboxField, SubmitField, TextField } from './interfaces';
import { Checkbox, Input, Submit } from './components';

type Form1 = IForm<{ name: TextField; hasAddress: CheckboxField; submit: SubmitField }>;
type Form2 = IForm<{ street: TextField; city: TextField; submit: SubmitField }>;
type Form3 = IForm<{ companyName: TextField; submit: SubmitField }>;

export const fieldConfig: [Form1, Form2, Form3] = [
  {
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
    hasAddress: {
      type: 'checkbox',
      label: 'I want to enter my address',
      value: false,
    },
    submit: {
      label: 'Continue',
      type: 'submit',
    },
  },
  {
    street: {
      label: 'Street',
      type: 'text',
    },
    city: {
      label: 'City',
      type: 'text',
    },
    submit: {
      label: 'Continue',
      type: 'submit',
    },
  },
  {
    companyName: {
      label: 'Company Name',
      type: 'text',
      value: 'banana',
    },
    submit: {
      label: 'Finish',
      type: 'submit',
    },
  },
];

const WizardStory = () => {
  const [values, setValues] = React.useState<object>([]);
  const [step, setStep] = React.useState<number>(0);
  const [fields, onFieldsChange] = React.useState<any>(fieldConfig[step]);

  const handleFieldChange = (state: IForm<any>) => {
    onFieldsChange(state);
  };

  const onSubmit = (f: IForm<any>) => {
    let nextStep = step + 1;

    if (getFormData(f).hasAddress === false) {
      nextStep = 2;
    }

    setStep(nextStep);
    onFieldsChange(fieldConfig[nextStep]);
    setValues({ ...values, ...getFormData(f) });
  };

  if (step > 2) {
    return (
      <>
        <div>
          <strong>values:</strong> {JSON.stringify(values)}
        </div>
      </>
    );
  }

  return (
    <Form<Form1>
      form={fields}
      onFormChange={handleFieldChange}
      onSubmit={onSubmit}
      components={({ name, component, ref, actions }) => {
        switch (component.type) {
          case 'text':
            return <Input ref={ref} name={name} {...component} {...actions} />;
          case 'checkbox':
            return <Checkbox ref={ref} name={name} {...component} {...actions} />;
          case 'submit':
            return <Submit name={name} {...component} {...actions} />;
        }
      }}
    />
  );
};

storiesOf('Wizard', module).add('basic usage', () => <WizardStory />);
