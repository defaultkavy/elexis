import { $HTMLElementAPIFilter, $HTMLElementAPIs } from "../$ElementTemplate";
import { $StateArgument } from "../$State";
import { $Util } from "../$Util";
import { $Container, $ContainerOptions } from "./$Container";
export interface $LabelOptions extends $ContainerOptions {}
export class $Label extends $Container<HTMLLabelElement> {
    constructor(options?: $LabelOptions) {
        super('label', options);
    }

    for(): string;
    for(name: $StateArgument<string>): this;
    for(name?: $StateArgument<string>) { return $.fluent(this, arguments, () => this.dom.htmlFor, () => { $.set(this.dom, 'htmlFor', name)}) }

    get control() { return this.dom.control }
}

export interface $Label extends $HTMLElementAPIFilter<$Label, 'form'> {}
$Util.mixin($Label, $HTMLElementAPIs.create('form',))