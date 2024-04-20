import { $Container, $ContainerOptions } from "./$Container";
import { $State } from "./$State";
import { $Util } from "./$Util";
export interface $FormOptions extends $ContainerOptions {}
export class $Form extends $Container<HTMLFormElement> {
    constructor(options?: $FormOptions) {
        super('form', options);
    }
    
    autocomplete(): AutoFill;
    autocomplete(autocomplete: AutoFill | undefined): this;
    autocomplete(autocomplete?: AutoFill) { return $.fluent(this, arguments, () => this.dom.autocomplete as AutoFill, () => $.set(this.dom, 'autocomplete', autocomplete as AutoFillBase))}
    
    action(): string;
    action(action: string | undefined): this;
    action(action?: string) { return $.fluent(this, arguments, () => this.dom.formAction, () => $.set(this.dom, 'formAction', action))}

    enctype(): string;
    enctype(enctype: string | undefined): this;
    enctype(enctype?: string) { return $.fluent(this, arguments, () => this.dom.formEnctype, () => $.set(this.dom, 'formEnctype', enctype))}
    
    method(): string;
    method(method: string | undefined): this;
    method(method?: string) { return $.fluent(this, arguments, () => this.dom.formMethod, () => $.set(this.dom, 'formMethod', method))}

    noValidate(): boolean;
    noValidate(boolean: boolean | undefined): this;
    noValidate(boolean?: boolean) { return $.fluent(this, arguments, () => this.dom.formNoValidate, () => $.set(this.dom, 'formNoValidate', boolean))}

    acceptCharset(): string;
    acceptCharset(acceptCharset: string | undefined): this;
    acceptCharset(acceptCharset?: string) { return $.fluent(this, arguments, () => this.dom.acceptCharset, () => $.set(this.dom, 'acceptCharset', acceptCharset))}

    target(): string;
    target(target: string | undefined): this;
    target(target?: string) { return $.fluent(this, arguments, () => this.dom.formTarget, () => $.set(this.dom, 'formTarget', target))}

    requestSubmit() { this.dom.requestSubmit(); return this }
    reset(): this { this.dom.reset(); return this }
    submit() { this.dom.submit(); return this }
    checkValidity() { return this.dom.checkValidity() }
    reportValidity() { return this.dom.reportValidity() }

    get length() { return this.dom.length }
    get elements() { return Array.from(this.dom.elements).map(ele => $(ele)) }
}