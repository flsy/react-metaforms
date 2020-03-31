# React-Metaforms

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

Optional:
* **customComponents** - object containing custom components provided to metaform in following structure: ```{ fieldType: Component }``` where ```fieldType``` is unique type name, which is matched against value provided in ```fields``` property.
* **onButtonClick** - Function called after clicking on any button. Returns whole button definition.

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
                "rules": [
                {
                    "message": "Please choose a username"
                }
              ]
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
    customComponents={{
        myInput: ({ name }) => <input name={name} className="my-awesome-input" />,
        myButton: () => <button>Hello</button>,
    }}
/>
```


[Validation rules](/docs/validation_rules.md)
