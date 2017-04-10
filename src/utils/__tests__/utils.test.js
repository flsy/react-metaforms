import React from 'react';

import { isRequired } from '../utils';

describe('utils', () => {
  describe('isRequired', () => {
    it('should return correct value', () => {
      expect(isRequired([])).toEqual(false);
      expect(isRequired([{}, { type: 'required' }])).toEqual(true);
      expect(isRequired([{ type: 'required' }])).toEqual(true);
      expect(isRequired([{ type: 'blablabal' }])).toEqual(false);
    })
  });
});