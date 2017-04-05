import React, { Component, PropTypes } from 'react';
import { fieldShape } from './shapes';

import validate from './utils/validate';
import getComponent from './utils/getComponent';


class Form extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.update = this.update.bind(this);
    this.validate = this.validate.bind(this);
    this.getValue = this.getValue.bind(this);
    this.state = {} // value, errorMessage
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
    const field = this.props.fields.find(f => f.id === id)
    return field ? field.value : '';
  }

  getErrorMessage(id) {
    const field = this.state[id];
    return field ? field.errorMessage : ''
  }

  validate(id) {
    const field = this.props.fields.find(f => f.id === id)
    const errorMessage = validate(this.getValue(id), field.validation, this.state);
    this.setState({
      [id]: { ...this.state[id], errorMessage }
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const validated = this.props.fields
      .filter(field => field.validation)
      .map(field => ({ id: field.id, value: this.getValue(field.id), errorMessage: validate(this.getValue(field.id), field.validation, this.state) }));

    const hasError = validated.find(field => field.errorMessage !== "");
    if (hasError) {

      const x = {};
      validated.forEach(s => {
        x[s.id] = { value: s.value, errorMessage: s.errorMessage }
      });

      this.setState(x);
    } else {
      const formData = {};
      Object.keys(this.state).forEach(id => {
        formData[id] = this.state[id].value;
      });
      this.props.onSubmit(formData);
    }

  }

  render() {
    return (
        <form id={this.props.id} onSubmit={this.onSubmit}>
          {this.props.fields.map(field => getComponent({...field,
            key: field.id,
            value: this.getValue(field.id),
            update: this.update,
            validate: this.validate,
            errorMessage: this.getErrorMessage(field.id)
          }))}
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
