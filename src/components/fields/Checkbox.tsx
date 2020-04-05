import * as React from 'react';
import { CheckBoxProps } from '../../export';
import { Label, ErrorMessage } from '../index';
import { isRequired } from 'metaforms';

const Checkbox = React.forwardRef((props: CheckBoxProps, ref: React.Ref<HTMLInputElement>) => {
  return (
    <div>
      {props.label && <Label fieldId={props.name} label={props.label} isRequired={isRequired(props.validation)} />}
      <input
        ref={ref}
        id={props.name}
        name={props.name}
        type="checkbox"
        disabled={props.disabled}
        defaultChecked={props.value || false}
        onChange={(event) =>
          props.updateAndValidate({ name: props.name, value: event.target.checked, groupName: props.groupName })
        }
      />
      {props.errorMessage ? <ErrorMessage message={props.errorMessage} /> : null}
    </div>
  );
});

export default Checkbox;
