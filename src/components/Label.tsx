import * as React from 'react';

const Asterisk = () => (<abbr title="This field is required" aria-hidden="true"> *</abbr>);

interface Props {
    fieldId: string;
    label: string;
    isRequired: boolean;
    children?: React.ReactChildren;
}

const Label = ({ fieldId, label, isRequired, children }: Props) => (
    <label htmlFor={fieldId}>
        {label}
        {isRequired && <Asterisk/>}
        {children}
    </label>
);

export default Label;
