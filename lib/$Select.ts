import { $Container, $ContainerOptions } from "./$Container";
import { $OptGroup } from "./$OptGroup";
import { $Option } from "./$Option";
import { $State } from "./$State";

export interface $SelectOptions extends $ContainerOptions {}
export class $Select extends $Container<HTMLSelectElement> {
    constructor() {
        super('select')
    }

    add(option: $SelectContentType | OrMatrix<$SelectContentType>) {
        this.insert(option);
        return this;
    }

    item(index: number) { return $(this.dom.item(index)) }
    namedItem(name: string) { return $(this.dom.namedItem(name)) }
    
    disabled(): boolean;
    disabled(disabled: boolean | $State<boolean>): this;
    disabled(disabled?: boolean | $State<boolean>) { return $.fluent(this, arguments, () => this.dom.disabled, () => $.set(this.dom, 'disabled', disabled))}
    
    multiple(): boolean;
    multiple(multiple: boolean | $State<boolean>): this;
    multiple(multiple?: boolean | $State<boolean>) { return $.fluent(this, arguments, () => this.dom.multiple, () => $.set(this.dom, 'multiple', multiple))}

    required(): boolean;
    required(required: boolean): this;
    required(required?: boolean) { return $.fluent(this, arguments, () => this.dom.required, () => $.set(this.dom, 'required', required))}
    
    autocomplete(): AutoFill;
    autocomplete(autocomplete: AutoFill): this;
    autocomplete(autocomplete?: AutoFill) { return $.fluent(this, arguments, () => this.dom.autocomplete, () => $.set(this.dom, 'autocomplete', autocomplete))}

    get length() { return this.dom.length }
    get size() { return this.dom.size }
    get options() { return Array.from(this.dom.options).map($option => $($option)) }
    get selectedIndex() { return this.dom.selectedIndex }
    get selectedOptions() { return Array.from(this.dom.selectedOptions).map($option => $($option)) }
    
    name(): string;
    name(name?: string | $State<string>): this;
    name(name?: string | $State<string>) { return $.fluent(this, arguments, () => this.dom.name, () => $.set(this.dom, 'name', name))}
    
    value(): string;
    value(value?: string | $State<string>): this;
    value(value?: string | $State<string>) { return $.fluent(this, arguments, () => this.dom.value, () => $.set(this.dom, 'value', value))}

    get form() { return this.dom.form ? $(this.dom.form) : null }
    get labels() { return Array.from(this.dom.labels ?? []).map(label => $(label)) }
    get validationMessage() { return this.dom.validationMessage }
    get validity() { return this.dom.validity }
    get willValidate() { return this.dom.willValidate }
}

export type $SelectContentType = $Option | $OptGroup | undefined;