import {
  isRequired,
  hasError,
  getValue,
  findField,
  prop,
  propEq,
  head,
  curry,
  compose,
  getErrorMessage,
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
      expect(getValue('firstName', state, fields)).toEqual('');
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

  describe('prop', () => {
    it('shoud return right property when passed in as two params', () => {
      expect(prop('name', { name: 'test 1' })).toEqual('test 1');
    });

    it('shoud return right property when curried', () => {
      expect(prop('name')({ name: 'test 152' })).toEqual('test 152');
    });
  });

  describe('propEq', () => {
    it('shoud return rigt property match', () => {
      expect(propEq('name', 'test 1')({ name: 'test 1' })).toEqual(true);
      expect(propEq('name', 'test 2')({ name: 'test 1' })).toEqual(false);
      expect(propEq('name', 'test')()).toEqual(false);
    });
  });

  describe('head', () => {
    it('returns a first item from given input', () => {
      expect(head(['first', 'second'])).toEqual('first');
      expect(head([])).toEqual(null);
      expect(head('hello')).toEqual('h');
      expect(head('')).toEqual(null);
    });
  });

  describe('curry', () => {
    it('returns a curried sum function', () => {
      const sum = curry((a, b, c, d) => a + b + c + d);
      expect(sum(1, 2, 3, 4)).toEqual(10);
    });

    it('returns a function if you miss the params', () => {
      const sum = curry((a, b, c, d) => a + b + c + d);

      const sum1 = sum(1);
      const sum2 = sum1(2);
      const sum3 = sum2(3);
      expect(sum3(4)).toEqual(10);
    });

    it('combines the two approaches and still returns correct values', () => {
      const sum = curry((a, b, c, d) => a + b + c + d);

      const sum1 = sum(1, 2);
      const sum2 = sum1(3);
      expect(sum2(4)).toEqual(10);
    });
  });

  describe('compose', () => {
    it('returns a curried sum function', () => {
      expect(compose(number => number + 1, number => number * 2)(4)).toEqual(9);

      expect(compose(string => string.toUpperCase(), string => `${string} - test`)('tak ted')).toEqual('TAK TED - TEST');
      expect(compose()('a')).toEqual('a');
    });
  });
});
