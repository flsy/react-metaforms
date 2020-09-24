import * as React from 'react';
import { mount } from 'enzyme';
import { Field, IForm } from 'metaforms';
import Form from '../../export';
import { Checkbox, Group, Input, Submit, Textarea } from '../../stories/components';
import { Components } from '../../interfaces';

describe('<Form />', () => {
  const components: Components<any> = ({ name, component, ref, actions, groupChildren }) => {
    switch (component.type) {
      case 'text':
        return <Input key={name} ref={ref} name={name} {...component} {...actions} />;
      case 'submit':
        return <Submit key={name} name={name} {...component} {...actions} />;
      case 'group':
        return <Group key={name} {...component} children={groupChildren} />;
      case 'checkbox':
        return <Checkbox ref={ref} key={name} name={name} {...component} {...actions} />;
      case 'textarea':
        return <Textarea ref={ref} key={name} name={name} {...component} {...actions} />;
      case 'button':
        return <button>{component.label}</button>;
      default:
        return <div>{component.type}</div>;
    }
  };

  const app = <T extends Field>(form: IForm<T>, onSubmit?: any) => {
    const App: React.FC<any> = (props) => {
      const [stateForm, onFormChange] = React.useState(props.form);

      return (
        <Form onFormChange={onFormChange} form={stateForm} onSubmit={props.onSubmit} components={props.components} />
      );
    };

    return mount(<App {...{ components, form, onSubmit }} />);
  };

  it('should render and update a field', () => {
    const fields = {
      name: {
        type: 'text',
        label: 'Name',
      },
    };

    const wrapper = app(fields);

    const newValue = 'My new value';
    wrapper.find('input').simulate('change', { target: { value: newValue } });

    expect(wrapper.find(Input).props().value).toEqual(newValue);
    wrapper.unmount();
  });

  it('should update default value to empty string', () => {
    const fields = {
      name: {
        type: 'text',
        label: 'Name',
        value: 'some default value',
      },
    };

    const wrapper = app(fields);
    wrapper.find('input').simulate('change', { target: { value: 'ee' } });

    expect(wrapper.find('input').props().defaultValue).toEqual('ee');
    wrapper.unmount();
  });

  it('should submit the default values', () => {
    const onSubmit = jest.fn();
    const fields = {
      name: {
        type: 'text',
        label: 'Name',
        value: 'some default value',
      },
      submitBtn: {
        label: 'Submit',
        type: 'submit',
      },
    };
    const wrapper = app(fields, onSubmit);

    wrapper.find('form').simulate('submit');

    const formData = { name: 'some default value' };
    expect(onSubmit).toHaveBeenCalledWith(fields, formData);
    wrapper.unmount();
  });

  it('should validate', () => {
    const fields = {
      name: {
        type: 'text',
        label: 'Name',
        validation: [
          {
            type: 'required',
            message: 'Please choose a username',
          },
        ],
      },
    };

    const wrapper = app(fields as any);

    wrapper.find('input').simulate('blur');

    expect(wrapper.find(Input).prop('errorMessage')).toEqual('Please choose a username');
    wrapper.unmount();
  });

  it('should updateAndValidate', () => {
    const onSubmit = jest.fn();
    const message = 'Check this checkbox';
    const fields = {
      name: {
        type: 'checkbox',
        label: 'Name',
        validation: [
          {
            type: 'required',
            message,
          },
        ],
      },
      submit: {
        type: 'submit',
      },
    };

    const wrapper = app(fields as any, onSubmit);

    expect(wrapper.find(Checkbox).prop('errorMessage')).toEqual(undefined);

    wrapper.find('form').simulate('submit');
    expect(onSubmit).not.toHaveBeenCalled();

    expect(wrapper.find(Checkbox).prop('errorMessage')).toEqual(message);

    wrapper.find('input').simulate('change', { target: { checked: true } });

    expect(wrapper.find(Checkbox).prop('errorMessage')).toEqual(undefined);

    wrapper.find('form').simulate('submit');
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(
      {
        name: {
          label: 'Name',
          type: 'checkbox',
          validation: [
            {
              message: 'Check this checkbox',
              type: 'required',
            },
          ],
          value: true,
        },
        submit: {
          type: 'submit',
        },
      },
      { name: true },
    );
    wrapper.unmount();
  });

  it('should render textarea', () => {
    const onSubmit = jest.fn();
    const message = 'Fill this textarea';
    const value = 'some content';
    const fields = {
      name: {
        type: 'textarea',
        label: 'Name',
        validation: [
          {
            type: 'required',
            message,
          },
        ],
      },
      submit: {
        type: 'submit',
      },
    };

    const wrapper = app(fields as any, onSubmit);

    expect(wrapper.find(Textarea).prop('errorMessage')).toEqual(undefined);

    wrapper.find('form').simulate('submit');
    expect(onSubmit).not.toHaveBeenCalled();

    expect(wrapper.find(Textarea).prop('errorMessage')).toEqual(message);

    wrapper.find('textarea').simulate('change', { target: { value } });
    wrapper.find('textarea').simulate('blur');

    expect(wrapper.find(Textarea).prop('errorMessage')).toEqual(undefined);

    wrapper.find('form').simulate('submit');
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(
      {
        name: {
          label: 'Name',
          type: 'textarea',
          validation: [
            {
              message: 'Fill this textarea',
              type: 'required',
            },
          ],
          value: 'some content',
        },
        submit: {
          type: 'submit',
        },
      },
      { name: 'some content' },
    );
    wrapper.unmount();
  });

  it('should show the default error message when there is some', () => {
    const message = 'Please choose a username';
    const fields = {
      name: {
        type: 'text',
        label: 'Name',
        errorMessage: 'some error message',
        validation: [
          {
            type: 'required',

            message,
          },
        ],
      },
    };
    const wrapper = app(fields as any);

    expect(wrapper.find(Input).props().errorMessage).toEqual(fields.name.errorMessage);

    wrapper.find('form').simulate('submit');

    expect(wrapper.find(Input).props().errorMessage).toEqual(message);
    wrapper.unmount();
  });

  it('should not submit the form with invalid values', () => {
    const fields = {
      name: {
        type: 'text',
        label: 'Name',
        validation: [
          {
            type: 'required',

            message: 'Please choose a username',
          },
        ],
      },
    };
    const onSubmit = jest.fn();

    const wrapper = app(fields as any, onSubmit);

    wrapper.find('form').simulate('submit');

    expect(wrapper.find(Input).props().errorMessage).toEqual('Please choose a username');
    wrapper.unmount();
  });

  it('should submit the form with all values valid', () => {
    const fields = {
      name: {
        type: 'text',
        label: 'Name',
        validation: [
          {
            type: 'required',
            message: 'Please choose a username X',
          },
        ],
      },
    };
    const onSubmit = jest.fn();

    const wrapper = app(fields as any, onSubmit);

    wrapper.find('input[name="name"]').simulate('change', { target: { value: 'ok value' } });

    wrapper.find('form').simulate('submit');

    expect(onSubmit).toHaveBeenCalledWith(
      {
        name: {
          label: 'Name',
          type: 'text',
          validation: [
            {
              message: 'Please choose a username X',
              type: 'required',
            },
          ],
          value: 'ok value',
        },
      },
      { name: 'ok value' },
    );
    wrapper.unmount();
  });
});
