import * as React from 'react';
import { isRequired } from 'metaforms';
import { Label, ErrorMessage } from '../index';
import { SelectProps } from '../../export';

const Select = React.forwardRef((props: SelectProps, ref: React.Ref<HTMLSelectElement>) => {
  return (
    <div>
      {props.label && <Label fieldId={props.name} label={props.label} isRequired={isRequired(props.validation)} />}
      <select
        ref={ref}
        id={props.name}
        name={props.name}
        disabled={props.disabled}
        defaultValue={props.value || ''}
        onChange={(event) =>
          props.updateAndValidate({ name: props.name, value: event.target.value, groupName: props.groupName })
        }
      >
        {props.placeholder ? <option value="">{props.placeholder}</option> : null}
        {(props.options || []).map((option) => (
          <option value={option.value} key={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </select>
      {props.errorMessage ? <ErrorMessage message={props.errorMessage} /> : null}
    </div>
  );
});

export default Select;
