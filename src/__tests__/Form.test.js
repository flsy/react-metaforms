import React, { Component } from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import Form from '../Form';
import Input from '../fields/Input';

describe('<Form />', () => {
  it('should render and update a field', () => {
    const fields = [
      {
        name: 'name',
        type: 'text',
        label: 'Name',
      },
    ];
    const wrapper = mount(<Form id="testFormId" fields={fields} onSubmit={() => {}} />);
    const newValue = 'My new value';
    wrapper.find('input').simulate('change', { target: { value: newValue } });

    expect(wrapper.find(Input).props().value).toEqual(newValue);
  });

  it('should update default value to empty string', () => {
    const fields = [
      {
        name: 'name',
        type: 'text',
        label: 'Name',
        value: 'some default value',
      },
    ];
    const wrapper = mount(<Form id="testFormId" fields={fields} onSubmit={() => {}} />);
    wrapper.find('input').simulate('change', { target: { value: '' } });

    expect(wrapper.find('input').props().defaultValue).toEqual('');
  });

  it('should submit the default values', () => {
    const onSubmit = spy();
    const fields = [
      {
        name: 'name',
        type: 'text',
        label: 'Name',
        value: 'some default value',
      },
      {
        name: 'submitBtn',
        label: 'Submit',
        type: 'button',
      },
    ];
    const wrapper = mount(<Form id="testFormId" fields={fields} onSubmit={onSubmit} />);

    wrapper.find('form').simulate('submit');
    expect(onSubmit.calledWith({ name: 'some default value' })).toEqual(true);
  });

  it('should validate', () => {
    const fields = [
      {
        name: 'name',
        type: 'text',
        label: 'Name',
        validation: [
          {
            type: 'required',
            rules: [
              {
                message: 'Please choose a username',
              },
            ],
          },
        ],
      },
    ];
    const wrapper = mount(<Form id="testFormId" fields={fields} onSubmit={() => {}} />);
    wrapper.find('input').simulate('blur');

    expect(wrapper.find(Input).props().errorMessage).toEqual('Please choose a username');
  });

  it('should show the default error message when there is some', () => {
    const fields = [
      {
        name: 'name',
        type: 'text',
        label: 'Name',
        errorMessage: 'some error message',
        validation: [
          {
            type: 'required',
            rules: [
              {
                message: 'Please choose a username',
              },
            ],
          },
        ],
      },
    ];
    const wrapper = mount(<Form id="testFormId" fields={fields} onSubmit={() => {}} />);

    expect(wrapper.find(Input).props().errorMessage).toEqual(fields[0].errorMessage);

    wrapper.find('form').simulate('submit');

    expect(wrapper.find(Input).props().errorMessage).toEqual(fields[0].validation[0].rules[0].message);
  });

  it('should set the error message after submission', () => {
    class App extends Component {
      constructor(props) {
        super(props);
        this.setErrorMessage = this.setErrorMessage.bind(this);
        this.state = {
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Name',
              errorMessage: 'error 1',
            },
          ],
        };
      }

      setErrorMessage() {
        this.setState({ fields: this.state.fields.map(x => (x.name === 'name' ? { ...x, errorMessage: 'error 2' } : x)) });
      }

      render() {
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
        name: 'name',
        type: 'text',
        label: 'Name',
        validation: [
          {
            type: 'required',
            rules: [
              {
                message: 'Please choose a username',
              },
            ],
          },
        ],
      },
    ];
    const onSubmit = spy();
    const wrapper = mount(<Form id="testFormId" fields={fields} onSubmit={onSubmit} />);
    wrapper.find('form').simulate('submit');

    expect(wrapper.find(Input).props().errorMessage).toEqual('Please choose a username');
  });

  it('should submit the form with all values valid', () => {
    const fields = [
      {
        name: 'name',
        type: 'text',
        label: 'Name',
        validation: [
          {
            type: 'required',
            rules: [
              {
                message: 'Please choose a username',
              },
            ],
          },
        ],
      },
    ];
    const onSubmit = spy();
    const wrapper = mount(<Form id="testFormId" fields={fields} onSubmit={onSubmit} />);
    wrapper.find('input').simulate('change', { target: { value: 'ok value' } });

    wrapper.find('form').simulate('submit');
    expect(onSubmit.calledWith({ name: 'ok value' })).toEqual(true);
  });

  it('should render and submit customComponents', () => {
    const fields = [
      {
        name: 'name',
        type: 'text',
        label: 'Name',
        validation: [],
      },
    ];
    const customComponents = {
      text: props => <input name="testNameInput" defaultValue={props.value} onChange={e => props.update({ name: props.name, value: e.target.value })} /> // eslint-disable-line
    };
    const onSubmit = spy();
    const wrapper = mount(<Form id="testFormId" fields={fields} onSubmit={onSubmit} customComponents={customComponents} />);
    wrapper.find('input[name="testNameInput"]').simulate('change', { target: { value: 'ok value' } });

    wrapper.find('form').simulate('submit');

    expect(wrapper.find('input[name="testNameInput"]').props().defaultValue).toEqual('ok value');
  });


  it('should render custom group component', () => {
    const fields = [
      {
        name: 'name',
        type: 'group',
        label: 'Name',
        validation: [],
        fields: [
          {
            type: 'button',
            name: 'button',
            label: 'Click me',
          },
          {
            type: 'text',
            name: 'input',
            label: 'Input',
          },
        ]
      },
    ];
    const customComponents = {
      group: ({ components }) => (<div>{components.map(component => <span key={component.key}>{component}</span>)}</div>)
    };
    const onSubmit = spy();
    const wrapper = mount(<Form id="testFormId" fields={fields} onSubmit={onSubmit} customComponents={customComponents} />);

    expect(wrapper.find('button').prop('children')).toEqual('Click me');
    expect(wrapper.find('input').prop('name')).toEqual('input');
  });

});
