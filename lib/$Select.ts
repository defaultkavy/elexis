import { $Container, $ContainerOptions } from "./$Container";
import { $FormElementMethod, FormElementMethod } from "./$Form";
import { $OptGroup } from "./$OptGroup";
import { $Option } from "./$Option";
import { $State } from "./$State";

export interface $SelectOptions extends $ContainerOptions {}
//@ts-expect-error
export interface $Select extends $FormElementMethod {}
@FormElementMethod
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
}

export type $SelectContentType = $Option | $OptGroup | undefined;