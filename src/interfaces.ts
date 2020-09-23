import * as React from 'react';
import { Field, IForm, Optional, ValueOf } from 'metaforms';

export type Components<T> = (props: {
  name: keyof T;
  component: ValueOf<T>;
  ref: React.Ref<any>;
  actions: { update: any; validate: any; updateAndValidate: any };
}) => Optional<React.ReactNode>;

export type FormProps<T extends Field> = {
  onFormChange: (state: IForm<T>) => void;
  form: IForm<T>;
  components: Components<T>;
  onSubmit: (form: IForm<T>) => void;
};
