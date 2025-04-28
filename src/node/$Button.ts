import { $Container, type $ContainerOptions } from "./$Container";
import { type $HTMLElementGeneralAPIFilter } from "../structure/$HTMLElementGeneralAPI";
import { assign } from "../lib/assign";
import type { $StateArgument } from "../structure/$State";
export interface $ButtonOptions extends $ContainerOptions {}
export class $Button extends $Container<HTMLButtonElement> {
    constructor(options?: Partial<$ButtonOptions>) {
        super('button', options);
    }
}

assign($Button, {
    set: ['type', 'disabled', 'formAction', 'formEnctype', 'formMethod', 'formNoValidate', 'formTarget'],
    fn: ['checkValidity', 'reportValidity']
})

export interface $Button extends $HTMLElementGeneralAPIFilter<$Button, 'disabled' | 'checkValidity' | 'formAction' | 'formEnctype' | 'formMethod' | 'formNoValidate' | 'formTarget' | 'reportValidity'> {
    type(): ButtonType;
    type(type: $StateArgument<ButtonType>): this;
}