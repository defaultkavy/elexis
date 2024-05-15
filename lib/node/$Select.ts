import { $Container, $ContainerOptions } from "./$Container";
import { $OptGroup } from "./$OptGroup";
import { $Option } from "./$Option";
import { $StateArgument } from "../$State";
import { $HTMLElementAPIFilter, $HTMLElementAPIs } from "../$ElementTemplate";
import { $Util } from "../$Util";

export interface $SelectOptions extends $ContainerOptions {}
export class $Select extends $Container<HTMLSelectElement> {
    constructor(options?: $SelectOptions) {
        super('select')
    }

    add(option: $SelectContentType | OrMatrix<$SelectContentType>) {
        this.insert(option);
        return this;
    }

    item(index: number) { return $(this.dom.item(index)) }
    namedItem(name: string) { return $(this.dom.namedItem(name)) }
    
    multiple(): boolean;
    multiple(multiple: $StateArgument<boolean> | undefined): this;
    multiple(multiple?: $StateArgument<boolean> | undefined) { return $.fluent(this, arguments, () => this.dom.multiple, () => $.set(this.dom, 'multiple', multiple))}

    get length() { return this.dom.length }
    get size() { return this.dom.size }
    get options() { return Array.from(this.dom.options).map($option => $($option)) }
    get selectedIndex() { return this.dom.selectedIndex }
    get selectedOptions() { return Array.from(this.dom.selectedOptions).map($option => $($option)) }
    
    value(): string;
    value(value?: $StateArgument<string> | undefined): this;
    value(value?: $StateArgument<string> | undefined) { return $.fluent(this, arguments, () => this.dom.value, () => $.set(this.dom, 'value', value))}

    get labels() { return Array.from(this.dom.labels ?? []).map(label => $(label)) }
}

export interface $Select extends $HTMLElementAPIFilter<$Select, 'checkValidity' | 'reportValidity' | 'autocomplete' | 'name' | 'form' | 'required' | 'disabled' | 'validationMessage' | 'validity' | 'willValidate'> {}
$Util.mixin($Select, $HTMLElementAPIs.create('checkValidity', 'reportValidity', 'autocomplete', 'name', 'form', 'required', 'disabled', 'validationMessage', 'validity', 'willValidate'))

export type $SelectContentType = $Option | $OptGroup | undefined;