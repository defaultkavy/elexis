import { $Container, $ContainerOptions } from "./$Container";
import { $State } from "./$State";

export interface $OptGroupOptions extends $ContainerOptions {}
export class $OptGroup extends $Container<HTMLOptGroupElement> {
    constructor(options?: $OptGroupOptions) {
        super('optgroup', options);
    }
    
    disabled(): boolean;
    disabled(disabled: boolean | $State<boolean>): this;
    disabled(disabled?: boolean | $State<boolean>) { return $.fluent(this, arguments, () => this.dom.disabled, () => $.set(this.dom, 'disabled', disabled))}
    
    label(): string;
    label(label: string | $State<string>): this;
    label(label?: string | $State<string>) { return $.fluent(this, arguments, () => this.dom.label, () => $.set(this.dom, 'label', label))}
}