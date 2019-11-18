import * as React from 'react';
import { ButtonProps } from '../../export';

const Button: React.FC<ButtonProps> = ({ label, name, disabled, onButtonClick }) => (
    <button disabled={disabled} name={name} type="button" onClick={onButtonClick}>{label}</button>
);

export default Button;
