import React, { Component, PropTypes } from 'react';
import { fieldShape } from './shapes';

import Text from './fields/Text';

class Form extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.update = this.update.bind(this);
    this.validate = this.validate.bind(this);
    this.state = {}
  }

  update(id, value) {
    this.setState({
      [id]: value
    })

  }

  validate(id) {
    console.log('validate', id)
  }

  onSubmit(event) {
    event.preventDefault();
    console.log('submitted')
  }

  getComponent(field) {
    switch (field.type) {
      case 'text':
      case 'password':
        return <Text {...field} update={this.update} validate={this.validate} value={this.state[field.id] || field.value} />;
      case 'button':
        return 'buttonField';
      case 'submit':
        return 'submitField';
      default:
        return null;
    }
  };


  render() {
    return (
        <form id={this.props.id} onSubmit={this.onSubmit}>
          {this.props.fields.map(this.getComponent)}
        </form>
    );
  }
}

Form.propTypes = {
  id: PropTypes.string,
  fields: PropTypes.arrayOf(fieldShape)
};

export default Form;
