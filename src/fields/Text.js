import React, { Component, PropTypes } from 'react';


class Text extends Component {

    componentDidMount() {

    }

    render() {
        const { field, formId } = this.props;
        const hasError = !!field.errorMessage;
        return (
            <div className={classNames('Field', { 'has-error': hasError })}>
                <Label fieldId={field.id} label={field.label} isRequired={isRequired(field)} />
                <input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={this.props.value}
                    disabled={field.disabled || this.props.isWaiting}
                    onChange={e => this.props.updateFieldAction(formId, field.id, e.target.value)}
                    onBlur={() => this.props.validateFieldAction(formId, field)}
                />
                {hasError && <div className="error-message">{this.props.errorMessage}</div>}
            </div>
        );
    }
}
