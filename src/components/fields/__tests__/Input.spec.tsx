import * as React from 'react';
import { mount, shallow, configure } from 'enzyme';
import { spy } from 'sinon';

import * as Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { Input, Label, ErrorMessage } from '../../index';
import { InputPropsFinal } from '../types';

const name = 'test_field_name';
const defaultProps: InputPropsFinal = {
    name,
    type: 'text',
    update: () => null,
    validate: () => null,
};

describe('<Input />', () => {
    it('should mount and unmout and render an input field', () => {
        const wrapper = mount(<Input {...defaultProps} />);
        expect(wrapper.find('input').exists()).toEqual(true);
        wrapper.unmount();
    });

    it('should render <Label /> component', () => {
        const wrapper = shallow(<Input {...defaultProps} label="some label"/>);
        expect(wrapper.find(Label).exists()).toEqual(true);
    });

    it('should render <ErrorMessage /> component', () => {
        const wrapper = shallow(<Input {...defaultProps} errorMessage="erorr"/>);
        expect(wrapper.find(ErrorMessage).exists()).toEqual(true);
    });

    it('should render correct type', () => {
        const wrapper = shallow(<Input {...defaultProps} />);
        expect(wrapper.find('input[type="text"]').exists()).toEqual(true);
        wrapper.setProps({ type: 'password' });
        expect(wrapper.find('input[type="password"]').exists()).toEqual(true);
    });

    it('should render disabled input component', () => {
        const wrapper = shallow(<Input {...defaultProps} disabled={true} />);
        expect(wrapper.find('input').prop('disabled')).toEqual(true);
    });

    it('should call update method on change', () => {
        const update = spy();
        const value = 'aaa value';
        const wrapper = shallow(<Input {...defaultProps} update={update}/>);

        wrapper.find('input').simulate('change', { target: { value } });
        expect(update.calledWith({ name, value, groupName: undefined })).toEqual(true);
    });

    it('should call validate method on blur', () => {
        const validate = spy();
        const wrapper = shallow(<Input {...defaultProps} validate={validate} groupName="testGroupName" />);

        wrapper.find('input').simulate('blur');
        expect(validate.calledWith({ name })).toEqual(true);
    });
});
