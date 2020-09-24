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
  getFormData,
} from 'metaforms';
import { FormProps } from '../interfaces';

export default <T extends Field>(props: FormProps<T>) => {
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
      props.onSubmit(validated, getFormData(validated));
    }
  };

  const getComponent = <F extends Field>([name, component]: [keyof F, ValueOf<F>]): React.ReactNode => {
    const stringName = name.toString();
    inputRefs[stringName] = React.createRef();

    const properties: any = {
      name: stringName,
      component,
      ref: inputRefs[stringName],
      groupChildren: component.fields
        ? Object.entries(component.fields).map(([nestedName, nestedComponent]) => {
            return getComponent([`${name}.${nestedName}`, nestedComponent]);
          })
        : null,
      actions: {
        update: (path: string, value: ValueOf<T>['value']) => {
          props.onFormChange(update(path.split('.'), value, props.form) as any);
        },
        validate: (path: string) => {
          props.onFormChange(validate(path.split('.'), props.form) as any);
        },
        updateAndValidate: (path: string, value: ValueOf<T>['value']) => {
          props.onFormChange(updateAndValidate(path.split('.'), value, props.form) as any);
        },
      },
    };

    return props.components(properties);
  };

  return <form onSubmit={onSubmit}>{Object.entries(props.form).map(getComponent)}</form>;
};
