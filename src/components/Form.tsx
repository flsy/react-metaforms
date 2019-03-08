import * as React from 'react';
import { equals, map } from 'fputils';
import {
    CustomComponentProps, UpdateActionType, UpdateAndValidateActionType,
    ValidateActionType,
} from './fields/types';
import { FormData } from '../types';
import { Input, Textarea, Checkbox, Button, Submit, Group, Select } from './index';
import { FieldType, hasError } from '../export';
import { getFormData, shouldComponentFocus, update, updateAndValidate, validate, validateForm } from '../utils/utils';

export type Props = {
    id: string;
    fields?: FieldType[];
    customComponents?: {};
    onButtonClick?: (field: FieldType, fields: FieldType[]) => void;
    onSubmit: (fields: FieldType[]) => void;
    onUpdate?: (formData: FormData) => void;
};

export type State = {
    fields: FieldType[];
};

class Form extends React.Component<Props, State> {

    private readonly inputRefs: { [name: string]: any } | {};

    constructor(props: Props) {
        super(props);
        this.inputRefs = {};
        this.state = {
            fields: this.props.fields || [],
        };
    }

    public componentDidMount(): void {
        this.resolveFocusedField();
    }

    public resolveFocusedField() {
        const focused = shouldComponentFocus(this.state.fields);
        if (focused && this.inputRefs[focused] && this.inputRefs[focused].current) {
            this.inputRefs[focused].current.focus();
        }
    }

    public componentWillReceiveProps(nextProps: Props) {
        if (!equals(JSON.stringify(this.props), JSON.stringify(nextProps))) { // todo: came up with some deepEqual implementation
            this.setState({ fields: nextProps.fields || [] }, this.resolveFocusedField);
        }
    }

    public update = ({ name, value, groupName }: UpdateActionType) => {
        this.setState({
            fields: update({ name, value, groupName }, this.state.fields),
        }, () => {
            if (this.props.onUpdate) {
                this.props.onUpdate(getFormData(this.state.fields));
            }
        });
    };

    public validate = ({ name }: ValidateActionType) => {
        this.setState({
            fields: validate({ name }, this.state.fields),
        });
    };

    public updateAndValidate = ({ name, value, groupName }: UpdateAndValidateActionType) => {
        this.setState({
            fields: updateAndValidate({ name, value, groupName }, this.state.fields),
        }, () => {
            if (this.props.onUpdate) {
                this.props.onUpdate(getFormData(this.state.fields));
            }
        });
    };

    public onButtonClick = (field: FieldType) => {
        if (this.props.onButtonClick) {
            this.props.onButtonClick(field, this.state.fields);
        }
    };

    public onSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();

        const fields = validateForm(this.state.fields);

        this.setState({ fields }, () => {
            if (!hasError(fields)) {
                this.props.onSubmit(fields);
            }
        });

    };

    public getComponent = (field: FieldType, groupName?: string): JSX.Element | null => {
        const { customComponents } = this.props;

        const component = customComponents && customComponents[field.type];
        if (component) {
            const props: CustomComponentProps = {
                ...field,
                groupName,
                key: field.name,
                children: field.fields ? map((c) => this.getComponent(c, field.name), field.fields) : [],
                update: this.update,
                validate: this.validate,
                onButtonClick: () => this.onButtonClick(field),
                updateAndValidate: this.updateAndValidate,
            };
            return React.createElement(component, props);
        }

        this.inputRefs[field.name] = React.createRef();

        switch (field.type) {
            case 'text':
            case 'email':
            case 'password':
                return <Input key={field.name} {...field} ref={this.inputRefs[field.name]} groupName={groupName} update={this.update} validate={this.validate}/>;
            case 'textarea':
                return <Textarea key={field.name} {...field} ref={this.inputRefs[field.name]} groupName={groupName} update={this.update} validate={this.validate}/>;
            case 'checkbox':
                return <Checkbox key={field.name} {...field} ref={this.inputRefs[field.name]} groupName={groupName} updateAndValidate={this.updateAndValidate}/>;
            case 'select':
                return <Select key={field.name} {...field} ref={this.inputRefs[field.name]} groupName={groupName} updateAndValidate={this.updateAndValidate}/>;

            case 'button':
                return <Button key={field.name} {...field} groupName={groupName} onButtonClick={() => this.onButtonClick(field)}/>;
            case 'submit':
                return <Submit key={field.name} {...field} groupName={groupName}/>;

            case 'group':
                return (
                    <Group key={field.name} name={field.name} type="group" legend={field.legend}>
                        {map((c) => this.getComponent(c, field.name), field.fields)}
                    </Group>);

            default:
                return null;
        }
    };

    public render() {
        return (
            <form id={this.props.id} onSubmit={this.onSubmit}>
                {map(this.getComponent, this.state.fields)}
            </form>
        );
    }
}

export default Form;
