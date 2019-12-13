import * as React from 'react';
import { ErrorMessage, Label } from '../index';
import { isRequired } from 'metaforms';
import { TextAreaProps } from '../../export';

const Textarea = React.forwardRef((props: TextAreaProps, ref: React.Ref<HTMLTextAreaElement>) => {
  const { label, name, validation, placeholder, value, disabled, update, validate, groupName, errorMessage } = props;

  return (
    <div>
      {label ? <Label fieldId={name} label={label} isRequired={isRequired(validation)} /> : null}
      <textarea
        ref={ref}
        id={name}
        name={name}
        placeholder={placeholder}
        defaultValue={value}
        disabled={disabled}
        onChange={e => update({ name, value: e.target.value, groupName })}
        onBlur={() => validate({ name })}
      />
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
    </div>
  );
});

export default Textarea;
