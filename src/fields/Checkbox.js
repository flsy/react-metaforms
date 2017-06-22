import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from './ErrorMessage';
import Label from './Label';
import { isRequired } from '../utils/utils';
import { validationShape } from '../shapes';

class Checkbox extends Component {

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
          type="checkbox"
          name={this.props.name}
          disabled={this.props.disabled}
          defaultChecked={this.props.value}
          onChange={event => this.props.updateAndValidate({ name: this.props.name, value: event.target.checked, groupName: this.props.groupName })}
        />
        {this.props.errorMessage ? <ErrorMessage message={this.props.errorMessage} /> : null}
      </div>
    );
  }
}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  validation: PropTypes.arrayOf(validationShape),
  updateAndValidate: PropTypes.func.isRequired,
  groupName: PropTypes.string,
  disabled: PropTypes.bool,
  shouldFocus: PropTypes.bool,
  value: PropTypes.bool,
  errorMessage: PropTypes.string,
};

Checkbox.defaultProps = {
  groupName: null,
  errorMessage: null,
  value: false,
  label: '',
  validation: [],
  disabled: false,
  shouldFocus: false,
};

export default Checkbox;
