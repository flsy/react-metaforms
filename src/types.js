/* @flow */

export type Name = string;
export type Value = string | number;

export type State = {
  // [name: Name]: {
  //   value: Value,
  //   errorMessage: string,
  // }
};

export type FormData = {
  [name: Name]: Value
};

export type Validation = {};

export type Field = {
  name: Name,
  value? :Value,
  errorMessage? : string,
  validation? : Validation[],
  fields? : Field[]
}
