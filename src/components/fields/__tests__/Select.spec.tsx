import * as React from 'react';
import { mount } from 'enzyme';
import { Select } from '../../index';
import { SelectProps } from '../../../export';

describe('<Select />', () => {
  const defaultProps: SelectProps = {
    type: 'select',
    name: 'mySelect',
    updateAndValidate: () => null,
  };

  it('should mount and unmount and render an select field', () => {
    const wrapper = mount(<Select {...defaultProps} />);
    expect(wrapper.find('select').exists()).toEqual(true);
    wrapper.unmount();
  });

  it('should render the default option with placeholder', () => {
    const wrapper = mount(<Select {...defaultProps} placeholder="Select..." />);
    expect(wrapper.find('select').find('option').at(0).text()).toEqual('Select...');
    wrapper.unmount();
  });

  it('should render two options', () => {
    const options = [{ value: 5, label: 'Fifth' }, { value: '6' }];
    const wrapper = mount(<Select {...defaultProps} options={options} />);
    const optionElements = wrapper.find('select').find('option');
    expect(optionElements.at(0).prop('value')).toEqual(5);
    expect(optionElements.at(0).text()).toEqual('Fifth');
    expect(optionElements.at(1).prop('value')).toEqual('6');
    expect(optionElements.at(1).text()).toEqual('6');
    wrapper.unmount();
  });
});
