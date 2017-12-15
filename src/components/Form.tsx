import * as React from 'react';
import { equals, find, map } from 'ramda';
import { FieldType, UpdateActionType, UpdateAndValidateActionType, ValidateActionType } from './fields/types';
import validate, { validateField } from '../validation/validate';
import { Input, Textarea, Checkbox, Button, Submit } from './index';
import { hasError } from '../export';
import { getFormData, shouldComponentFocus, validateForm } from '../utils/utils';

interface Props {
    id: string;
    fields: FieldType[];
    customComponents?: {};
    onButtonClick?: (field: FieldType, fields: FieldType[]) => void;
    onSubmit: (fields: FieldType[]) => void;
}

interface State {
    fields: FieldType[];
}

class Form extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            fields: this.props.fields
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        if (!equals(this.props, nextProps)) {
            this.setState({ fields: nextProps.fields });
        }
    }

    update = ({ name, value }: UpdateActionType) => {
        const fields = map(field => field.name === name ? { ...field, value } as FieldType : field, this.state.fields);
        this.setState({
            fields
        });
    }

    validate = ({ name, groupName }: ValidateActionType) => {
        const formData = getFormData(this.state.fields);
        const field = find(f => f.name === name, this.state.fields);
        if (field) {
            const errorMessage = validateField(formData, field);
            const fields = map(f => f.name === name ? { ...f, errorMessage } as FieldType : f, this.state.fields);
            this.setState({
                fields
            });
        }
    }

    updateAndValidate = ({ name, value, groupName }: UpdateAndValidateActionType) => {
        const formData = getFormData(this.state.fields);

        const field = find(f => f.name === name, this.state.fields);
        if (field) {
            const errorMessage = validate(value, field.validation || [], formData);
            const fields = map(f => f.name === name ? { ...f, value, errorMessage } as FieldType : f, this.state.fields);

            this.setState({
                fields,
            });
        }
    }

    onButtonClick = (field: FieldType) => {
        if (this.props.onButtonClick) {
            this.props.onButtonClick(field, this.state.fields);
        }
    }

    onSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();

        const fields = validateForm(this.state.fields);

        this.setState({ fields }, () => {
            if (!hasError(fields)) {
                this.props.onSubmit(fields);
            }
        });

    }

    getComponent = (field: FieldType) => {
        const { customComponents } = this.props;

        const shouldFocus = shouldComponentFocus(this.state.fields, field.name);
        const component = customComponents && customComponents[field.type];
        if (component) {
            return React.createElement(component, {
                ...field,
                key: field.name,
                shouldFocus,
                update: this.update,
                validate: this.validate,
                updateAndValidate: this.updateAndValidate
            });
        }

        switch (field.type) {
            case 'text':
            case 'email':
            case 'password':
                return <Input key={field.name} {...field} shouldFocus={shouldFocus} update={this.update} validate={this.validate} />;
            case 'textarea':
                return <Textarea key={field.name} {...field} shouldFocus={shouldFocus} update={this.update} validate={this.validate} />;
            case 'checkbox':
                return <Checkbox key={field.name} {...field} shouldFocus={shouldFocus} updateAndValidate={this.updateAndValidate} />;
            case 'button':
                return <Button key={field.name} {...field} shouldFocus={shouldFocus} onButtonClick={() => this.onButtonClick(field)} />;
            case 'submit':
                return <Submit key={field.name} {...field} shouldFocus={shouldFocus} />;
            // case 'inlineGroup':
            //     return <InlineGroup {...field} />;
            // case 'collapsingGroup':
            //     return <CollapsingGroup {...field} />;
            default:
                return null;
        }
    }

    render() {
        return (
            <form id={this.props.id} onSubmit={this.onSubmit}>
                {map(this.getComponent, this.state.fields)}
            </form>
        );
    }
}

export default Form;
