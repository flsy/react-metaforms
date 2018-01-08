# Forms

[![CircleCI](https://circleci.com/gh/flsy/react-metaforms/tree/master.svg?style=svg)](https://circleci.com/gh/flsy/react-metaforms/tree/master)

## Installation

```bash
npm install --save react-metaforms
```

## How To Use It

### Basic Usage

```jsx
import Form from 'react-metaforms';

<Form
  id="formId"
  fields={fields}
  onSubmit={onSubmit}
/>  
```

### Metaform with custom fields
```jsx
import Form from 'react-metaforms';

<Form
  id={id}
  fields={fields}
  onSubmit={onSubmit}
  onButtonClick={onButtonClick}
  customComponents={{
    myInput: () => <input className="my-awesome-input" />,
    myButton: () => <button>Hello</button>,
  }}
/>
```

## Properties

* id - id of form.
* fields - array of objects rendered by metaform.
* customComponents - object containing custom components provided to metaform in following structure: ```{ fieldType: Component }``` where fieldType is unique type name, which is matched against value provided in ```fields``` property.
* onButtonClick - Function called after clicking on any button. Returns whole button definition.
* onSubmit - Function called after submitting form. Returns same structure as provided into ```fields``` property and adds value to each field.

## Sample Fields

sample username field 
```
{
  "name": "username", # name of the rendered input field
  "label": "Username",
  "type": "text",
  "value": "field value", # optional string as a value
  "disabled": false, # optional; default false
  "placeholder": "", # optional placeholder text
  "errorMessage": "", # optional
  "tooltip": "", # optional
  "validation": [ # all the validation rules are listed below
    {
      "type": "required",
      "rules": [
        {
          "message": "Please choose a username"
        }
      ]
    }
  ]
}
```
sample submit button
```
{
  "name": "submitBtn",
  "label": "Save",
  "tooltip": "", # optional
  "type": "submit"
}
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
