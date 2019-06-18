/* tslint:disable:no-console */

import * as React from 'react';
import { ButtonPropsFinal } from './components/fields/types';
import Form, { FormState, FieldType } from './export';

const fields1 = [
    {
        name: 'name',
        label: 'Name',
        type: 'text',
        validation: [
            {
                type: 'required',
                rules: [
                    {
                        message: 'This field is required.',
                    },
                ],
            },
        ],
    },
    {
        name: 'button',
        label: 'Button example',
        type: 'button',
    },
    {
        name: 'agree',
        type: 'checkbox',
        label: 'Agree ?',
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
                type: 'button',
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
                                message: 'Please choose a inline text value',
                            },
                        ],
                    },
                ],
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
        value: 'banana',
    },
    {
        name: 'submit',
        type: 'submit',
    },
];

export interface State {
    fields: {}[];
    formState: FormState;
}

const submit = (props: ButtonPropsFinal) => (<button type="submit">ok</button>);

class Demo extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            fields: fields1,
            formState: FormState.createEmpty(),
        };
    }

    public render() {

        return (
            <div className="App">
                <button onClick={() => this.setState({ fields: fields1 })}>form 1</button>
                <button onClick={() => this.setState({ fields: fields2 })}>form 2</button>
                <hr/>
                <Form
                    id="demo-form"
                    state={this.state.formState}
                    onStateChange={(formState) => this.setState({ formState })}
                    fields={this.state.fields as FieldType[]}
                    onSubmit={(formData) => console.log('onSubmit', formData)}
                    onButtonClick={(field, fields) => console.log('onButtonClick', field, fields)}
                    customComponents={{ submit }}
                />
                <pre>{JSON.stringify(this.state.formState, null, 2)}</pre>
            </div>
        );
    }
}

export default Demo;
