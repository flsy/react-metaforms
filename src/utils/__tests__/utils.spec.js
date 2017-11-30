import { compose, head } from 'ramda';
import {
  isRequired,
  hasError,
  getValue,
  setValue,
  findField,
  getErrorMessage,
  removeField,
  validateForm,
  setFieldValue,
} from '../utils';

describe('utils', () => {
  describe('isRequired', () => {
    it('should return correct value', () => {
      expect(isRequired([])).toEqual(false);
      expect(isRequired([{}, { type: 'required' }])).toEqual(true);
      expect(isRequired([{ type: 'required' }])).toEqual(true);
      expect(isRequired([{ type: 'blablabal' }])).toEqual(false);
    });
  });

  describe('hasError', () => {
    it('should return if form has error or not', () => {
      expect(hasError([])).toEqual(false);
      expect(hasError([{ errorMessage: '' }])).toEqual(false);
      expect(hasError([{ errorMessage: null }])).toEqual(false);
      expect(hasError([{ errorMessage: 'error' }])).toEqual(true);
    });
  });

  describe('findField', () => {
    it('returns a null when cant find the field', () => {
      expect(findField('field1', null, [])).toEqual(null);
    });

    it('returns a field from the fields by its name', () => {
      const field = { name: 'field1' };
      expect(findField('field1', null, [field])).toEqual(field);
    });

    it('returns a field from group of the fields', () => {
      const field = { name: 'field1' };
      const group = { name: 'group1', fields: [field] };
      expect(findField('field1', 'group1', [group])).toEqual(field);
    });
  });

  describe('getValue', () => {
    it('returns a value saved in state', () => {
      const state = {
        firstName: { value: 'test value' },
      };
      const fields = [];
      expect(getValue('firstName', state, fields)).toEqual(state.firstName.value);
    });

    it('returns a from fields', () => {
      const state = {};
      const fields = [{ name: 'firstName', value: 'test value' }];
      expect(getValue('firstName', state, fields)).toEqual(fields[0].value);
    });

    it('returns an empty string when cant find the field', () => {
      const state = {};
      const fields = [];
      expect(getValue('firstName', state, fields)).toEqual(null);
    });
  });

  describe('setValue', () => {
    const value = 'my value';
    const fields = [
      { name: 'name' },
      { name: 'password' },
    ];

    const expected = [
      { name: 'name', value },
      { name: 'password' },
    ];

    it('set a value into right field', () => {
      expect(setValue('name', value, fields)).toEqual(expected);
    });

    it('set a value into right field curried', () => {
      expect(setValue('name', value)(fields)).toEqual(expected);
    });

    it('set a value into right field curried all', () => {
      expect(setValue('name')(value)(fields)).toEqual(expected);
    });
  });

  describe('getErrorMessage', () => {
    it('returns an error message from state', () => {
      const state = { field1: { name: 'field1', errorMessage: 'error 1' } };
      expect(getErrorMessage('field1', state, [])).toEqual('error 1');
      expect(getErrorMessage('field2', state, [])).toEqual('');
    });

    it('returns an error message from prop fields', () => {
      const fields = [{ name: 'field1', errorMessage: 'error 2' }];
      expect(getErrorMessage('field1', {}, fields)).toEqual('error 2');
      expect(getErrorMessage('field2', {}, fields)).toEqual('');
    });
  });

  describe('removeField', () => {
    it('removes nothing when fields is an empty array', () => {
      expect(removeField('f1', [])).toEqual([]);
    });

    it('removes one field', () => {
      expect(removeField('f1', [{ name: 'f1' }])).toEqual([]);
    });

    it('removes one field from more fields', () => {
      expect(removeField('f1', [{ name: 'f1' }, { name: 'f2' }])).toEqual([{ name: 'f2' }]);
    });

    it('removes field from fields (curried)', () => {
      expect(removeField('f1')([{ name: 'f1' }, { name: 'f2' }])).toEqual([{ name: 'f2' }]);
    });

    it('removes field from fields (composed)', () => {
      const fields = [
        { name: 'f1' },
        { name: 'f2' },
        { name: 'f3' },
      ];

      const expected = compose(
        removeField('f1'),
        removeField('f2'),
      )(fields);

      expect(expected).toEqual([{ name: 'f3' }]);
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
      ];

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
      ];

      expect(setFieldValue('a', 'hey yo!')(fields)[0].value).toEqual('hey yo!');
      expect(fields[1].value).toEqual(undefined);
      expect(setFieldValue('b', 'b yo!')(fields)[1].value).toEqual('b yo!');
    });
  });
});
