import Form, { CustomComponentProps, FieldType } from '../export';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { getFormData } from 'metaforms';
import { storiesOf } from '@storybook/react';

export const form: FieldType[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    name: 'surname',
    label: 'Surname',
    // @ts-ignore
    type: 'tags',
  },
  {
    name: 'submit',
    type: 'submit',
  },
];

interface IProps extends CustomComponentProps {
  logme: (message: string) => void;
}
const Tags = (props: IProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const update = (value: string) => {
    props.logme(`my value: ${value}`);
    props.update({ name: props.name, value, groupName: props.groupName });
  };

  return (
    <div>
      <label>{props.label}</label>
      <input
        name={props.name}
        value={props.value as string}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => update(e.target.value)}
      />
      <div>
        {isOpen ? 'open' : 'closed'}
        <ul>
          <li>
            <button onClick={() => update('Hey')}>set Hey</button>
          </li>
          <li>
            <button onClick={() => update('Yo')}>set Yo</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

const FormStory: React.FC = () => {
  const [fields, onFieldsChange] = React.useState<FieldType[]>(form);

  const handleFieldChange = (state: FieldType[]) => {
    action('onFieldsChange')(getFormData(fields));
    onFieldsChange(state);
  };

  // tslint:disable-next-line:no-console
  const logme = console.log;

  return (
    <Form
      id="demo-form"
      fields={fields}
      onFieldsChange={handleFieldChange}
      onSubmit={action('submit')}
      getComponent={(props) => {
        if (props.type === 'tags') {
          return <Tags {...props} logme={logme} />;
        }
        return;
      }}
    />
  );
};

storiesOf('CustomComponents', module).add('example 1', () => <FormStory />);
