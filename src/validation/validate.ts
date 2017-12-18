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
import { FormData } from '../types';
import { FieldType } from '../components/fields/types';

const isEmpty = (value: string, rule: Required): string | null => {
    const errorMessage = rule.rules[0].message;
    return value === null || value === undefined || value === '' ? errorMessage : null;
};

const getErrorIfDoesNotMatchRegEx = (value: string, rule: Pattern): string | null => {
    if (!value || value.length === 0) {
        return null;
    }

    const messages = rule.rules
        .filter(pattern => value.match(pattern.value) === null)
        .map(pattern => pattern.message);

    return (messages.length > 0) ? messages[0] : null;
};

const getErrorIfMatchesRegEx = (value: string, rule: NotPattern): string | null => {
    if (!value || value.length === 0) {
        return null;
    }

    const errors = rule.rules
        .filter(pattern => value.match(pattern.value) !== null)
        .map(pattern => pattern.message);

    return (errors.length > 0) ? errors[0] : null;
};

const isNotEqualToExpectedValue = (value: boolean, rule: MustBeEqual): string | null => {
    const first = rule.rules[0];
    return value !== first.value ? first.message : null;
};

const isInList = (value: string, rule: InList): string | null => {
    const first = rule.rules[0];

    return first.value.indexOf(value) > -1 ? null : first.message;
};

const isGreaterThanMaxLength = (value: string, rule: MaxLength): string | null => {
    const first = rule.rules[0];
    return value.length > first.value ? first.message : null;
};

const isLessThanMinLength = (value: string, rule: MinLength): string | null => {
    const first = rule.rules[0];
    return value.length < first.value ? first.message : null;
};

const mustMatch = (value: string, rule: MustMatch, formData: {}): string | null => {
    const first = rule.rules[0];
    const name = first.value;

    return formData[name] && formData[name] !== value ? first.message : null;
};

const mustMatchCaseInsensitive = (value: string, rule: MustMatchCaseInsensitive, formData: {}): string | null => {
    const first = rule.rules[0];

    const name = first.value;
    return formData[name] && formData[name].toLowerCase() !== value.toLowerCase() ? first.message : null;
};

const validate = (formData: FormData, field: FieldType): string | null => {
    const errorMessages = (field.validation || [])
        .map((rule) => {
            switch (rule.type) {
                case 'required':
                    return isEmpty(field.value as string, rule);

                case 'minlength':
                    return isLessThanMinLength(field.value as string, rule);

                case 'maxlength':
                    return isGreaterThanMaxLength(field.value as string, rule);

                case 'mustbeequal':
                    return isNotEqualToExpectedValue(field.value as boolean, rule);

                case 'inlist':
                    return isInList(field.value as string, rule);

                case 'pattern':
                    return getErrorIfDoesNotMatchRegEx(field.value as string, rule);

                case 'notpattern':
                    return getErrorIfMatchesRegEx(field.value as string, rule);

                case 'mustmatch':
                    return mustMatch(field.value as string, rule, formData);

                case 'mustmatchcaseinsensitive':
                    return mustMatchCaseInsensitive(field.value as string, rule, formData);

                default:
                    return null;
            }
        })
        .filter(error => error !== null);

    return errorMessages.length > 0 ? errorMessages[0] : null;
};

export default validate;