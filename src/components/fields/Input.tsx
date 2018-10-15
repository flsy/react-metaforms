import * as React from 'react';
import { Label, ErrorMessage } from '../index';
import { InputPropsFinal } from './types';
import { isRequired } from '../../utils/utils';

class Input extends React.Component<InputPropsFinal, {}> {
    private inputEl: HTMLInputElement | null;

    constructor(props: InputPropsFinal) {
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
            <div>
                {this.props.label ? (<Label fieldId={this.props.name} label={this.props.label} isRequired={isRequired(this.props.validation)} />) : null}
                <input
                    ref={(node) => { this.inputEl = node; }}
                    id={this.props.name}
                    type={this.props.type}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    value={this.props.value || ''}
                    disabled={this.props.disabled}
                    onChange={e => this.props.update({ name: this.props.name, value: e.target.value, groupName: this.props.groupName })}
                    onBlur={() => this.props.validate({ name: this.props.name })}

                />
                {this.props.errorMessage ? <ErrorMessage message={this.props.errorMessage}/> : null}
            </div>
        );
    }
}

export default Input;
