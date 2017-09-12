import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldShape } from './shapes';

import {
  createFieldId,
  shouldComponentFocus,
  getValue,
  getErrorMessage,
  validateField,
  validateFields,
  getFormData,
  getFields,
} from './utils/utils';
import getComponent from './utils/getComponent';


class Form extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.update = this.update.bind(this);
    this.validate = this.validate.bind(this);
    this.updateAndValidate = this.updateAndValidate.bind(this);
    this.getComponent = this.getComponent.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.state = {}; // value, errorMessage
  }

  componentWillReceiveProps(nextProps) {
    const current = getFormData(this.props.fields);
    const next = getFormData(nextProps.fields);

    const diff = {};
    Object.keys(next).forEach((key) => {
      if (next[key] !== current[key]) {
        diff[key] = { value: next[key] };
      }
    });

    if (Object.keys(diff).length > 0) {
      this.setState({ ...this.state, ...diff });
    }
  }

  onSubmit(event) {
    event.preventDefault();

    const { state, hasError } = validateFields(this.state, this.props.fields);

    this.setState(state, () => {
      if (!hasError) {
        this.props.onSubmit(getFields(this.props.fields, state));
      }
    });
  }

  onButtonClick() {
    if (this.props.onButtonClick) {
      this.props.onButtonClick(getFields(this.props.fields, this.state));
    }
  }

  getComponent(fields, groupName) {
    return fields.map((field) => {
      const id = createFieldId(field.name, groupName);
      if (field.fields) {
        return getComponent({ ...field, key: id, id, components: this.getComponent(field.fields, field.name) }, this.props.customComponents);
      }
      return getComponent({
        ...field,
        key: id,
        id,
        groupName,
        onButtonClick: this.onButtonClick,
        shouldFocus: shouldComponentFocus(this.props.fields, field.name),
        value: getValue(field.name, this.state, this.props.fields),
        update: this.update,
        validate: this.validate,
        updateAndValidate: this.updateAndValidate,
        errorMessage: getErrorMessage(field.name, this.state, this.props.fields),
      }, this.props.customComponents);
    });
  }

  updateAndValidate({ name, value, groupName }) {
    this.setState({
      [name]: validateField(name, groupName, value, this.state, this.props.fields),
    });
  }

  validate({ name, groupName }) {
    const value = getValue(name, this.state, this.props.fields);
    this.setState({
      [name]: validateField(name, groupName, value, this.state, this.props.fields),
    });
  }

  update({ name, value }) {
    this.setState({
      [name]: { ...this.state[name], value },
    });
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
  onSubmit: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func,

  customComponents: PropTypes.objectOf(PropTypes.func),
};

Form.defaultProps = {
  fields: [],
  customComponents: null,
  onButtonClick: null,
};

export default Form;
