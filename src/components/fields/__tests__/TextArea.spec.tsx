import * as React from 'react';
import { mount, shallow } from 'enzyme';

import Textarea from '../Textarea';
import { Label, ErrorMessage } from '../../index';
import { TextAreaProps } from '../../../export';

const name = 'some field name';
const defaultProps: TextAreaProps = {
  name,
  type: 'textarea',
  update: () => null,
  validate: () => null,
};

describe('<Textarea />', () => {
  it('should mount and unmout and render an textarea', () => {
    const wrapper = mount(<Textarea {...defaultProps} />);
    expect(wrapper.find('textarea').exists()).toEqual(true);
    wrapper.unmount();
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
    const wrapper = shallow(<Textarea {...defaultProps} disabled={true} />);
    expect(wrapper.find('textarea').prop('disabled')).toEqual(true);
  });

  it('should call update method on change', () => {
    const update = jest.fn();
    const value = 'aaa value';
    const wrapper = shallow(<Textarea {...defaultProps} update={update} />);

    wrapper.find('textarea').simulate('change', { target: { value } });
    expect(update).toHaveBeenCalledWith({ name, value, groupName: undefined });
  });

  it('should call validate method on blur', () => {
    const validate = jest.fn();
    const wrapper = shallow(<Textarea {...defaultProps} validate={validate} groupName="testGroupId" />);

    wrapper.find('textarea').simulate('blur');
    expect(validate).toHaveBeenCalledWith({ name });
  });
});
