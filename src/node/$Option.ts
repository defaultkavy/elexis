import { $Container, type $ContainerOptions } from "./$Container";
import type { $StateArgument } from "#structure/$State";
import { type $HTMLElementCommonAPIFilter } from "#structure/$HTMLElementCommonAPI";
import { assign } from "#lib/assign";

export interface $OptionOptions extends $ContainerOptions {}
export class $Option extends $Container<HTMLOptionElement> {
    constructor(options?: Partial<$OptionOptions>) {
        super('option', options);
    }

}

assign($Option, {
    set: ['defaultSelected', 'selected', 'text', 'value', 'disabled'],
    get: ['index', 'form', 'label']
})

export interface $Option extends $HTMLElementCommonAPIFilter<$Option, 'form' | 'disabled' | 'label'> {

    defaultSelected(): boolean;
    defaultSelected(defaultSelected: $StateArgument<boolean>): this;
    
    selected(): boolean;
    selected(selected: $StateArgument<boolean>): this;
    
    text(): string;
    text(text: $StateArgument<string>): this;
    
    value(): string;
    value(value: $StateArgument<string>): this;
    
    get index():number
}