import validate from '../validate';

describe('validate', () => {
  describe('required', () => {
    const validationRules = [
      {
        type: 'required',
        rules: [
          {
            message: 'Please enter your name',
          },
        ],
      },
    ];

    it('should return an error message when the field value is empty', () => {
      const errorMessage = validate('', validationRules);
      expect(errorMessage).toEqual('Please enter your name');
    });

    it('should return an error message when field value is null', () => {
      const errorMessage = validate(null, validationRules);
      expect(errorMessage).toEqual('Please enter your name');
    });

    it('should not return an error message when the field value is not empty', () => {
      const errorMessage = validate('Jan', validationRules);
      expect(errorMessage).toEqual('');
    });
  });

  describe('minlength', () => {
    const validationRules = [
      {
        type: 'minlength',
        rules: [
          {
            value: 3,
            message: 'min 3 characters',
          },
        ],
      },
    ];

    it('should return an error if value has too few characters', () => {
      const errorMessage = validate('x', validationRules);

      expect(errorMessage).toEqual('min 3 characters');
    });

    it('should not return an error if value has enough characters', () => {
      const errorMessage = validate('name', validationRules);

      expect(errorMessage).toEqual('');
    });

    it('should return an error if value is null', () => {
      const errorMessage = validate(null, validationRules);

      expect(errorMessage).toEqual('min 3 characters');
    });
  });

  describe('maxlength', () => {
    const validationRules = [
      {
        type: 'maxlength',
        rules: [
          {
            value: 5,
            message: 'max 5 characters long',
          },
        ],
      },
    ];

    it('should return an error if the entered text exceeds the max length rule', () => {
      const errorMessage = validate('honzaxx', validationRules);

      expect(errorMessage).toEqual('max 5 characters long');
    });

    it('should not return an error if the entered text does not exceed the max length rule', () => {
      const errorMessage = validate('o', validationRules);

      expect(errorMessage).toEqual('');
    });

    it('should return an error if value is null', () => {
      const errorMessage = validate(null, validationRules);

      expect(errorMessage).toEqual('max 5 characters long');
    });
  });

  describe('mustbeequal', () => {
    const validationRules = [
      {
        type: 'mustbeequal',
        rules: [
          {
            value: true,
            message: 'You need to agree to the terms and conditions',
          },
        ],
      },
    ];

    it('should return an error if the value is not equal to the specified value', () => {
      const errorMessage = validate(false, validationRules);

      expect(errorMessage).toEqual('You need to agree to the terms and conditions');
    });

    it('should not return an error if the value is equal to the specified value', () => {
      const errorMessage = validate(true, validationRules);

      expect(errorMessage).toEqual('');
    });
  });

  describe('inlist', () => {
    const validationRules = [
      {
        type: 'inlist',
        rules: [
          {
            value: [
              'Mr',
              'Mrs',
              'Ms',
              'Miss',
              'Dr',
              'Rev',
              'Prof',
              'Other',
            ],
            message: 'Title was not a valid choice',
          },
        ],
      },
    ];

    it('should return an error if the user selects an invalid option', () => {
      const errorMessage = validate('Sir', validationRules);

      expect(errorMessage).toEqual('Title was not a valid choice');
    });

    it('should not return an error if the user selects something in the list of options', () => {
      const errorMessage = validate('Mr', validationRules);

      expect(errorMessage).toEqual('');
    });
  });

  describe('pattern', () => {
    const validationRules = [
      {
        type: 'pattern',
        rules: [
          {
            value: "^[a-zA-Z \\'-]+$",
            message: 'Sorry, your name can only include letters and spaces',
          },
        ],
      },
    ];

    it('should not display error if field value is empty', () => {
      const errorMessage = validate('', validationRules);
      expect(errorMessage).toEqual('');
    });

    it('should return an error when a pattern rule has been violated', () => {
      const errorMessage = validate('as1', validationRules);
      expect(errorMessage).toEqual('Sorry, your name can only include letters and spaces');
    });

    it('should not return an error when a pattern rule has not been violated', () => {
      const errorMessage = validate('as', validationRules);

      expect(errorMessage).toEqual('');
    });

    it('should return the correct error when multiple rules are given', () => {
      const message = 'Sorry, your name cannot include spaces';

      const multipleValidations = [...validationRules];
      multipleValidations[0].rules.push({ value: '^\\S*$', message });

      const errorMessage = validate('John Smith', multipleValidations);

      expect(errorMessage).toEqual(message);
    });
  });

  describe('notpattern', () => {
    const validationRules = [
      {
        type: 'notpattern',
        rules: [
          {
            value: '[pP][aA][sS][sS][wW][oO][rR][dD]',
            message: 'invalid password',
          },
        ],
      },
    ];

    it('should not return an error if value is empty', () => {
      const errorMessage = validate('', validationRules);

      expect(errorMessage).toEqual('');
    });

    it('should not return an error if value in null', () => {
      const errorMessage = validate(null, validationRules, '');

      expect(errorMessage).toEqual('');
    });

    it('should return an error if value does not match pattern', () => {
      const errorMessage = validate('password', validationRules, '');

      expect(errorMessage).toEqual('invalid password');
    });

    it('should not return an error if the value does match the pattern', () => {
      const errorMessage = validate('hello', validationRules);

      expect(errorMessage).toEqual('');
    });

    it('should return the correct error when multiple rules are given', () => {
      const message = 'Sorry, your password must include spaces';
      const multipleValidations = [...validationRules];
      multipleValidations[0].rules.push({ value: '^\\S*$', message });
      const errorMessage = validate('hellothere', multipleValidations);

      expect(errorMessage).toEqual(multipleValidations[0].rules[1].message);
    });
  });

  describe('mustmatch', () => {
    const validationRules = [
      {
        type: 'mustmatch',
        rules: [
          {
            value: 'password',
            message: "The passwords you entered didn't match. Please try again",
          },
        ],
      },
    ];

    it('should return an error when the specified field values do not match', () => {
      const errorMessage = validate('joe12334', validationRules, { password: 'bob' });

      expect(errorMessage).toEqual("The passwords you entered didn't match. Please try again");
    });

    it('should not return an error when the specified field values match', () => {
      const errorMessage = validate('joe12334', validationRules, { password: 'joe12334' });

      expect(errorMessage).toEqual('');
    });

    it('does not return an error when both passwords are empty', () => {
      const errorMessage = validate('', validationRules);

      expect(errorMessage).toEqual('');
    });
  });

  describe('mustmatchcaseinsensitive', () => {
    const validationRules = [
      {
        type: 'mustmatchcaseinsensitive',
        rules: [
          {
            value: 'email',
            message: 'Sorry, your email addresses do not match. Please try again',
          },
        ],
      },
    ];

    it('should return an error if value does not match, case is not sensitive', () => {
      const errorMessage = validate('email@email.com', validationRules, { email: 'emails@emails.com' });

      expect(errorMessage).toEqual('Sorry, your email addresses do not match. Please try again');
    });

    it('should not return an error if the value does match, case is not sensitive', () => {
      const errorMessage = validate('email@email.com', validationRules, { email: 'email@email.com' });

      expect(errorMessage).toEqual('');
    });
  });
});
