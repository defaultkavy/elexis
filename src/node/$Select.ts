import { $Container, type $ContainerOptions } from "./$Container";
import { $OptionGroup } from "./$OptGroup";
import { $Option } from "./$Option";
import { $State, type $StateArgument } from "../structure/$State";
import { type $HTMLElementGeneralAPIFilter } from "../structure/$HTMLElementGeneralAPI";
import { assign } from "../lib/assign";

export interface $SelectOptions extends $ContainerOptions {}
export class $Select extends $Container<HTMLSelectElement> {
    constructor(options?: Partial<$SelectOptions>) {
        super('select', options)
    }

    item(index: number) { return $(this.dom.item(index)) }
    namedItem(name: string) { return $(this.dom.namedItem(name)) }
    
    get options() { return Array.from(this.dom.options).map($option => $($option)) }
    get selectedOptions() { return Array.from(this.dom.selectedOptions).map($option => $($option)) }
    
    value(): string;
    value(value?: $StateArgument<string> | undefined): this;
    value(value?: $StateArgument<string> | undefined) { return $.fluent(this, arguments, () => this.dom.value, () => $.set(this.dom, 'value', value as $State<string> | string, (value$) => {
        this.on('input', () => {
            if (value$.attributesMap.has(this.dom) === false) return;
            if (typeof value$.value === 'string') (value$ as $State<string>).value(`${this.value()}`)
            if (typeof value$.value === 'number') (value$ as unknown as $State<number>).value(Number(this.value()))
        })
    }))}

    get labels() { return Array.from(this.dom.labels ?? []).map(label => $(label)) }
}

assign($Select, {
    set: ['multiple', 'autocomplete', 'name', 'required', 'disabled'],
    get: ['length', 'size', 'selectedIndex', 'form', 'validationMessage', 'validity', 'willValidate'],
    fn: ['checkValidity', 'reportValidity']
})

export interface $Select extends $HTMLElementGeneralAPIFilter<$Select, 'checkValidity' | 'reportValidity' | 'autocomplete' | 'name' | 'form' | 'required' | 'disabled' | 'validationMessage' | 'validity' | 'willValidate'> {
    multiple(): boolean;
    multiple(multiple: $StateArgument<boolean> | undefined): this;
    get length(): number;
    get size(): number;
    get selectedIndex(): number;
}

export type $SelectContentType = $Option | $OptionGroup | undefined;