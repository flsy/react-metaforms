export type Required = {
    type: 'required',
    rules: { message: string } []
};

export type MinLength = {
    type: 'minlength',
    rules: { value: number, message: string }[]
};

export type MaxLength = {
    type: 'maxlength',
    rules: { value: number, message: string }[]
};

export type MustBeEqual = {
    type: 'mustbeequal',
    rules: { value: boolean, message: string } []
};

export type InList = {
    type: 'inlist',
    rules: { value: string[], message: string } []
};

export type Pattern = {
    type: 'pattern',
    rules: { value: string, message: string } []
};

export type NotPattern = {
    type: 'notpattern',
    rules: { value: string, message: string } []
};

export type MustMatch = {
    type: 'mustmatch',
    rules: { value: string, message: string } []
};

export type MustMatchCaseInsensitive = {
    type: 'mustmatchcaseinsensitive',
    rules: { value: string, message: string } []
};

export type Validation =
    InList
    | MustBeEqual
    | Required
    | MinLength
    | MaxLength
    | Pattern
    | NotPattern
    | MustMatch
    | MustMatchCaseInsensitive;
