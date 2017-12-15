import * as React from 'react';
import Form from './export';
import { FieldType } from './components/fields/types';

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
        name: 'email',
        type: 'email',
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

interface State {
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
        return (
            <div>
                <button onClick={() => this.setState({ fields: fields1 })}>form 1</button>
                <button onClick={() => this.setState({ fields: fields2 })}>form 2</button>
                <hr/>
                <Form
                    id="demo-form"
                    fields={this.state.fields as FieldType[]}
                    onSubmit={console.log}
                    onButtonClick={console.log}
                />
            </div>
        );
    }
}

export default Demo;
