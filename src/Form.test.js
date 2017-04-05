import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import Form from './Form';
import Text from './fields/Text';

describe('<Form />', () => {
  it('should render and update a field', () => {
    const fields = [
      {
        id: 'name',
        type: 'text',
        label: 'Name',
      }
    ];
    const wrapper = mount(<Form id="testFormId" fields={fields} onSubmit={() => {}} />);
    const newValue = 'My new value';
    wrapper.find('input').simulate('change', {target: {value: newValue }});

    expect(wrapper.find(Text).props().value).toEqual(newValue)
  });

  it('should update default value to empty string', () => {
    const fields = [
      {
        id: 'name',
        type: 'text',
        label: 'Name',
        value: 'some default value',
      }
    ];
    const wrapper = mount(<Form id="testFormId" fields={fields} onSubmit={() => {}} />);
    wrapper.find('input').simulate('change', {target: {value: '' }});

    expect(wrapper.find('input').props().defaultValue).toEqual('')
  })

  it('should validate', () => {
    const fields = [
      {
        id: 'name',
        type: 'text',
        label: 'Name',
        validation: [
          {
            type: "required",
            rules: [
              {
                message: "Please choose a username"
              }
            ]
          }
        ]
      }
    ];
    const wrapper = mount(<Form id="testFormId" fields={fields} onSubmit={() => {}} />);
    wrapper.find('input').simulate('blur');

    expect(wrapper.find(Text).props().errorMessage).toEqual('Please choose a username')
  })

  it('should not submit the form with invalid values', () => {
    const fields = [
      {
        id: 'name',
        type: 'text',
        label: 'Name',
        validation: [
          {
            type: "required",
            rules: [
              {
                message: "Please choose a username"
              }
            ]
          }
        ]
      }
    ];
    const onSubmit = spy();
    const wrapper = mount(<Form id="testFormId" fields={fields} onSubmit={onSubmit} />);
    wrapper.find('form').simulate('submit');

    expect(wrapper.find(Text).props().errorMessage).toEqual('Please choose a username')
  })

  it('should submit the form with all values valid', () => {
    const fields = [
      {
        id: 'name',
        type: 'text',
        label: 'Name',
        validation: [
          {
            type: "required",
            rules: [
              {
                message: "Please choose a username"
              }
            ]
          }
        ]
      }
    ];
    const onSubmit = spy();
    const wrapper = mount(<Form id="testFormId" fields={fields} onSubmit={onSubmit} />);
    wrapper.find('input').simulate('change', {target: {value: 'ok value' }});

    wrapper.find('form').simulate('submit');
    expect(onSubmit.calledWith({ name: 'ok value' })).toEqual(true)
  })
});
