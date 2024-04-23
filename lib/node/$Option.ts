import { $Container, $ContainerOptions } from "./$Container";
import { $State, $StateArgument } from "../$State";

export interface $OptionOptions extends $ContainerOptions {}
export class $Option extends $Container<HTMLOptionElement> {
    constructor(options?: $OptionOptions) {
        super('option', options);
    }

    defaultSelected(): boolean;
    defaultSelected(defaultSelected: $StateArgument<boolean> | undefined): this;
    defaultSelected(defaultSelected?: $StateArgument<boolean> | undefined) { return $.fluent(this, arguments, () => this.dom.defaultSelected, () => $.set(this.dom, 'defaultSelected', defaultSelected))}
    
    disabled(): boolean;
    disabled(disabled: $StateArgument<boolean> | undefined): this;
    disabled(disabled?: $StateArgument<boolean> | undefined) { return $.fluent(this, arguments, () => this.dom.disabled, () => $.set(this.dom, 'disabled', disabled))}
    
    label(): string;
    label(label: $StateArgument<string> | undefined): this;
    label(label?: $StateArgument<string> | undefined) { return $.fluent(this, arguments, () => this.dom.label, () => $.set(this.dom, 'label', label))}
    
    selected(): boolean;
    selected(selected: $StateArgument<boolean> | undefined): this;
    selected(selected?: $StateArgument<boolean> | undefined) { return $.fluent(this, arguments, () => this.dom.selected, () => $.set(this.dom, 'selected', selected))}
    
    text(): string;
    text(text: $StateArgument<string> | undefined): this;
    text(text?: $StateArgument<string> | undefined) { return $.fluent(this, arguments, () => this.dom.text, () => $.set(this.dom, 'text', text))}
    
    value(): string;
    value(value: $StateArgument<string> | undefined): this;
    value(value?: $StateArgument<string> | undefined) { return $.fluent(this, arguments, () => this.dom.value, () => $.set(this.dom, 'value', value))}
    
    get form() { return this.dom.form ? $(this.dom.form) : null }
    get index() { return this.dom.index }

}