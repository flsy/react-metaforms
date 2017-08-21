import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from './ErrorMessage';
import Label from './Label';
import { validationShape } from '../shapes';
import { isRequired } from '../utils/utils';

class Input extends Component {
  componentDidMount() {
    if (this.props.shouldFocus) {
      this.inputEl.focus();
    }
  }

  render() {
    return (
      <div className="formField">
        {this.props.label ? <Label fieldId={this.props.id} label={this.props.label} isRequired={isRequired(this.props.validation)} /> : null }
        <input
          id={this.props.id}
          ref={(node) => { this.inputEl = node; }}
          type={this.props.type}
          name={this.props.name}
          placeholder={this.props.placeholder}
          defaultValue={this.props.value}
          disabled={this.props.disabled}
          onChange={e => this.props.update({ name: this.props.name, value: e.target.value })}
          onBlur={() => this.props.validate({ name: this.props.name, groupName: this.props.groupName })}
        />
        {this.props.errorMessage ? <ErrorMessage message={this.props.errorMessage} /> : null}
      </div>
    );
  }
}

const types = ['text', 'password', 'email'];

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  groupName: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.oneOf(types).isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  shouldFocus: PropTypes.bool,
  update: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  validation: PropTypes.arrayOf(validationShape),
};

Input.defaultProps = {
  groupName: null,
  shouldFocus: false,
  label: null,
  placeholder: '',
  value: '',
  disabled: false,
  validation: [],
  errorMessage: '',
};

export default Input;
