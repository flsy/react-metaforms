import * as React from 'react';
import { ErrorMessage, Label } from '../index';
import { isRequired, Optional, Value } from 'metaforms';
import { NumberProps } from '../../export';
import { isBoolean, isDate, isString } from './utils';

const getValue = (value: Value): Optional<number> => {
  if (isDate(value)) {
    return value.getTime();
  }

  if (isString(value)) {
    return parseInt(value, 10);
  }

  if (isBoolean(value)) {
    return value ? 1 : 0;
  }

  return value;
};

const NumberInput = React.forwardRef((props: NumberProps, ref: React.Ref<HTMLInputElement>) => {
  return (
    <div>
      {props.label && <Label fieldId={props.name} label={props.label} isRequired={isRequired(props.validation)} />}
      <input
        ref={ref}
        id={props.name}
        type="number"
        name={props.name}
        placeholder={props.placeholder}
        min={props.min}
        max={props.max}
        value={getValue(props.value)}
        disabled={props.disabled}
        onChange={(e) => props.update({ name: props.name, value: e.target.value, groupName: props.groupName })}
        onBlur={() => props.validate({ name: props.name })}
        inputMode={props.inputMode}
      />
      {props.errorMessage ? <ErrorMessage message={props.errorMessage} /> : null}
    </div>
  );
});

export default NumberInput;
