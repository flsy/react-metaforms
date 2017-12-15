import * as React from 'react';
import { mount, configure } from 'enzyme';
import { spy } from 'sinon';

import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { Input, Form } from '../index';
import { FieldType } from '../../export';
import { CustomComponentProps } from '../fields/types';

describe('<Form />', () => {
    it('should render and update a field', () => {
        const fields = [
            {
                name: 'name',
                type: 'text',
                label: 'Name',
            },
        ] as FieldType[];
        const wrapper = mount(<Form id="testFormId" fields={fields} onSubmit={() => null} />);
        const newValue = 'My new value';
        wrapper.find('input').simulate('change', { target: { value: newValue } });

        expect(wrapper.find(Input).props().value).toEqual(newValue);
    });

    it('should update default value to empty string', () => {
        const fields = [
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                value: 'some default value'
            },
        ] as FieldType[];
        const wrapper = mount(<Form id="testFormId" fields={fields} onSubmit={() => null} />);
        wrapper.find('input').simulate('change', { target: { value: 'ee' } });

        expect(wrapper.find('input').props().value).toEqual('ee');
    });

    it('should submit the default values', () => {
        const onSubmit = spy();
        const fields = [
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                value: 'some default value',
            },
            {
                name: 'submitBtn',
                label: 'Submit',
                type: 'submit',
            },
        ] as FieldType[];
        const wrapper = mount(<Form id="testFormId" fields={fields} onSubmit={onSubmit} />);

        wrapper.find('form').simulate('submit');
        expect(onSubmit.calledWith(fields)).toEqual(true);
    });

    it('should validate', () => {
        const fields = [
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                validation: [
                    {
                        type: 'required',
                        rules: [
                            {
                                message: 'Please choose a username',
                            },
                        ],
                    },
                ],
            },
        ] as FieldType[];
        const wrapper = mount(<Form id="testFormId" fields={fields} onSubmit={() => null} />);
        wrapper.find('input').simulate('blur');

        expect(wrapper.find(Input).props().errorMessage).toEqual('Please choose a username');
    });

    it('should show the default error message when there is some', () => {
        const message = 'Please choose a username';
        const fields = [
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                errorMessage: 'some error message',
                validation: [
                    {
                        type: 'required',
                        rules: [
                            {
                                message,
                            },
                        ],
                    },
                ],
            },
        ] as FieldType[];
        const wrapper = mount(<Form id="testFormId" fields={fields} onSubmit={() => null} />);

        expect(wrapper.find(Input).props().errorMessage).toEqual(fields[0].errorMessage);

        wrapper.find('form').simulate('submit');

        expect(wrapper.find(Input).props().errorMessage).toEqual(message);
    });

    it('should set the error message after submission', () => {
        interface Props {}
        interface State { fields: FieldType[]; }
        class App extends React.Component<Props, State> {
            constructor(props: Props) {
                super(props);
                this.setErrorMessage = this.setErrorMessage.bind(this);
                this.state = {
                    fields: [
                        {
                            name: 'name',
                            type: 'text',
                            label: 'Name',
                            value: 'a',
                        },
                    ] as FieldType[],
                };
            }

            setErrorMessage() {
                this.setState({ fields: this.state.fields.map(x => (x.name === 'name' ? { ...x, value: 'b' } as FieldType : x)) });
            }

            render() {
                return (<Form id="testFormId" fields={this.state.fields} onSubmit={this.setErrorMessage} />);
            }
        }

        const wrapper = mount(<App />);
        expect(wrapper.find(Input).props().value).toEqual('a');
        wrapper.find('form').simulate('submit');
        expect(wrapper.find(Input).props().value).toEqual('b');
    });

    it('should not submit the form with invalid values', () => {
        const fields = [
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                validation: [
                    {
                        type: 'required',
                        rules: [
                            {
                                message: 'Please choose a username',
                            },
                        ],
                    },
                ],
            },
        ] as FieldType[];
        const onSubmit = spy();
        const wrapper = mount(<Form id="testFormId" fields={fields} onSubmit={onSubmit} />);
        wrapper.find('form').simulate('submit');

        expect(wrapper.find(Input).props().errorMessage).toEqual('Please choose a username');
    });

    it('should submit the form with all values valid', () => {
        const fields = [
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                validation: [
                    {
                        type: 'required',
                        rules: [
                            {
                                message: 'Please choose a username X',
                            },
                        ],
                    },
                ],
            },
        ] as FieldType[];
        const onSubmit = spy();
        const wrapper = mount(<Form id="testFormId" fields={fields} onSubmit={onSubmit} />);
        wrapper.find('input[name="name"]').simulate('change', { target: { value: 'ok value' } });

        wrapper.find('form').simulate('submit');

        const expected = fields.map(field => (field.name === 'name' ? { ...field, value: 'ok value' } : field));

        expect(onSubmit.calledWith(expected)).toEqual(true);
    });

    it('should render and submit customComponents', () => {
        const fields = [
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                validation: [],
            },
        ] as FieldType[];
        const customComponents = {
            text: (props: CustomComponentProps) =>
                <input name="testNameInput" defaultValue={props.value} onChange={e => props.update({ name: props.name, value: e.target.value })} />
        };
        const onSubmit = spy();
        const wrapper = mount(<Form id="testFormId" fields={fields} onSubmit={onSubmit} customComponents={customComponents} />);
        wrapper.find('input[name="testNameInput"]').simulate('change', { target: { value: 'ok value' } });

        wrapper.find('form').simulate('submit');

        expect(wrapper.find('input[name="testNameInput"]').props().defaultValue).toEqual('ok value');
    });

    // xit('should render custom group component', () => {
    //     const fields = [
    //         {
    //             name: 'name',
    //             type: 'group',
    //             label: 'Name',
    //             validation: [],
    //             fields: [
    //                 {
    //                     type: 'button',
    //                     name: 'button',
    //                     label: 'Click me',
    //                 },
    //                 {
    //                     type: 'text',
    //                     name: 'input',
    //                     label: 'Input',
    //                 },
    //             ],
    //         },
    //     ];
    //     const customComponents = {
    //         group: ({ components }) => (<div>{components.map(component => <span key={component.key}>{component}</span>)}</div>), // eslint-disable-line
    //     };
    //     const onSubmit = spy();
    //     const wrapper = mount(<Form id="testFormId" fields={fields} onSubmit={onSubmit} customComponents={customComponents} />);
    //
    //     expect(wrapper.find('button').prop('children')).toEqual('Click me');
    //     expect(wrapper.find('input').prop('name')).toEqual('input');
    // });

    it('should return fields when clicked on button', () => {
        const fields = [
            {
                name: 'test-name',
                type: 'text',
                label: 'Name',
            },
            {
                name: '?',
                label: 'just-a-button',
                type: 'button',
            },
        ] as FieldType[];
        const onClick = spy();
        const wrapper = mount(<Form id="testFormId" fields={fields} onSubmit={() => null} onButtonClick={onClick} />);

        wrapper.find('input[name="test-name"]').simulate('change', { target: { value: 'some test value' } });

        wrapper.find('form').find('button[type="button"]').simulate('click');

        const expectedFormFields = fields.map(f => (f.name === 'test-name' ? { ...f, value: 'some test value' } : f));

        expect(onClick.calledWith(fields[1], expectedFormFields)).toEqual(true);
    });
});
