import * as React from 'react';

import { Label, ErrorMessage } from '../index';
import { isRequired } from '../../utils/utils';

import { SelectPropsFinal } from './types';

class Select extends React.Component<SelectPropsFinal> {
    private inputEl: HTMLSelectElement | null;

    constructor(props: SelectPropsFinal) {
        super(props);
        this.inputEl = null;
    }

    componentDidMount() {
        if (this.props.shouldFocus && this.inputEl) {
            this.inputEl.focus();
        }
    }

    public render() {
        return (
            <div className="formField">
                {this.props.label ? <Label fieldId={this.props.name} label={this.props.label} isRequired={isRequired(this.props.validation)} /> : null}
                    <select
                        id={this.props.name}
                        name={this.props.name}
                        ref={(node) => { this.inputEl = node; }}
                        disabled={this.props.disabled}
                        defaultValue={this.props.value || ''}
                        onChange={event => this.props.updateAndValidate({ name: this.props.name, value: event.target.value, groupName: this.props.groupName })}
                    >
                        {this.props.placeholder ? <option value="">{this.props.placeholder}</option> : null}
                        {this.props.options.map((option, index) => <option value={option} key={index}>{option}</option>)}
                    </select>
                {this.props.errorMessage ? <ErrorMessage message={this.props.errorMessage} /> : null}
            </div>
        );
    }
}

export default Select;
