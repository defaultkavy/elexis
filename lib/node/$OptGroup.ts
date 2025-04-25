import { $Container, type $ContainerOptions } from "./$Container";
import type { $StateArgument } from "../structure/$State";
import { type $HTMLElementAPIFilter, $HTMLElementAPIs } from "../structure/$ElementTemplate";
import { $Util } from "../structure/$Util";

export interface $OptGroupOptions extends $ContainerOptions {}
export class $OptGroup extends $Container<HTMLOptGroupElement> {
    constructor(options?: $OptGroupOptions) {
        super('optgroup', options);
    }
    
    disabled(): boolean;
    disabled(disabled: $StateArgument<boolean> | undefined): this;
    disabled(disabled?: $StateArgument<boolean> | undefined) { return $.fluent(this, arguments, () => this.dom.disabled, () => $.set(this.dom, 'disabled', disabled))}
}

export interface $OptGroup extends $HTMLElementAPIFilter<$OptGroup, 'disabled' | 'label'> {}
$Util.mixin($OptGroup, $HTMLElementAPIs.create('disabled', 'label'))