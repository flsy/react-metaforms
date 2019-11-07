import * as React from 'react';
import { equals, map } from 'fputils';
import { hasError, validateForm, updateAndValidate, validate, update, shouldComponentFocus, FieldType } from 'metaforms';
import {
    CustomComponentProps, UpdateActionType, UpdateAndValidateActionType,
    ValidateActionType,
} from './fields/types';
import { Input, Textarea, Checkbox, Button, Submit, Group, Select } from './index';
import { FormState } from '../state';

export type Props = {
    id: string;
    state: FormState;
    onStateChange: (state: FormState) => void;

    fields?: FieldType[];
    customComponents?: {};
    onButtonClick?: (field: FieldType, fields: FieldType[]) => void;
    onSubmit: (fields: FieldType[]) => void;
};

class Form extends React.Component<Props> {

    private readonly inputRefs: { [name: string]: any } | {};

    constructor(props: Props) {
        super(props);
        this.inputRefs = {};
    }

    public componentDidMount(): void {
        this.updateState(this.props.fields || []);
        this.resolveFocusedField();
    }

    public resolveFocusedField() {
        const focused = shouldComponentFocus(this.getState());
        if (focused && this.inputRefs[focused] && this.inputRefs[focused].current) {
            this.inputRefs[focused].current.focus();
        }
    }

    public componentWillReceiveProps(nextProps: Props) {
        if (!equals(JSON.stringify(this.props.fields), JSON.stringify(nextProps.fields))) { // todo: came up with some deepEqual implementation
            this.updateState(nextProps.fields || []);
            this.resolveFocusedField()
        }
    }

    public update = ({ name, value, groupName }: UpdateActionType) => {
        this.updateState(update({ name, value, groupName }, this.getState()));
    };

    public validate = ({ name }: ValidateActionType) => {
        this.updateState(validate({ name }, this.getState()))
    };

    public updateAndValidate = ({ name, value, groupName }: UpdateAndValidateActionType) => {
        this.updateState(updateAndValidate({ name, value, groupName }, this.getState()))
    };

    public onButtonClick = (field: FieldType) => {
        if (this.props.onButtonClick) {
            this.props.onButtonClick(field, this.getState());
        }
    };

    public onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const fields = validateForm(this.getState());

        this.updateState(fields);

        if (!hasError(fields)) {
            this.props.onSubmit(fields);
        }
    };

    public getComponent = (field: FieldType, groupName?: string) => {
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
                    </Group>
                );

            default:
                return null;
        }
    };

    public render() {
        return (
            <form id={this.props.id} onSubmit={this.onSubmit}>
                {map(this.getComponent, this.getState())}
            </form>
        );
    }

    private getState(): FieldType[] {
        return this.props.state.get(this.props.id);
    }

    private updateState(fields: FieldType[]): void {
        const state = this.props.state.update(this.props.id, fields);
        this.props.onStateChange(state);
    }
}

export default Form;
