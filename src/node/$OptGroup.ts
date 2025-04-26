import { $Container, type $ContainerOptions } from "./$Container";
import type { $StateArgument } from "../structure/$State";
import { type $HTMLElementAPIFilter, $HTMLElementAPIs } from "../structure/$ElementTemplate";
import { mixin } from "../lib/mixin";

export interface $OptionGroupOptions extends $ContainerOptions {}
export class $OptionGroup extends $Container<HTMLOptGroupElement> {
    constructor(options?: $OptionGroupOptions) {
        super('optgroup', options);
    }
    
    disabled(): boolean;
    disabled(disabled: $StateArgument<boolean> | undefined): this;
    disabled(disabled?: $StateArgument<boolean> | undefined) { return $.fluent(this, arguments, () => this.dom.disabled, () => $.set(this.dom, 'disabled', disabled))}
}

export interface $OptionGroup extends $HTMLElementAPIFilter<$OptionGroup, 'disabled' | 'label'> {}
mixin($OptionGroup, $HTMLElementAPIs.create('disabled', 'label'))