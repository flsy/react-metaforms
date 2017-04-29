import React from 'react';

import { isRequired, hasError } from '../utils';

describe('utils', () => {
  describe('isRequired', () => {
    it('should return correct value', () => {
      expect(isRequired([])).toEqual(false);
      expect(isRequired([{}, { type: 'required' }])).toEqual(true);
      expect(isRequired([{ type: 'required' }])).toEqual(true);
      expect(isRequired([{ type: 'blablabal' }])).toEqual(false);
    })
  });

  describe('hasError', () => {
    it('should return if form has error or not', () => {
      expect(hasError([])).toEqual(false);
      expect(hasError([{ errorMessage: '' }])).toEqual(false);
      expect(hasError([{ errorMessage: null }])).toEqual(false);
      expect(hasError([{ errorMessage: 'error' }])).toEqual(true);
    });
  });
});