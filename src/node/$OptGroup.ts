import { $Container, type $ContainerOptions } from "./$Container";
import { type $HTMLElementCommonAPIFilter } from "#structure/$HTMLElementCommonAPI";
import { assign } from "#lib/assign";

export interface $OptionGroupOptions extends $ContainerOptions {}
export class $OptionGroup extends $Container<HTMLOptGroupElement> {
    constructor(options?: Partial<$OptionGroupOptions>) {
        super('optgroup', options);
    }
}

assign($OptionGroup, {
    set: ['disabled'],
    get: ['label']
})

export interface $OptionGroup extends $HTMLElementCommonAPIFilter<$OptionGroup, 'disabled' | 'label'> {}