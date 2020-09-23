import * as React from 'react';
import { isRequired } from 'metaforms';
import { FieldProps, GroupFieldProps } from '../export';

const ErrorMessage = ({ message }: { message: string }) => <div className="error-message">{message}</div>;

const Asterisk = () => <span> *</span>;

const Label = (props: { fieldId: string; label: string; isRequired: boolean; children?: React.ReactChildren }) => (
  <label htmlFor={props.fieldId}>
    {props.label}
    {props.isRequired && <Asterisk />}
    {props.children}
  </label>
);

export const Input = React.forwardRef((props: FieldProps<string>, ref: React.Ref<HTMLInputElement>) => {
  return (
    <div>
      {props.label && <Label fieldId={props.name} label={props.label} isRequired={isRequired(props.validation)} />}
      <input
        ref={ref}
        id={props.name}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        defaultValue={props.value}
        onChange={(e) => props.update(props.name, e.target.value)}
        onBlur={() => props.validate(props.name)}
      />
      {props.errorMessage ? <ErrorMessage message={props.errorMessage} /> : null}
    </div>
  );
});

interface NumberInputProps extends FieldProps<number> {
  min?: number;
  max?: number;
}

export const NumberInput = React.forwardRef((props: NumberInputProps, ref: React.Ref<HTMLInputElement>) => {
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
        defaultValue={props.value}
        onChange={(e) => props.update(props.name, parseInt(e.target.value, 10))}
        onBlur={() => props.validate(props.name)}
      />
      {props.errorMessage ? <ErrorMessage message={props.errorMessage} /> : null}
    </div>
  );
});

export const Textarea = React.forwardRef((props: FieldProps<string>, ref: React.Ref<HTMLTextAreaElement>) => {
  const { label, name, validation, placeholder, value, update, validate, errorMessage } = props;

  return (
    <div>
      {label ? <Label fieldId={name} label={label} isRequired={isRequired(validation)} /> : null}
      <textarea
        ref={ref}
        id={name}
        name={name}
        placeholder={placeholder}
        defaultValue={value}
        onChange={(e) => update(name, e.target.value)}
        onBlur={() => validate(name)}
      />
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
    </div>
  );
});

export const Checkbox = React.forwardRef((props: FieldProps<boolean>, ref: React.Ref<HTMLInputElement>) => {
  return (
    <div>
      {props.label && <Label fieldId={props.name} label={props.label} isRequired={isRequired(props.validation)} />}
      <input
        ref={ref}
        id={props.name}
        name={props.name}
        type="checkbox"
        defaultChecked={props.value || false}
        onChange={(event) => props.updateAndValidate(props.name, event.target.checked)}
      />
      {props.errorMessage ? <ErrorMessage message={props.errorMessage} /> : null}
    </div>
  );
});
interface SelectProps extends FieldProps<string[]> {
  options: { value: string; label: string }[];
}
export const Select = React.forwardRef((props: SelectProps, ref: React.Ref<HTMLSelectElement>) => {
  return (
    <div>
      {props.label && <Label fieldId={props.name} label={props.label} isRequired={isRequired(props.validation)} />}
      <select
        ref={ref}
        id={props.name}
        name={props.name}
        defaultValue={props.value || ''}
        onChange={(event) => props.updateAndValidate(props.name, event.target.value)}
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

export const Group: React.FC<GroupFieldProps<any>> = ({ legend, children }) => {
  return (
    <div>
      <div>{legend ? legend : null}</div>
      {children}
    </div>
  );
};

export const Submit = ({ label, name }: FieldProps<null>) => (
  <button name={name} type="submit">
    {label || 'Submit'}
  </button>
);
