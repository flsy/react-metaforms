import * as React from 'react';
import {
  shouldComponentFocus,
  Field,
  validateForm,
  hasError,
  update,
  validate,
  updateAndValidate,
  getFormData,
  ValueOf,
} from 'metaforms';
import { FormProps } from '../interfaces';
import { useRef } from 'react';

const usePrevious = <T extends Field>(value: T) => {
  const ref = useRef<T>({} as T);
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default <T extends Field>(props: FormProps<T>) => {
  const inputRefs: { [name: string]: any } | {} = {};
  const prevForm = usePrevious(props.form);

  React.useEffect(() => {
    if (!Object.keys(prevForm).length && Object.keys(props.form).length) {
      resolveFocusedField();
    }
  }, [props.form]);

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
      props.onSubmit({ form: validated, formData: getFormData(validated) });
    }
  };

  const getComponent = <F extends Field>([name, component]: [keyof F, ValueOf<F>]): React.ReactNode => {
    if (!component) {
      return null;
    }
    const stringName = name.toString();
    inputRefs[stringName] = React.createRef();

    const properties: any = {
      name: stringName,
      component,
      ref: (el: any) => {
        inputRefs[stringName].current = el;
      },
      groupChildren: component.fields
        ? Object.entries(component.fields).map(([nestedName, nestedComponent]) => {
            return getComponent([`${name}.${nestedName}`, nestedComponent]);
          })
        : null,
      actions: {
        update: (path: string, value: F['value']) => {
          props.onFormChange(update(path.split('.'), value, props.form) as any);
        },
        validate: (path: string) => {
          props.onFormChange(validate(path.split('.'), props.form) as any);
        },
        updateAndValidate: (path: string, value: F['value']) => {
          props.onFormChange(updateAndValidate(path.split('.'), value, props.form) as any);
        },
      },
    };

    return props.components(properties);
  };

  if (!props.form) {
    return null;
  }

  return <form onSubmit={onSubmit}>{Object.entries(props.form).map(getComponent)}</form>;
};
