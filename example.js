/*
- possible types: text/textarea, password...
inlineGroup
 collapsingGroup


- customField

*/

const form = [
  {
    id: 'textInput',
    name: 'text-input',     // name of the rendered input field
    label: 'Text input',
    size: 'L',              // optional sizes as S/M/L/XL
    type: 'text',
    value: 'some value',     // optional string as a value
    placeholder: '',
    tooltip: '', // optional
    errorMessage: '',
    validation: [
      {
        type: "required",
        rules: [
          {
            message: "Please choose a username"
          }
        ]
      },
      {
        type: "pattern",
        rules: [
          {
            value: "^[a-zA-Z]+",
            message: "Your username can only start with a letter"
          },
          {
            value: "^[a-zA-Z0-9\\-\\._]+[a-zA-Z0-9]$",
            message: "Your username can only contain letters and numbers"
          }
        ]
      }
    ]
  },
  {
    id: 'btn',
    label: 'Save',
    tooltip: '', // optional
    type: 'button',
    action: {
      type: 'SAVE_FORM', // enum string which would reflect some frontend logic
      payload: '' // action params
    }
  },
  {
    id: 'submitBtn',
    label: 'Save',
    tooltip: '', // optional
    type: 'submit'
  }
];


const formWithGroup = [
  {
    type: 'inlineGroup',
    legend: 'Inline group', // optional
    fields: [
      {},
      {}
      ]
  }
];


const formWithCollapsingGroup = [
  {
    type: 'collapsingGroup',
    legend: 'Collapsing group', // optional
    isCollapsed: false,
    fields: [

    ]
  }
];

const gridGroup = [
  {
    type: 'gridGroup',
    legend: 'Grid', // optional
    fields: [
      [{}, {}],
      [{}, {}],
    ]
  }
];
