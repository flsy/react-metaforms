import * as React from 'react';
import { Label, ErrorMessage } from '../index';
import { isRequired } from 'metaforms';
import { InputProps } from '../../export';

const Input = React.forwardRef((props: InputProps, ref: React.Ref<HTMLInputElement>) => {
    return (
        <div>
            {props.label ? (<Label fieldId={props.name} label={props.label} isRequired={isRequired(props.validation)}/>) : null}
            <input
                ref={ref}
                id={props.name}
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
                value={props.value || ''}
                disabled={props.disabled}
                onChange={e => props.update({ name: props.name, value: e.target.value, groupName: props.groupName })}
                onBlur={() => props.validate({ name: props.name })}

            />
            {props.errorMessage ? <ErrorMessage message={props.errorMessage}/> : null}
        </div>
    );
});

export default Input;
