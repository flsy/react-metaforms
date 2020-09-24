import * as React from 'react';
import { Field, Optional, ValueOf, FormData } from 'metaforms';

type AllKeys<T> = {
  [K in keyof T]: T[K] extends { fields: any } ? AllKeys<T[K]['fields']> : K;
}[keyof T];

type AllValues<T> = {
  [K in keyof T]: T[K] extends { fields: any } ? AllValues<T[K]['fields']> : ValueOf<T>;
}[keyof T];

interface Actions<Value> {
  update: (path: string, value: Value) => void;
  validate: (path: string) => void;
  updateAndValidate: (path: string, value: Value) => void;
}

export type ComponentProps<T> = {
  name: AllKeys<T>;
  component: AllValues<T>;
  ref: React.Ref<any>;
  actions: Actions<any>;
  groupChildren: React.ReactNode[] | null;
};

export type Components<T> = (props: ComponentProps<T>) => Optional<React.ReactNode>;

export type FormProps<T extends Field> = {
  onFormChange: (form: T) => void;
  form: T;
  components: Components<T>;
  onSubmit: (form: T, formData: FormData<T>) => void;
};
