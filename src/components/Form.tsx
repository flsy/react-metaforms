import * as React from 'react';
import { map } from 'fputils';
import {
  hasError,
  validateForm,
  updateAndValidate,
  validate,
  update,
  shouldComponentFocus,
  FieldType,
  UpdateActionType,
  ValidateActionType,
  UpdateAndValidateActionType, Optional,
} from 'metaforms';
import { Input, Textarea, Checkbox, Submit, Group, Select } from './index';
import { CustomComponentProps } from '../export';

export type Props = {
  id: string;
  onFieldsChange: (state: FieldType[]) => void;
  fields?: FieldType[];
  getComponent?: (props: CustomComponentProps) => Optional<React.ReactNode>;
  onSubmit: (fields: FieldType[]) => void;
};

const Form: React.FC<Props> = ({ id, fields = [], onFieldsChange, onSubmit, ...props }) => {
  const inputRefs: { [name: string]: any } | {} = {};

  React.useEffect(() => {
    resolveFocusedField();
    // eslint-disable-next-line
  }, []);

  const resolveFocusedField = () => {
    const focused = shouldComponentFocus(fields);
    if (focused && inputRefs[focused] && inputRefs[focused].current) {
      inputRefs[focused].current.focus();
    }
  };

  const thisUpdate = ({ name, value, groupName }: UpdateActionType) => {
    onFieldsChange(update({ name, value, groupName }, fields));
  };

  const thisValidate = ({ name }: ValidateActionType) => {
    onFieldsChange(validate({ name }, fields));
  };

  const thisUpdateAndValidate = ({ name, value, groupName }: UpdateAndValidateActionType) => {
    onFieldsChange(updateAndValidate({ name, value, groupName }, fields));
  };

  const thisOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validated = validateForm(fields);

    onFieldsChange(validated);

    if (!hasError(validated)) {
      onSubmit(validated);
    }
  };

  const getComponent = (field: FieldType, groupName?: string) => {
    if (props.getComponent) {
      const customProps: CustomComponentProps = {
        ...field,
        groupName,
        key: field.name,
        children: field.fields ? map((c) => getComponent(c, field.name), field.fields) : [],
        update: thisUpdate,
        validate: thisValidate,
        updateAndValidate: thisUpdateAndValidate,
      };
      const component = props.getComponent(customProps);
      if (component) {
        return component;
      }
    }

    inputRefs[field.name] = React.createRef();

    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
      case 'datetime-local':
      case 'password':
        return (
          <Input
            key={field.name}
            {...field}
            ref={inputRefs[field.name]}
            groupName={groupName}
            update={thisUpdate}
            validate={thisValidate}
          />
        );
      case 'textarea':
        return (
          <Textarea
            key={field.name}
            {...field}
            ref={inputRefs[field.name]}
            groupName={groupName}
            update={thisUpdate}
            validate={thisValidate}
          />
        );
      case 'checkbox':
        return (
          <Checkbox
            key={field.name}
            {...field}
            ref={inputRefs[field.name]}
            groupName={groupName}
            updateAndValidate={thisUpdateAndValidate}
          />
        );
      case 'select':
        return (
          <Select
            key={field.name}
            {...field}
            ref={inputRefs[field.name]}
            groupName={groupName}
            updateAndValidate={thisUpdateAndValidate}
          />
        );

      case 'submit':
        return <Submit key={field.name} {...field} groupName={groupName} />;

      case 'group':
        return (
          <Group key={field.name} name={field.name} type="group" legend={field.legend}>
            {map((c) => getComponent(c, field.name), field.fields)}
          </Group>
        );

      default:
        return null;
    }
  };

  return (
    <form id={id} onSubmit={thisOnSubmit}>
      {map(getComponent, fields)}
    </form>
  );
};

export default Form;
