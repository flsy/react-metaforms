import { Value } from 'metaforms';

export const isString = (value: Value): value is string => typeof value === 'string';
export const isNumber = (value: Value): value is number => typeof value === 'number';
export const isBoolean = (value: Value): value is boolean => typeof value === 'boolean';
export const isDate = (value: Value): value is Date => value instanceof Date;
