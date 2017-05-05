import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldShape } from './shapes';

import { hasError, findField, createFieldId } from './utils/utils';
import validate from './utils/validate';
import getComponent from './utils/getComponent';


class Form extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.update = this.update.bind(this);
    this.validate = this.validate.bind(this);
    this.updateAndValidate = this.updateAndValidate.bind(this);
    this.getValue = this.getValue.bind(this);
    this.getComponent = this.getComponent.bind(this);
    this.state = {}; // value, errorMessage
  }

  update({ name, value }) {
    this.setState({
      [name]: { ...this.state[name], value }
    })
  }

  getValue(name) {
    if (this.state[name] && this.state[name].value !== null) {
      return this.state[name].value
    }
    const field = this.props.fields.find(f => f.name === name);
    return field ? field.value : '';
  }

  getErrorMessage(name) {
    if (this.state[name] && this.state[name].errorMessage !== null) {
      return this.state[name].errorMessage
    }
    const field = this.props.fields.find(f => f.name === name);
    return field ? field.errorMessage : '';
  }

  validate({ name, groupName }) {
    const field = findField(name, groupName, this.props.fields);

    const errorMessage = validate(this.getValue(name), field.validation, this.getFormData());
    this.setState({
      [name]: { ...this.state[name], errorMessage }
    });
  }

  updateAndValidate({ name, value, groupName }) {
    const field = findField(name, groupName, this.props.fields);

    const errorMessage = validate(value, field.validation, this.getFormData());
    this.setState({
      [name]: { ...this.state[name], errorMessage, value }
    });
  }

  getFormData() {
    const fromState = {};
    Object.keys(this.state).forEach(name => {
      fromState[name] = this.state[name].value;
    });

    const fromProps = {};
    this.props.fields.forEach(field => {
      fromProps[field.name] = field.value;
    });

    const merged = {...fromProps, ...fromState};
    const final = {};
    Object.keys(merged).forEach(field => {
      if (merged[field]) {
        final[field] = merged[field];
      }
    });

    return final;
  }

  onSubmit(event) {
    event.preventDefault();

    const formData = this.getFormData();
    const validated = this.props.fields
      .filter(field => field.validation)
      .map(field => ({ name: field.name, value: this.getValue(field.name), errorMessage: validate(this.getValue(field.name), field.validation, formData) }));

    if (hasError(validated)) {

      const x = {};
      validated.forEach(s => {
        x[s.name] = { value: s.value, errorMessage: s.errorMessage }
      });

      this.setState(x);
    } else {
      this.props.onSubmit(this.getFormData());
    }
  }

  getComponent(fields, groupName) {
    return fields.map(field => {
      if (field.fields) {
        const id = createFieldId(field.name);
        return getComponent({ ...field, key: id, id, components: this.getComponent(field.fields, field.name) });
      }
      const id = createFieldId(field.name, groupName);
      return getComponent({...field,
        key: id,
        id,
        groupName,
        value: this.getValue(field.name),
        update: this.update,
        validate: this.validate,
        updateAndValidate: this.updateAndValidate,
        errorMessage: this.getErrorMessage(field.name)
      })
    })
  }

  render() {
    return (
        <form id={this.props.id} onSubmit={this.onSubmit}>
          {this.getComponent(this.props.fields)}
        </form>
    );
  }
}

Form.propTypes = {
  id: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(fieldShape),
  onSubmit: PropTypes.func.isRequired
};

Form.defaultProps = {
  fields: []
};

export default Form;
