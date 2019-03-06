import { FieldType } from '../export';
import {
    Required,
    MinLength,
    MaxLength,
    MustBeEqual,
    InList,
    Pattern,
    NotPattern,
    MustMatch,
    MustMatchCaseInsensitive,
} from './types';
import { FormData, Optional, Value } from '../types';

const isEmpty = (value: Value, rule: Required): Optional<string> => {
    const errorMessage = rule.rules[0].message;
    return value === null || value === undefined || value === '' ? errorMessage : undefined;
};

const getErrorIfDoesNotMatchRegEx = (value: Value, rule: Pattern): Optional<string> => {
    if (value && typeof value === 'boolean') {
        return undefined;
    }
    if (!value || value.length === 0) {
        return undefined;
    }

    const messages = rule.rules
        .filter(pattern => value.match(pattern.value) === null)
        .map(pattern => pattern.message);

    return (messages.length > 0) ? messages[0] : undefined;
};

const getErrorIfMatchesRegEx = (value: Value, rule: NotPattern): Optional<string> => {
    if (value && typeof value === 'boolean') {
        return undefined;
    }

    if (!value || value.length === 0) {
        return undefined;
    }

    const errors = rule.rules
        .filter(pattern => value.match(pattern.value) !== null)
        .map(pattern => pattern.message);

    return (errors.length > 0) ? errors[0] : undefined;
};

const isNotEqualToExpectedValue = (value: Value, rule: MustBeEqual): Optional<string> => {
    const first = rule.rules[0];
    if (typeof value === 'boolean') {
        return value !== first.value ? first.message : undefined;
    }
    return undefined;
};

const isInList = (value: Value, rule: InList): Optional<string> => {
    const first = rule.rules[0];

    return first.value.indexOf(value) > -1 ? undefined : first.message;
};

const isGreaterThanMaxLength = (value: Value, rule: MaxLength): Optional<string> => {
    const first = rule.rules[0];
    if (value && typeof value === 'string') {
        return value.length > first.value ? first.message : undefined;
    }
    return undefined;
};

const isLessThanMinLength = (value: Value, rule: MinLength): Optional<string> => {
    const first = rule.rules[0];
    if (value && typeof value === 'string') {
        return value.length < first.value ? first.message : undefined;
    }
    return undefined;
};

const mustMatch = (value: Value, rule: MustMatch, formData: {}): Optional<string> => {
    const first = rule.rules[0];
    const name = first.value;

    return formData[name] && formData[name] !== value ? first.message : undefined;
};

const mustMatchCaseInsensitive = (value: Value, rule: MustMatchCaseInsensitive, formData: {}): Optional<string> => {
    const first = rule.rules[0];

    const name = first.value;
    if (value && typeof value === 'string') {
        return formData[name] && formData[name].toLowerCase() !== value.toLowerCase() ? first.message : undefined;
    }
    return undefined;
};

const validate = (formData: FormData, field: FieldType): Optional<string> => {
    const errorMessages = (field.validation || [])
        .map((rule) => {
            switch (rule.type) {
                case 'required':
                    return isEmpty(field.value, rule);

                case 'minlength':
                    return isLessThanMinLength(field.value, rule);

                case 'maxlength':
                    return isGreaterThanMaxLength(field.value, rule);

                case 'mustbeequal':
                    return isNotEqualToExpectedValue(field.value, rule);

                case 'inlist':
                    return isInList(field.value, rule);

                case 'pattern':
                    return getErrorIfDoesNotMatchRegEx(field.value, rule);

                case 'notpattern':
                    return getErrorIfMatchesRegEx(field.value, rule);

                case 'mustmatch':
                    return mustMatch(field.value, rule, formData);

                case 'mustmatchcaseinsensitive':
                    return mustMatchCaseInsensitive(field.value, rule, formData);

                default:
                    return undefined;
            }
        })
        .filter(error => error !== null);

    return errorMessages.length > 0 ? errorMessages[0] : undefined;
};

export default validate;
