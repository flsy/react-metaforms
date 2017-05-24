# Forms

[![CircleCI](https://circleci.com/gh/flsy/react-metaforms/tree/master.svg?style=svg)](https://circleci.com/gh/flsy/react-metaforms/tree/master)

## How To Use It

### Installation

```bash
npm install --save react-metaforms
```

```jsx
import Form from 'react-metaforms';

<Form
  id="formId"
  fields={fields}
  onSubmit={onSubmit}
/>  
```

## Validation rules

### required

```json
{
  "type": "required",
  "rules": [
    {
      "message": "This field is required."
    }
  ]
}
```

### mustbeequal
```json
{
  "type": "mustbeequal",
  "rules": [
    {
      "value": true,
      "message": "You need to agree to the terms and conditions"
    }
  ]
}
```

### inlist
```json
{
  "type": "inlist",
  "rules": [
    {
      "value": ["Mr", "Mrs", "Ms", "Miss", "Dr", "Rev", "Prof"],
      "message": "Title was not a valid choice"
    }
  ]
}
```
### maxlength
```json
{
  "type": "maxlength",
  "rules": [
    {
      "value": 32,
      "message": "Your username can only have 3 - 32 characters"
    }
  ]
}
```

### minlength
```json
{
  "type": "minlength",
  "rules": [
    {
      "value": 3,
      "message": "Your username can only have 3 - 32 characters"
    }
  ]
}
```
### pattern
```json
{
  "type": "pattern",
  "rules": [
    {
      "value": "^[a-zA-Z]+",
      "message": "Your username can only start with a letter"
    },
    {
      "value": "^[a-zA-Z0-9\\-\\._]+[a-zA-Z0-9]$",
      "message": "Your username can only contain letters and numbers"
    }
  ]
}
```
### notpattern
```json
{
  "type": "notpattern",
  "rules": [
    {
      "value": "[\\-\\.\\_][\\-\\.\\_]",
      "message": "Your username can only contain letters and numbers"
    }
  ]
}
```

### mustmatch
```json
{
  "type": "mustmatch",
  "rules": [
    {
      "value": "password",
      "message": "The passwords you entered didn't match. Please try again"
    }
  ]
}
```
### mustmatchcaseinsensitive
```json
{
  "type": "mustmatchcaseinsensitive",
  "rules": [
    {
      "value": "email",
      "message": "Sorry, your email addresses do not match. Please try again"
    }
  ]
}
```
