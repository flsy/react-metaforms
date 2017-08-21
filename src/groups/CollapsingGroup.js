import PropTypes from 'prop-types';
import React, { Component } from 'react';
import GroupFields from './GroupFields';
import GroupHeader from './GroupHeader';

class CollapsingGroup extends Component {
  constructor(props) {
    super(props);
    this.onToggle = this.onToggle.bind(this);
    this.state = {
      isCollapsed: this.props.isCollapsed,
    };
  }

  onToggle() {
    this.setState({
      isCollapsed: !this.state.isCollapsed,
    });
  }

  render() {
    return (
      <div className="formField">
        <GroupHeader
          id={this.props.id}
          legend={this.props.legend}
          action={this.onToggle}
          buttonLabel={this.state.isCollapsed ? 'open' : 'close'}
        />
        <GroupFields
          components={this.props.components}
          rendered={!this.state.isCollapsed}
          className="collapsing-group-fields"
        />
      </div>
    );
  }
}

CollapsingGroup.propTypes = {
  id: PropTypes.string.isRequired,
  legend: PropTypes.string.isRequired,
  isCollapsed: PropTypes.bool,
  components: PropTypes.arrayOf(PropTypes.node),
};

CollapsingGroup.defaultProps = {
  components: [],
  isCollapsed: false,
};

export default CollapsingGroup;
