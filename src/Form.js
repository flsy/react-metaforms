import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldShape } from './shapes';

import { hasError } from './utils/utils';
import validate from './utils/validate';
import getComponent from './utils/getComponent';


class Form extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.update = this.update.bind(this);
    this.validate = this.validate.bind(this);
    this.getValue = this.getValue.bind(this);
    this.getComponent = this.getComponent.bind(this);
    this.state = {}; // value, errorMessage
  }

  update(id, value) {
    this.setState({
      [id]: { ...this.state[id], value }
    })
  }

  getValue(id) {
    if (this.state[id] && this.state[id].value !== null) {
      return this.state[id].value
    }
    const field = this.props.fields.find(f => f.id === id);
    return field ? field.value : '';
  }

  getErrorMessage(id) {
    const field = this.state[id];
    return field ? field.errorMessage : ''
  }

  validate(id, groupId = null) {
    let field;
    if (groupId) {
      const group = this.props.fields.find(f => f.id === groupId);
      field = group.fields.find(f => f.id === id)
    } else {
      field = this.props.fields.find(f => f.id === id);
    }


    const errorMessage = validate(this.getValue(id), field.validation, this.getFormData());
    this.setState({
      [id]: { ...this.state[id], errorMessage }
    });
  }

  getFormData() {
    const fromState = {};
    Object.keys(this.state).forEach(id => {
      fromState[id] = this.state[id].value;
    });

    const fromProps = {};
    this.props.fields.forEach(field => {
      fromProps[field.id] = field.value;
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
      .map(field => ({ id: field.id, value: this.getValue(field.id), errorMessage: validate(this.getValue(field.id), field.validation, formData) }));

    if (hasError(validated)) {

      const x = {};
      validated.forEach(s => {
        x[s.id] = { value: s.value, errorMessage: s.errorMessage }
      });

      this.setState(x);
    } else {
      this.props.onSubmit(this.getFormData());
    }
  }

  getComponent(fields, groupId) {
    return fields.map(field => {
      if (field.fields) {
        return getComponent({ ...field, key: field.id, components: this.getComponent(field.fields, field.id) });
      }
      return getComponent({...field,
        key: field.id,
        groupId,
        value: this.getValue(field.id),
        update: this.update,
        validate: this.validate,
        errorMessage: this.getErrorMessage(field.id)
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
