import { assign } from "../lib/assign";
import { type $HTMLElementGeneralAPIFilter } from "../structure/$HTMLElementGeneralAPI";
import type { $StateArgument } from "../structure/$State";
import { $Container, type $ContainerOptions } from "./$Container";
export interface $LabelOptions extends $ContainerOptions {}
export class $Label extends $Container<HTMLLabelElement> {
    constructor(options?: $LabelOptions) {
        super('label', options);
    }

    for(): string;
    for(name: $StateArgument<string>): this;
    for(name?: $StateArgument<string>) { return $.fluent(this, arguments, () => this.dom.htmlFor, () => { $.set(this.dom, 'htmlFor', name)}) }

    get control() { return $(this.dom.control) }
}

assign($Label, {
    get: ['form']
})

export interface $Label extends $HTMLElementGeneralAPIFilter<$Label, 'form'> {
    
}