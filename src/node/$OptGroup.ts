import { $Container, type $ContainerOptions } from "./$Container";
import type { $StateArgument } from "../structure/$State";
import { type $HTMLElementGeneralAPIFilter } from "../structure/$HTMLElementGeneralAPI";
import { assign } from "../lib/assign";

export interface $OptionGroupOptions extends $ContainerOptions {}
export class $OptionGroup extends $Container<HTMLOptGroupElement> {
    constructor(options?: $OptionGroupOptions) {
        super('optgroup', options);
    }
}

assign($OptionGroup, {
    set: ['disabled'],
    get: ['label']
})

export interface $OptionGroup extends $HTMLElementGeneralAPIFilter<$OptionGroup, 'disabled' | 'label'> {}