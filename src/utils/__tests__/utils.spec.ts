import {
    isRequired,
    hasError,
    // getValue,
    // setValue,
    // findField,
    // getErrorMessage,
    // removeField,
    validateForm,
    getFormData,
    setFieldValue,
} from '../utils';
import { Validation } from '../../validation/types';
import { FieldType } from '../../components/fields/types';

describe('utils', () => {
    describe('isRequired', () => {
        it('should return correct value', () => {
            expect(isRequired([])).toEqual(false);
            expect(isRequired([{}, { type: 'required' }] as Validation[])).toEqual(true);
            expect(isRequired([{ type: 'required' }] as Validation[])).toEqual(true);
            // expect(isRequired([{ type: 'blablabal' }] as Validation[])).toEqual(false);
        });
    });

    describe('hasError', () => {
        it('should return if form has error or not', () => {
            expect(hasError([])).toEqual(false);
            expect(hasError([{ errorMessage: '' }] as FieldType[])).toEqual(false);
            expect(hasError([{ errorMessage: undefined }] as FieldType[])).toEqual(false);
            expect(hasError([{ errorMessage: 'error' }] as FieldType[])).toEqual(true);
        });
    });

    describe('getFormData', () => {
        it('returns formdata object from fields', () => {

            expect(getFormData([])).toEqual({});
            expect(getFormData([{ name: 'field1' }] as FieldType[])).toEqual({ field1: null });
            expect(getFormData([{ type: 'text', name: 'field1', value: 'some value' }] as FieldType[])).toEqual({ field1: 'some value' });
        });
    });

    describe('validateForm', () => {
        it('validates a form', () => {
            const message = 'This field is required error message';
            const fields = [
                {
                    name: 'a',
                    validation: [{
                        type: 'required',
                        rules: [{ message }],
                    }],
                },
                {
                    name: 'b',
                },
            ] as FieldType[];

            expect(validateForm(fields)[0].errorMessage).toEqual(message);
            expect(validateForm(fields)[1].errorMessage).toEqual(undefined);
        });
    });

    describe('setFieldValue', () => {
        it('validates a form', () => {
            const fields = [
                {
                    name: 'a',
                },
                {
                    name: 'b',
                },
            ] as FieldType[];

            expect(setFieldValue('a', 'hey yo!')(fields)[0].value).toEqual('hey yo!');
            expect(fields[1].value).toEqual(undefined);
            expect(setFieldValue('b', 'b yo!', fields)[1].value).toEqual('b yo!');
        });
    });
});
