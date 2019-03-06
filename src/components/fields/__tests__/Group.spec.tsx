import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { spy } from 'sinon';

import { Input, Group } from '../../index';
import { GroupPropsFinal } from '../types';

const defaultProps: GroupPropsFinal = {
    name: 'first-group',
    type: 'group',
    children: [],
};

describe('<Group />', () => {

    let wrapper: ReactWrapper;
    beforeEach(() => {
        wrapper = mount(<Group {...defaultProps} />);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('render legend if passwd in', () => {
        const legend = 'Group Legend';
        wrapper.setProps({ legend });
        expect(wrapper.text()).toEqual(legend);
    });

    it('renders a input and button element as a child', () => {
        const update = spy();
        const name = 'group-input';
        const children = [
            <Input key="uno" update={update} validate={() => null} type="text" name={name} />,
        ];
        wrapper.setProps({ children });

        const value = 'a value';
        wrapper.find('input').simulate('change', { target: { value }});
        expect(update.calledWith({ name, value, groupName: undefined })).toEqual(true);
    });
});
