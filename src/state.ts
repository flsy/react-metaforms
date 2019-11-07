import { FieldType } from 'metaforms';

export class FormState {

    public static createEmpty = (): FormState => new FormState();

    private state: { [formId: string]: FieldType[] } = {};

    public update(id: string, fields: FieldType[]): FormState {
        this.state[id] = fields;

        return this;
    }

    public get(formId: string): FieldType[] {
        return this.state[formId] || [];
    }
}
