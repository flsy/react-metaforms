import * as React from 'react';
import { equals, map } from 'ramda';
import {
    CustomComponentProps, FieldType, UpdateActionType, UpdateAndValidateActionType,
    ValidateActionType
} from './fields/types';
import { Input, Textarea, Checkbox, Button, Submit, Group } from './index';
import { hasError } from '../export';
import { shouldComponentFocus, update, updateAndValidate, validate, validateForm } from '../utils/utils';

interface Props {
    id: string;
    fields?: FieldType[];
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
            fields: this.props.fields || []
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        if (!equals(this.props, nextProps)) {
            this.setState({ fields: nextProps.fields || [] });
        }
    }

    update = ({ name, value, groupName }: UpdateActionType) => {
        this.setState({
            fields: update({ name, value, groupName }, this.state.fields)
        });
    }

    validate = ({ name }: ValidateActionType) => {
        this.setState({
            fields: validate({ name }, this.state.fields),
        });
    }

    updateAndValidate = ({ name, value, groupName }: UpdateAndValidateActionType) => {
        this.setState({
            fields: updateAndValidate({ name, value, groupName }, this.state.fields),
        });
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

    getComponent = (field: FieldType, groupName?: string): JSX.Element | null => {
        const { customComponents } = this.props;

        const shouldFocus = shouldComponentFocus(this.state.fields, field.name);
        const component = customComponents && customComponents[field.type];
        if (component) {
            const props: CustomComponentProps = {
                ...field,
                shouldFocus,
                key: field.name,
                children: field.fields ? map((c) => this.getComponent(c, field.name), field.fields) : [],
                update: this.update,
                validate: this.validate,
                updateAndValidate: this.updateAndValidate
            };
            return React.createElement(component, props);
        }

        switch (field.type) {
            case 'text':
            case 'email':
            case 'password':
                return <Input key={field.name} {...field} groupName={groupName} shouldFocus={shouldFocus} update={this.update} validate={this.validate} />;
            case 'textarea':
                return <Textarea key={field.name} {...field} groupName={groupName} shouldFocus={shouldFocus} update={this.update} validate={this.validate} />;
            case 'checkbox':
                return <Checkbox key={field.name} {...field} groupName={groupName} shouldFocus={shouldFocus} updateAndValidate={this.updateAndValidate} />;

            case 'button':
                return <Button key={field.name} {...field} groupName={groupName} shouldFocus={shouldFocus} onButtonClick={() => this.onButtonClick(field)} />;
            case 'submit':
                return <Submit key={field.name} {...field} groupName={groupName} shouldFocus={shouldFocus} />;

            case 'group':
                return (
                    <Group key={field.name} name={field.name} type="group" legend={field.legend}>
                        {map((c) => this.getComponent(c, field.name), field.fields)}
                    </Group>);

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
