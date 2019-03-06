import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';

import { Checkbox, Label, ErrorMessage } from '../../index';
import { CheckBoxPropsFinal } from '../types';

const props: CheckBoxPropsFinal = {
    name: 'checkboxName',
    type: 'checkbox',
    updateAndValidate: () => null,
};

describe('<Checkbox />', () => {
    it('should mount and unmout and render an input field', () => {
        const wrapper = mount(<Checkbox {...props} />);
        expect(wrapper.find('input').exists()).toEqual(true);
        expect(wrapper.find('input[type="checkbox"]').exists()).toEqual(true);
        expect(wrapper.find(`input[name="${props.name}"]`).exists()).toEqual(true);
        wrapper.unmount();
    });

    it('should show checked checkbox when value is true', () => {
        const wrapper = shallow(<Checkbox {...props} value={true} />);
        expect(wrapper.find(`input[name="${props.name}"]`).prop('defaultChecked')).toEqual(true);
    });

    it('should show not checked checkbox by default', () => {
        const wrapper = shallow(<Checkbox {...props} />);
        expect(wrapper.find(`input[name="${props.name}"]`).prop('defaultChecked')).toEqual(false);
    });

    it('should show errorMessage when available', () => {
        const message = 'some error';
        const wrapper = shallow(<Checkbox {...props} errorMessage={message} />);
        expect(wrapper.find(ErrorMessage).exists()).toEqual(true);
        expect(wrapper.find(ErrorMessage).props()).toEqual({ message });
    });

    it('should show label when passed down', () => {
        const label = 'some meaningful label';
        const wrapper = shallow(<Checkbox {...props} label={label} />);

        expect(wrapper.find(Label).exists()).toEqual(true);
    });

    it('should call updateAndValidate when checked', () => {
        const updateAndValidate = spy();
        const wrapper = shallow(<Checkbox {...props} updateAndValidate={updateAndValidate} />);

        wrapper.find('input').simulate('change', { target: { checked: true } });
        expect(updateAndValidate.calledWith({ name: props.name, value: true, groupName: undefined })).toEqual(true);

        wrapper.find('input').simulate('change', { target: { checked: false } });
        expect(updateAndValidate.calledWith({ name: props.name, value: false, groupName: undefined })).toEqual(true);
    });
});
