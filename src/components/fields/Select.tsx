import * as React from 'react';

import { Label, ErrorMessage } from '../index';
import { isRequired } from '../../utils/utils';

import { SelectPropsFinal } from './types';

const Select = React.forwardRef((props: SelectPropsFinal, ref: React.Ref<HTMLSelectElement>) => {
    return (
        <div>
            {props.label ? <Label fieldId={props.name} label={props.label} isRequired={isRequired(props.validation)}/> : null}
            <select
                ref={ref}
                id={props.name}
                name={props.name}
                disabled={props.disabled}
                defaultValue={props.value || ''}
                onChange={event => props.updateAndValidate({ name: props.name, value: event.target.value, groupName: props.groupName })}
            >
                {props.placeholder ? <option value="">{props.placeholder}</option> : null}
                {props.options.map((option, index) => <option value={option} key={index}>{option}</option>)}
            </select>
            {props.errorMessage ? <ErrorMessage message={props.errorMessage}/> : null}
        </div>
    );
});

export default Select;
