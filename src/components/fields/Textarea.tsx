import * as React from 'react';
import { TextAreaPropsFinal } from './types';
import { ErrorMessage, Label } from '../index';

import { isRequired } from '../../utils/utils';

class Textarea extends React.Component<TextAreaPropsFinal> {
    private inputEl: HTMLTextAreaElement | null;

    constructor(props: TextAreaPropsFinal) {
        super(props);
        this.inputEl = null;
    }

    public componentDidMount() {
        if (this.props.shouldFocus && this.inputEl) {
            this.inputEl.focus();
        }
    }

    public render() {
        const { label, name, validation, placeholder, value, disabled, update, validate, groupName, errorMessage } = this.props;

        return (
            <div>
                {label ? (<Label fieldId={name} label={label} isRequired={isRequired(validation)} />) : null}
                <textarea
                    ref={(node) => { this.inputEl = node; }}
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    defaultValue={value}
                    disabled={disabled}
                    onChange={e => update({ name, value: e.target.value, groupName })}
                    onBlur={() => validate({ name })}
                />
                {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
            </div>
        );
    }
}

export default Textarea;
