import React, { Component, PropTypes } from 'react';
import { fieldShape } from './shapes';

const getComponent = field => {
  switch (field.type) {
    case 'text': return 'textField';
    case 'button': return 'buttonField';
    case 'submit': return 'submitField';
    default:
      return null;
  }
};


class Form extends Component {

  constructor(props) {
    super(props);
    this.onSubmit  =this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    console.log('submitted')
  }


  render() {
    return (
        <form id={this.props.id} onSubmit={this.onSubmit}>
          {this.props.fields.map(getComponent)}
        </form>
    );
  }
}

Form.propTypes = {
  id: PropTypes.string,
  fields: PropTypes.arrayOf(fieldShape)
};

export default Form;
