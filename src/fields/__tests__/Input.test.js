import React from 'react';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';

import Input from '../Input';
import Label from '../Label';
import ErrorMessage from '../ErrorMessage';

const fieldId = 'testId';
const defaultProps = {
  id: fieldId,
  type: "text",
  update: ()=>{},
  validate: () => {}
};

describe('<Input />', () => {
  it('should mount and unmout and render an input field', () => {
    const wrapper = mount(<Input {...defaultProps} />);
    expect(wrapper.find('input').exists()).toEqual(true);
    wrapper.unmount()
  });

  it('should render <Label /> component', () => {
    const wrapper = shallow(<Input {...defaultProps} label="some label" />);
    expect(wrapper.find(Label).exists()).toEqual(true);
  });

  it('should render <ErrorMessage /> component', () => {
    const wrapper = shallow(<Input {...defaultProps} errorMessage="erorr" />);
    expect(wrapper.find(ErrorMessage).exists()).toEqual(true);
  });

  it('should render correct type', () => {
    const wrapper = shallow(<Input {...defaultProps} />);
    expect(wrapper.find('input[type="text"]').exists()).toEqual(true);
    wrapper.setProps({ type: 'password'});
    expect(wrapper.find('input[type="password"]').exists()).toEqual(true);
  });

  it('should render disabled input component', () => {
    const wrapper = shallow(<Input {...defaultProps} disabled />);
    expect(wrapper.find('input').prop('disabled')).toEqual(true);
  });

  it('should call update method on change', () => {
    const update = spy();
    const value = 'aaa value';
    const wrapper = shallow(<Input {...defaultProps} update={update} />);

    wrapper.find('input').simulate('change', {target: { value }});
    expect(update.calledWith(fieldId, value)).toEqual(true);
  });

  it('should call validate method on blur', () => {
    const validate = spy();
    const groupId = 'testGroupId';
    const wrapper = shallow(<Input {...defaultProps} validate={validate} groupId={groupId} />);

    wrapper.find('input').simulate('blur');
    expect(validate.calledWith(fieldId, groupId)).toEqual(true);
  });
});
