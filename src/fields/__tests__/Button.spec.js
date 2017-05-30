import React from 'react';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';

import Button from '../Button';

const name = 'test_field_name';
const defaultProps = {
  label: 'testId',
  name,
  onBtnClick: spy(),
  action: 'AN_ACTION',
};

describe('<Button />', () => {
  it('renders the button', () => {
    const wrapper = mount(<Button {...defaultProps} />);
    expect(wrapper.find('button').exists()).toEqual(true);
    wrapper.unmount();
  });

  it('renders the button with default button type', () => {
    expect(shallow(<Button {...defaultProps} />).find('button[type="button"]').exists()).toEqual(true);
  });

  it('calls the callback with action', () => {
    const wrapper = shallow(<Button {...defaultProps} />);

    wrapper.find('button').simulate('click');

    expect(defaultProps.onBtnClick.calledWith(defaultProps.action)).toEqual(true);
  });
});
