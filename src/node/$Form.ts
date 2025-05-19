import { assign } from "#lib/assign";
import { type $HTMLElementCommonAPIFilter } from "#structure/$HTMLElementCommonAPI";
import type { $StateArgument } from "#structure/$State";
import { $Container, type $ContainerOptions } from "./$Container";
export interface $FormOptions extends $ContainerOptions {}
export class $Form extends $Container<HTMLFormElement> {
    constructor(options?: Partial<$FormOptions>) {
        super('form', options);
    }
    get elements() { return Array.from(this.dom.elements).map(ele => $(ele)) }
}

assign($Form, {
    set: ['formAction', 'formEnctype', 'formMethod', 'formNoValidate', 'formTarget', 'acceptCharset'],
    fn: ['requestSubmit', 'reset', 'submit', 'checkValidity', 'reportValidity'],
    get: ['length']
})

export interface $Form extends $HTMLElementCommonAPIFilter<$Form, 'checkValidity' | 'formAction' | 'formEnctype' | 'formMethod' | 'formNoValidate' | 'formTarget' | 'reportValidity' | 'autocomplete'> {
    acceptCharset(): string;
    acceptCharset(acceptCharset: $StateArgument<string>): this;

    requestSubmit(): this;
    reset(): this;
    submit(): this;

    get length(): number;
}