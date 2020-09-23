import * as React from 'react';
import {
  shouldComponentFocus,
  Field,
  validateForm,
  hasError,
  update,
  validate,
  updateAndValidate,
  ValueOf,
} from 'metaforms';
import { FormProps } from '../interfaces';

const Form = <T extends Field>(props: FormProps<T>) => {
  const inputRefs: { [name: string]: any } | {} = {};

  React.useEffect(() => {
    resolveFocusedField();
    // eslint-disable-next-line
  }, []);

  const resolveFocusedField = () => {
    const focused = shouldComponentFocus(props.form || {});
    if (focused && inputRefs[focused] && inputRefs[focused].current) {
      inputRefs[focused].current.focus();
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validated = validateForm(props.form);

    props.onFormChange(validated);
    if (!hasError(validated)) {
      props.onSubmit(validated);
    }
  };

  const getComponent = ([name, component]: [string, ValueOf<T>]): React.ReactNode => {
    inputRefs[name] = React.createRef();

    if (component.fields) {
      return Object.entries(component.fields).map(([nestedName, nestedComponent]) => {
        return getComponent([[name, nestedName], nestedComponent] as any);
      });
    }

    return props.components({
      name,
      component,
      ref: inputRefs[name],
      actions: {
        update: (path: string | string[], value: ValueOf<T>['value']) => {
          const updated = update(path, value, props.form);
          props.onFormChange(updated as any);
        },
        validate: (path: string | string[]) => props.onFormChange(validate(path, props.form) as any),
        updateAndValidate: (path: string | string[], value: ValueOf<T>['value']) =>
          props.onFormChange(updateAndValidate(path, value, props.form) as any),
      },
    });
  };

  return <form onSubmit={onSubmit}>{Object.entries(props.form).map(getComponent as any)}</form>;
};

export default Form;
