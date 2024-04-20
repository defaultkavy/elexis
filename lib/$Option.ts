import { $Container, $ContainerOptions } from "./$Container";
import { $State } from "./$State";

export interface $OptionOptions extends $ContainerOptions {}
export class $Option extends $Container<HTMLOptionElement> {
    constructor(options?: $OptionOptions) {
        super('option', options);
    }

    defaultSelected(): boolean;
    defaultSelected(defaultSelected: boolean | $State<boolean>): this;
    defaultSelected(defaultSelected?: boolean | $State<boolean>) { return $.fluent(this, arguments, () => this.dom.defaultSelected, () => $.set(this.dom, 'defaultSelected', defaultSelected))}
    
    disabled(): boolean;
    disabled(disabled: boolean | $State<boolean>): this;
    disabled(disabled?: boolean | $State<boolean>) { return $.fluent(this, arguments, () => this.dom.disabled, () => $.set(this.dom, 'disabled', disabled))}
    
    label(): string;
    label(label: string | $State<string>): this;
    label(label?: string | $State<string>) { return $.fluent(this, arguments, () => this.dom.label, () => $.set(this.dom, 'label', label))}
    
    selected(): boolean;
    selected(selected: boolean | $State<boolean>): this;
    selected(selected?: boolean | $State<boolean>) { return $.fluent(this, arguments, () => this.dom.selected, () => $.set(this.dom, 'selected', selected))}
    
    text(): string;
    text(text: string | $State<string>): this;
    text(text?: string | $State<string>) { return $.fluent(this, arguments, () => this.dom.text, () => $.set(this.dom, 'text', text))}
    
    value(): string;
    value(value: string | $State<string>): this;
    value(value?: string | $State<string>) { return $.fluent(this, arguments, () => this.dom.value, () => $.set(this.dom, 'value', value))}
    
    get form() { return this.dom.form ? $(this.dom.form) : null }
    get index() { return this.dom.index }

}