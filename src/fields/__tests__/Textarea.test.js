import React from 'react';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';

import Textarea from '../Textarea';
import Label from '../Label';
import ErrorMessage from '../ErrorMessage';

const fieldId = 'testId';
const defaultProps = {
  id: fieldId,
  update: ()=>{},
  validate: () => {}
};

describe('<Textarea />', () => {
  it('should mount and unmout and render an textarea', () => {
    const wrapper = mount(<Textarea {...defaultProps} />);
    expect(wrapper.find('textarea').exists()).toEqual(true);
    wrapper.unmount()
  });

  it('should render <Label /> component', () => {
    const wrapper = shallow(<Textarea {...defaultProps} label="some label" />);
    expect(wrapper.find(Label).exists()).toEqual(true);
  });

  it('should render <ErrorMessage /> component', () => {
    const wrapper = shallow(<Textarea {...defaultProps} errorMessage="erorr" />);
    expect(wrapper.find(ErrorMessage).exists()).toEqual(true);
  });


  it('should render disabled input component', () => {
    const wrapper = shallow(<Textarea {...defaultProps} disabled />);
    expect(wrapper.find('textarea').prop('disabled')).toEqual(true);
  });

  it('should call update method on change', () => {
    const update = spy();
    const value = 'aaa value';
    const wrapper = shallow(<Textarea {...defaultProps} update={update} />);

    wrapper.find('textarea').simulate('change', {target: { value }});
    expect(update.calledWith(fieldId, value)).toEqual(true);
  });

  it('should call validate method on blur', () => {
    const validate = spy();
    const groupId = 'testGroupId';
    const wrapper = shallow(<Textarea {...defaultProps} validate={validate} groupId={groupId} />);

    wrapper.find('textarea').simulate('blur');
    expect(validate.calledWith(fieldId, groupId)).toEqual(true);
  });
});
