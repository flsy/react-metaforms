import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { Group, Input } from '../../index';
import { Props } from '../Group';

const defaultProps: Props = {
  name: 'first-group',
  type: 'group',
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
    const update = jest.fn();
    const name = 'group-input';
    const children = [<Input key="uno" update={update} validate={() => null} type="text" name={name} />];
    wrapper.setProps({ children });

    const value = 'a value';
    wrapper.find('input').simulate('change', { target: { value } });
    expect(update).toHaveBeenCalledWith({ name, value, groupName: undefined });
  });
});
