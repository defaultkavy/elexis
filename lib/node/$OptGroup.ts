import { $Container, $ContainerOptions } from "./$Container";
import { $State, $StateArgument } from "../$State";

export interface $OptGroupOptions extends $ContainerOptions {}
export class $OptGroup extends $Container<HTMLOptGroupElement> {
    constructor(options?: $OptGroupOptions) {
        super('optgroup', options);
    }
    
    disabled(): boolean;
    disabled(disabled: $StateArgument<boolean> | undefined): this;
    disabled(disabled?: $StateArgument<boolean> | undefined) { return $.fluent(this, arguments, () => this.dom.disabled, () => $.set(this.dom, 'disabled', disabled))}
    
    label(): string;
    label(label: $StateArgument<string> | undefined): this;
    label(label?: $StateArgument<string> | undefined) { return $.fluent(this, arguments, () => this.dom.label, () => $.set(this.dom, 'label', label))}
}