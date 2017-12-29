import * as React from 'react';
import Form from './export';
import { CustomComponentProps, FieldType } from './components/fields/types';

const fields1 = [
    {
        name: 'name',
        label: 'Name',
        type: 'text',
        validation: [
            {
                'type': 'required',
                'rules': [
                    {
                        'message': 'This field is required.'
                    }
                ]
            }
        ]
    },
    {
        name: 'button',
        label: 'Button example',
        type: 'button',
    },
    {
        name: 'agree?',
        type: 'checkbox',
    },
    {
        name: 'mess',
        type: 'message',
    },
    {
        name: 'my-textarea',
        type: 'textarea',
        value: 'Text area',
    },
    {
        name: 'mess3',
        type: 'message3',
    },
    {
        type: 'group',
        name: 'first-group',
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
                        type: 'required',
                        rules: [
                            {
                                message: 'Please choose a inline text value'
                            }
                        ]
                    },
                ]
            },
        ],
    },
    {
        name: 'submit',
        type: 'submit',
    },
];

const fields2 = [
    {
        name: 'name',
        label: 'Name',
        type: 'text',
        value: 'banana'
    },
    {
        name: 'submit',
        type: 'submit',
    },
];

export interface State {
    fields: {}[];
}

class Demo extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            fields: fields1
        };
    }

    render() {

        const customComponents = {
            group: (props: CustomComponentProps) => {
                return (
                    <div style={{ background: 'lightblue' }}>
                        {props.children}
                    </div>);
            }
        };

        return (
            <div className="App">
                <button onClick={() => this.setState({ fields: fields1 })}>form 1</button>
                <button onClick={() => this.setState({ fields: fields2 })}>form 2</button>
                <hr/>
                <Form
                    id="demo-form"
                    fields={this.state.fields as FieldType[]}
                    onSubmit={console.log}
                    customComponents={customComponents}
                    onButtonClick={console.log}
                />
            </div>
        );
    }
}

export default Demo;
