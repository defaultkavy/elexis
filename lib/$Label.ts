import { $Container, $ContainerOptions } from "./$Container";
export interface $LabelOptions extends $ContainerOptions {}
export class $Label extends $Container<HTMLLabelElement> {
    constructor(options?: $LabelOptions) {
        super('label', options);
    }

    for(): string;
    for(name: string): this;
    for(name?: string | undefined) { return $.fluent(this, arguments, () => this.dom.htmlFor, () => {if (name) this.dom.htmlFor = name}) }

    get form() { return this.dom.form }
    get control() { return this.dom.control }
}