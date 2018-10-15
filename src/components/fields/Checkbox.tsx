import * as React from 'react';

import { Label, ErrorMessage } from '../index';
import { isRequired } from '../../utils/utils';
import { CheckBoxPropsFinal } from './types';

class Checkbox extends React.Component<CheckBoxPropsFinal> {
    private inputEl: HTMLInputElement | null;

    constructor(props: CheckBoxPropsFinal) {
        super(props);
        this.inputEl = null;
    }

    componentDidMount() {
        if (this.props.shouldFocus && this.inputEl) {
            this.inputEl.focus();
        }
    }

    render() {
        return (
            <div className="formField">
                {this.props.label ? <Label fieldId={this.props.name} label={this.props.label} isRequired={isRequired(this.props.validation)} /> : null}
                <input
                    id={this.props.name}
                    name={this.props.name}
                    ref={(node) => { this.inputEl = node; }}
                    type="checkbox"
                    disabled={this.props.disabled}
                    defaultChecked={this.props.value || false}
                    onChange={event => this.props.updateAndValidate({ name: this.props.name, value: event.target.checked, groupName: this.props.groupName })}
                />
                {this.props.errorMessage ? <ErrorMessage message={this.props.errorMessage} /> : null}
            </div>
        );
    }
}

export default Checkbox;
