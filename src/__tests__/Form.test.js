import React, { Component } from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import Form from '../Form';
import Input from '../fields/Input';

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

    expect(wrapper.find(Input).props().value).toEqual(newValue)
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
  });

  it('should submit the default values', () => {
    const onSubmit = spy();
    const fields = [
      {
        id: 'name',
        type: 'text',
        label: 'Name',
        value: 'some default value',
      },{
        id: 'submitBtn',
        label: 'Submit',
        type: 'button'
      }
    ];
    const wrapper = mount(<Form id="testFormId" fields={fields} onSubmit={onSubmit} />);

    wrapper.find('form').simulate('submit');
    expect(onSubmit.calledWith({ name: 'some default value' })).toEqual(true)
  });

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

    expect(wrapper.find(Input).props().errorMessage).toEqual('Please choose a username')
  });

  it('should show the default error message when there is some', () => {
    const fields = [
      {
        id: 'name',
        type: 'text',
        label: 'Name',
        errorMessage: 'some error message',
      }
    ];
    const wrapper = mount(<Form id="testFormId" fields={fields} onSubmit={() => {}} />);

    expect(wrapper.find(Input).props().errorMessage).toEqual(fields[0].errorMessage);

    wrapper.find('form').simulate('submit');

    expect(wrapper.find(Input).props().errorMessage).toEqual(fields[0].errorMessage)
  });

  it('should set the error message after submission', () => {
    class App extends Component {
      constructor(props){
        super(props);
        this.setErrorMessage = this.setErrorMessage.bind(this);
        this.state = {
          fields: [
            {
              id: 'name',
              type: 'text',
              label: 'Name',
              errorMessage: 'error 1'
            }
          ]
        };
      }

      setErrorMessage() {
        this.setState({ fields: this.state.fields.map(x => x.id === 'name' ?  {...x, errorMessage: 'error 2' } : x) })
      }

      render () {
        return (<Form id="testFormId" fields={this.state.fields} onSubmit={this.setErrorMessage} />);
      }
    }

    const wrapper = mount(<App />);
    expect(wrapper.find(Input).props().errorMessage).toEqual('error 1');
    wrapper.find('form').simulate('submit');
    expect(wrapper.find(Input).props().errorMessage).toEqual('error 2');
  });

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

    expect(wrapper.find(Input).props().errorMessage).toEqual('Please choose a username')
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
