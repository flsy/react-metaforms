import * as React from 'react';
import { ButtonPropsFinal } from './types';

const Button = ({ label, name, disabled, onButtonClick }: ButtonPropsFinal) =>
    (<button disabled={disabled} name={name} type="button" onClick={onButtonClick}>{label}</button>);

export default Button;
