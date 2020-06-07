# React-Metaforms

![Node.js CI](https://github.com/flsy/react-metaforms/workflows/Node.js%20CI/badge.svg?branch=master)

There is a nice [how to use](https://medium.com/@kolebaba/reactjs-json-based-form-7dd3e03fd690) tutorial.

## Basic Usage

```jsx
import Form, { getFormData, FieldType } from 'react-metaforms';

// This could be loaded from server
const form = [
    {
        "name": "username",
        "label": "Username",
        "type": "text"
    },
    {
        "type": "submit"
    }
];

// Store form's changes localy
const [fields, setFields] = React.useState<FieldType[]>(form);

// Render it!
<Form
  id="my-form"
  fields={fields}
  onFieldsChange={setFields}
  onSubmit={(values) => {
    const { username } = getFormData(values)
    
    console.log('username:', username);
  }}
/>  
```

## Properties

* **id** - id of form.
* **fields** - array of objects rendered by metaform.
* **onFieldsChange**
* **onSubmit** - Function called after submitting form. Returns same structure as provided into ```fields``` property and adds value to each field.

## Sample Fields

```json
[
    {
        "name": "username",
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
    {
        "name": "submitBtn",
        "label": "Save",
        "type": "submit"
    }
]
```

## Custom fields

```jsx
<Form
    ...
    getComponent={(props) => {
        if (props.type === 'myInput') {
            return <input {...props} className="my-awesome-input" />
        }
        if (props.type === 'button') {
            return <button>Hello</button>
        }
    }}
/>
```


[Validation rules](/docs/validation_rules.md)
