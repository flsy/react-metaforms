# React-Metaforms

![Node.js CI](https://github.com/flsy/react-metaforms/workflows/Node.js%20CI/badge.svg?branch=master)

There is a nice [how to use](https://medium.com/@kolebaba/reactjs-json-based-form-7dd3e03fd690) tutorial.

## Basic Usage

```jsx
import Form, { IForm } from 'react-metaforms';

// This could be loaded from server
const loginForm = {
    username: {
        type: "text",
        label: "Username"
    },
    submit: {
        "type": "submit",
        "label": "Submit"
    }
};

// Store form's changes localy
const [form, setForm] = React.useState<IForm>(loginForm);

// Render it
<Form
  form={form}
  onFormChange={setForm}
  onSubmit={(submittedForm, { username }) => {
    console.log('username:', username);
  }}
  components={({ name, component, actions }) => {
    switch (component.type) {
        case 'text':
            return <TextInput name={name} {...component} {...actions} />
        case 'submit':
            return <button type="submit">{component.label}</button> 
    }  
}}
/>  
```

## Properties

* **form** - array of objects rendered by metaform.
* **onFormChange**
* **onSubmit** - Function called after submitting form. Returns same structure as provided into ```fields``` property and adds value to each field.

## Sample Fields

```json
{
  "username": {
    "label": "Username",
    "type": "text",
    "value": "field value",
    "disabled": false,
    "placeholder": "",
    "errorMessage": "",
    "validation": [
      {
        "type": "required",
        "message": "Please choose a username"
      }
    ]
  },
  "submit": {
    "label": "Save",
    "type": "submit"
  }
}
```

[Validation rules](/docs/validation_rules.md)
