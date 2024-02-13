import { $Container, $ContainerOptions } from "./$Container";
export interface $LabelOptions extends $ContainerOptions {}
export class $Label extends $Container<HTMLLabelElement> {
    constructor(options?: $LabelOptions) {
        super('label', options);
    }

    for(): string;
    for(name?: string): this;
    for(name?: string) { return $.fluent(this, arguments, () => this.dom.htmlFor, () => { $.set(this.dom, 'htmlFor', name, 'for')}) }

    get form() { return this.dom.form }
    get control() { return this.dom.control }
}