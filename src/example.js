/* eslint-disable */
/*
- possible types: text/textarea, password...
inlineGroup
 collapsingGroup


- customField

*/

export const form = [
  {
    name: 'text-input',     // name of the rendered input field
    label: 'Text input',
    size: 'L',              // optional sizes as S/M/L/XL
    type: 'text',
    value: 'some value',     // optional string as a value
    disabled: false,
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
        "type": "minlength",
        "rules": [
          {
            "value": 3,
            "message": "Your username can only have 3 - 32 characters"
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
    name: 'custom-message-field',
    type: 'message',
    value: "I'm a custom message text",
  },
  {
    name: 'text-area',
    label: 'Text area',
    size: 'L',
    type: 'textarea',
    value: 'some value',
    disabled: false,
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
    name: 'checkbox-input',
    label: 'Checkbox input',
    type: 'checkbox',
    validation: [
      {
        type: "required",
        rules: [
          {
            message: "Please choose a username"
          }
        ]
      }
    ]
  },
  {
    label: 'button with an action',
    tooltip: '', // optional
    name: 'saveButton',
    type: 'button',
    action: 'MY_ACTION',
  },
  {
    name: 'submitBtn',
    label: 'Save',
    tooltip: '', // optional
    type: 'submit'
  },
  {
    name: 'InlineGroup',
    type: 'group',
    className: 'my-awesome-inline-group',
    legend: 'Inline group', // optional
    fields: [
      {
        name: 'inline-button',
        label: 'Inline Button',
        type: 'button'
      },
      {
        type: 'text',
        name: 'inline-input',
        label: 'Inline Input',
        validation: [
          {
            type: "required",
            rules: [
              {
                message: "Please choose a inline text value"
              }
            ]
          },
        ]
      },
      {
        type: 'text',
        name: 'inline-input-1',
        label: 'Inline Input 1',
        validation: [
          {
            type: "required",
            rules: [
              {
                message: "Please choose a inline text value"
              }
            ]
          },
        ]
      }
    ]
  },
  {
    name: 'CollapsingGroup',
    type: 'collapsingGroup',
    isCollapsed: false,
    legend: 'Collapsing group', // optional
    fields: [
      {
        label: 'Collapsing Button',
        type: 'button'
      },
      {
        type: 'text',
        name: 'collapsing-input',
        label: 'Collapsing Input',
        validation: [
          {
            type: "required",
            rules: [
              {
                message: "Please choose a inline text value"
              }
            ]
          },
        ]
      }
    ]
  }
];


// const formWithGroup = [
//   {
//     type: 'inlineGroup',
//     legend: 'Inline group', // optional
//     fields: [
//       {},
//       {}
//       ]
//   }
// ];
//
//
// const formWithCollapsingGroup = [
//   {
//     type: 'collapsingGroup',
//     legend: 'Collapsing group', // optional
//     isCollapsed: false,
//     fields: [
//
//     ]
//   }
// ];
//
// const gridGroup = [
//   {
//     type: 'gridGroup',
//     legend: 'Grid', // optional
//     fields: [
//       [{}, {}],
//       [{}, {}],
//     ]
//   }
// ];
