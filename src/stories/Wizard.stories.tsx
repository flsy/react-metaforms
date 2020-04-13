import Form, { ButtonProps, FieldType } from '../export';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { getFormData } from 'metaforms';
import { storiesOf } from '@storybook/react';

export const fieldConfig: FieldType[][] = [
  [
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
      name: 'hasAddress',
      type: 'checkbox',
      label: 'I want to enter my address',
      value: false,
    },
    {
      name: 'submit',
      label: 'Continue',
      type: 'submit',
    },
  ],
  [
    {
      name: 'street',
      label: 'Street',
      type: 'text',
    },
    {
      name: 'city',
      label: 'City',
      type: 'text',
    },
    {
      name: 'submit',
      label: 'Continue',
      type: 'submit',
    },
  ],
  [
    {
      name: 'companyName',
      label: 'Company Name',
      type: 'text',
      value: 'banana',
    },
    {
      name: 'submit',
      label: 'Finish',
      type: 'submit',
    },
  ],
];

const submit = (props: ButtonProps) => (
  <button type="submit" style={{ margin: '10px 0' }}>
    {props.label}
  </button>
);

const WizardStory = () => {
  const [values, setValues] = React.useState<object>([]);
  const [step, setStep] = React.useState<number>(0);
  const [fields, onFieldsChange] = React.useState<FieldType[]>(fieldConfig[step]);

  const handleFieldChange = (state: FieldType[]) => {
    onFieldsChange(state);
  };

  const onSubmit = (f: FieldType[]) => {
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
    <Form
      id="demo-form"
      fields={fields}
      onFieldsChange={handleFieldChange}
      onSubmit={onSubmit}
      onButtonClick={action('button click')}
      customComponents={{ submit }}
    />
  );
};

storiesOf('Wizard', module).add('basic usage', () => <WizardStory />);
