import * as React from 'react';
import { SubmitProps } from './types';

const Submit = ({ label, name, disabled }: SubmitProps) => (<button disabled={disabled} name={name} type="submit">{label || 'Submit'}</button>);

export default Submit;
