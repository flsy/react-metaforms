import * as React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import { FieldType } from 'metaforms';

import { Input, Form } from '../index';
import { FormState } from '../../state';
import { CustomComponentProps } from '../fields/types';
import Checkbox from '../fields/Checkbox';
import Textarea from '../fields/Textarea';

describe('<Form />', () => {

    let wrapper: any = null;
    beforeEach(() => {
        type Props = {
            id: string;
            fields: FieldType[];
            onSubmit: (fields: FieldType[]) => void;
        };
        interface State { formState: FormState; }

        class App extends React.Component<Props, State> {
            constructor(props: Props) {
                super(props);
                this.state = {
                    formState: FormState.createEmpty(),
                };
            }

            public render() {
                return (<Form state={this.state.formState} onStateChange={(formState) => this.setState({ formState })} {...this.props} />);
            }
        }

        wrapper = mount(<App onSubmit={() => null} fields={[]} id="testFormId" />);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('should render and update a field', () => {
        const fields = [
            {
                name: 'name',
                type: 'text',
                label: 'Name',
            },
        ] as FieldType[];
        wrapper.setProps({ fields });

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
                value: 'some default value',
            },
        ] as FieldType[];
        wrapper.setProps({ fields });
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
        wrapper.setProps({ fields, onSubmit });

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

        wrapper.setProps({ fields });

        wrapper.find('input').simulate('blur');

        expect(wrapper.find(Input).prop('errorMessage')).toEqual('Please choose a username');
    });

    it('should updateAndValidate', () => {
        const onSubmit = spy();
        const message = 'Check this checkbox';
        const fields = [
            {
                name: 'name',
                type: 'checkbox',
                label: 'Name',
                validation: [
                    {
                        type: 'required',
                        rules: [
                            { message },
                        ],
                    },
                ],
            },
            {
                name: 'submit',
                type: 'submit',
            },
        ] as FieldType[];
        wrapper.setProps({ fields, onSubmit });

        expect(wrapper.find(Checkbox).prop('errorMessage')).toEqual(undefined);

        wrapper.find('form').simulate('submit');
        expect(onSubmit.calledOnce).toEqual(false);

        expect(wrapper.find(Checkbox).prop('errorMessage')).toEqual(message);

        wrapper.find('input').simulate('change', { target: { checked: true } });

        expect(wrapper.find(Checkbox).prop('errorMessage')).toEqual(undefined);

        wrapper.find('form').simulate('submit');
        expect(onSubmit.calledOnce).toEqual(true);
        expect(onSubmit.calledWith(fields.map(d => d.name === 'name' ? { ...d, value: true } : d))).toEqual(true);

    });

    it('should render textarea', () => {
        const onSubmit = spy();
        const message = 'Fill this textarea';
        const value = 'some content';
        const fields = [
            {
                name: 'name',
                type: 'textarea',
                label: 'Name',
                validation: [
                    {
                        type: 'required',
                        rules: [
                            { message },
                        ],
                    },
                ],
            },
            {
                name: 'submit',
                type: 'submit',
            },
        ] as FieldType[];

        wrapper.setProps({ fields, onSubmit });

        expect(wrapper.find(Textarea).prop('errorMessage')).toEqual(undefined);

        wrapper.find('form').simulate('submit');
        expect(onSubmit.calledOnce).toEqual(false);

        expect(wrapper.find(Textarea).prop('errorMessage')).toEqual(message);

        wrapper.find('textarea').simulate('change', { target: { value } });
        wrapper.find('textarea').simulate('blur');

        expect(wrapper.find(Textarea).prop('errorMessage')).toEqual(undefined);

        wrapper.find('form').simulate('submit');
        expect(onSubmit.calledOnce).toEqual(true);
        expect(onSubmit.calledWith(fields.map(d => d.name === 'name' ? { ...d, value } : d))).toEqual(true);
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
        wrapper.setProps({ fields });

        expect(wrapper.find(Input).props().errorMessage).toEqual(fields[0].errorMessage);

        wrapper.find('form').simulate('submit');

        expect(wrapper.find(Input).props().errorMessage).toEqual(message);
    });

    it('should set the error message after submission', () => {
        const fields = [
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                value: 'a',
            },
        ] as FieldType[];
        wrapper.setProps({ fields });

        expect(wrapper.find(Input).props().value).toEqual('a');

        wrapper.find('input[name="name"]').simulate('change', { target: { value: 'b' } });
        expect(wrapper.find(Input).props().value).toEqual('b');

        wrapper.find('form').simulate('submit');

        const fieldsB = [
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                value: 'c',
            },
        ] as FieldType[];
        wrapper.setProps({ fields: fieldsB });

        expect(wrapper.find(Input).props().value).toEqual('c');
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
        wrapper.setProps({ fields, onSubmit });

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

        wrapper.setProps({ fields, onSubmit });

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
                <input name="testNameInput" defaultValue={props.value as string} onChange={e => props.update({ name: props.name, value: e.target.value })} />,
        };
        const onSubmit = spy();

        wrapper.setProps({ fields, customComponents, onSubmit });

        wrapper.find('input[name="testNameInput"]').simulate('change', { target: { value: 'ok value' } });

        wrapper.find('form').simulate('submit');

        expect(wrapper.find('input[name="testNameInput"]').props().defaultValue).toEqual('ok value');
    });

    it('should render custom group component', () => {
        const groupFields = [
            {
                type: 'button',
                name: 'button',
                label: 'Click me',
            },
            {
                type: 'text',
                name: 'input',
                label: 'Input',
            },
        ] as FieldType[];
        const fields = [
            {
                name: 'name',
                type: 'group',
                label: 'Name',
                validation: [],
                fields: groupFields,
            },
        ] as FieldType[];
        const customComponents = {
            group: (props: CustomComponentProps) => (
                <div>
                    <h2>My Custom Group</h2>
                    {props.children}
                </div>
            ),
        };
        const onButtonClick = spy();

        const onSubmit = spy();

        wrapper.setProps({ fields, customComponents, onSubmit, onButtonClick });

        expect(wrapper.find('h2').text()).toEqual('My Custom Group');
        expect(wrapper.find('button').prop('children')).toEqual('Click me');

        wrapper.find('button').simulate('click');

        expect(wrapper.find('input').prop('name')).toEqual('input');
        expect(onButtonClick.calledWith(groupFields[0], fields)).toEqual(true);

        wrapper.find('form').simulate('submit');
        expect(onSubmit.calledWith(fields)).toEqual(true);
    });

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
        const onButtonClick = spy();

        wrapper.setProps({ fields, onButtonClick });

        wrapper.find('input[name="test-name"]').simulate('change', { target: { value: 'some test value' } });

        wrapper.find('form').find('button[type="button"]').simulate('click');

        const expectedFormFields = fields.map(f => (f.name === 'test-name' ? { ...f, value: 'some test value' } : f));

        expect(onButtonClick.calledWith(fields[1], expectedFormFields)).toEqual(true);
    });
});
