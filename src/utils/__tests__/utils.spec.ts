import { FieldType } from '../../export';
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
    getFieldValue,
    setFieldValue,
    update,
    validate,
} from '../utils';
import { Required, Validation } from '../../validation/types';

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

            const fields = [{ type: 'group', fields: [{ errorMessage: 'yes error' }] }] as FieldType[];
            expect(hasError(fields)).toEqual(true);
        });
    });

    describe('getFormData', () => {
        it('returns formdata from fields', () => {

            expect(getFormData([])).toEqual({});
            expect(getFormData([{ name: 'field1' }] as FieldType[])).toEqual({ field1: null });
            expect(getFormData([{ type: 'text', name: 'field1', value: 'some value' }] as FieldType[])).toEqual({ field1: 'some value' });
        });

        it('returns formdata from nested fields', () => {
            const fields: FieldType[] = [
                { name: 'a', type: 'text' },
                { name: 'b', type: 'text', value: 'valueB' },
                { name: 'groupA', type: 'group', fields: [
                        { name: 'c', type: 'text', value: 'valueC' },
                        { name: 'd', type: 'text' },
                    ],
                },
            ];

            const expected = {
                a: null,
                b: 'valueB',
                c: 'valueC',
                d: null,
            };
            expect(getFormData(fields)).toEqual(expected);
        });

    });

    describe('validateForm', () => {
        const message = 'This field is required error message';
        it('validates a form', () => {
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

        it('validates a nested fields', () => {
            const required: Required = { type: 'required', rules: [{message}]};
            const fields: FieldType[] = [
                { name: 'a', type: 'text', validation: [] },
                { name: 'b', type: 'text', validation: [required] },
                { name: 'groupA', type: 'group', fields: [
                        { name: 'c', type: 'text', validation: [required] },
                        { name: 'd', type: 'text' },
                    ],
                },
            ];

            const results = [undefined, message];
            const results2 = [message, undefined];

            const validated = validateForm(fields);
            validated.forEach((field, i) => {
                expect(field.errorMessage).toEqual(results[i]);
                if (field.fields) {
                    field.fields.forEach((f, z) => {
                        expect(f.errorMessage).toEqual(results2[z]);
                    });
                }
            });
        });
    });

    describe('setFieldValue', () => {
        it('sets a value on exact field', () => {
            const fields = [
                { name: 'a' },
                { name: 'b' },
            ] as FieldType[];

            expect(setFieldValue<string>('a', 'hey yo!')(fields)[0].value).toEqual('hey yo!');
            expect(fields[1].value).toEqual(undefined);
            expect(setFieldValue<string>('b', 'b yo!', fields)[1].value).toEqual('b yo!');
        });

        it('sets a value on nested fields', () => {
            const fields = [
                { name: 'a' },
                { name: 'b' , fields: [
                    { name: 'c' },
                    { name: 'd' },
                    ]},
            ] as FieldType[];

            const updated = setFieldValue('c', 'value C', fields);

            const values = ['value C', undefined];

            updated.forEach((field, i) => {
                expect(field.value).toEqual(undefined);
                if (field.fields) {
                    field.fields.forEach((f, y) => {
                        expect(f.value).toEqual(values[y]);
                    });
                }
            });
        });
    });

    describe('update', () => {
        it('updates a structure', () => {
            const name = 'a';
            const value = 'valueA';

            expect(update({ name, value }, [])).toEqual([]);

            const differentFields: FieldType[] = [{ name: 'b', type: 'text' }];

            expect(update({ name, value }, differentFields)).toEqual(differentFields);

            expect(update({ name, value }, [{ name: 'a', type: 'text' }])).toEqual([{ name: 'a', type: 'text', value }]);
        });

        it('updates a grouped structure', () => {
            const fields: FieldType[] = [
                { name: 'a', type: 'text' },
                { name: 'groupA', type: 'group', fields: [
                        { name: 'c', type: 'text' },
                        { name: 'd', type: 'text' },
                    ],
                },
            ];

            const value = 'value X';
            const expected: FieldType[] = [
                { name: 'a', type: 'text' },
                { name: 'groupA', type: 'group', fields: [
                        { name: 'c', type: 'text', value },
                        { name: 'd', type: 'text' },
                    ],
                },
            ];

            expect(update({ name: 'c', groupName: 'groupA', value }, fields)).toEqual(expected);
        });

        it('updates a nested grouped structure', () => {
            const fields: FieldType[] = [
                { name: 'a', type: 'text' },
                { name: 'groupA', type: 'group', fields: [
                        { name: 'c', type: 'text' },
                        { name: 'groupD', type: 'group', fields: [
                            { name: 'e', type: 'text' },
                            { name: 'f', type: 'text' },
                            ],
                        },
                    ],
                },
            ];

            const value = 'value Y';
            const expected: FieldType[] = [
                { name: 'a', type: 'text' },
                { name: 'groupA', type: 'group', fields: [
                        { name: 'c', type: 'text' },
                        { name: 'groupD', type: 'group', fields: [
                                { name: 'e', type: 'text' },
                                { name: 'f', type: 'text', value },
                            ],
                        },
                    ],
                },
            ];

            expect(update({ name: 'f', groupName: 'groupD', value }, fields)).toEqual(expected);
        });
    });

    describe('getFieldValue', () => {
        it('gets the right value', () => {
            const fields: FieldType[] = [
                { name: 'a', type: 'text', value: 'a value' },
                { name: 'b', type: 'text' },
                { name: 'c', type: 'group', fields: [
                        { name: 'd', value: 'd value', type: 'text' },
                    ]},
            ];

            expect(getFieldValue<string>('a', fields)).toEqual('a value');
            expect(getFieldValue('b', fields)).toEqual(undefined);
            expect(getFieldValue('c', fields)).toEqual(undefined);
            expect(getFieldValue('d')(fields)).toEqual('d value');
        });
    });

    describe('validate', () => {
        const errorMessage = 'This field is required.';
        const validation = [
            {
                type: 'required',
                rules: [
                    { message: errorMessage },
                ],
            },
        ];

        it('validates a structure', () => {
            expect(validate({ name: 'a' }, [])).toEqual([]);
            expect(validate({ name: 'a' }, [{ name: 'b', validation } as FieldType])).toEqual([{ name: 'b', validation }]);
            expect(validate({ name: 'b' }, [{ name: 'b', validation } as FieldType])).toEqual([{ name: 'b', validation, errorMessage }]);
        });

        it('validates a nested structure', () => {
            const fields: FieldType[] = [
                { name: 'a', type: 'text' },
                { name: 'groupA', type: 'group', fields: [
                        { name: 'c', type: 'text' },
                        { name: 'd', type: 'text', validation },
                    ] as FieldType[],
                },
            ];

            const expected: FieldType[] = [
                { name: 'a', type: 'text' },
                { name: 'groupA', type: 'group', fields: [
                        { name: 'c', type: 'text' },
                        { name: 'd', type: 'text', validation, errorMessage },
                    ] as FieldType[],
                },
            ];

            expect(validate({ name: 'd' }, fields)).toEqual(expected);
        });

    });
});
