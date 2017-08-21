import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';
import { validationShape } from '../shapes';
import Label from './Label';
import { isRequired } from '../utils/utils';

class Textarea extends Component {
  componentDidMount() {
    if (this.props.shouldFocus) {
      this.inputEl.focus();
    }
  }

  render() {
    return (
      <div className="formField">
        <Label fieldId={this.props.id} label={this.props.label} isRequired={isRequired(this.props.validation)} />
        <textarea
          id={this.props.id}
          ref={(node) => { this.inputEl = node; }}
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

Textarea.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  groupName: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  shouldFocus: PropTypes.bool,
  update: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  validation: PropTypes.arrayOf(validationShape),
};

Textarea.defaultProps = {
  groupName: null,
  label: '',
  placeholder: '',
  value: '',
  disabled: false,
  shouldFocus: false,
  errorMessage: null,
  validation: [],
};

export default Textarea;
