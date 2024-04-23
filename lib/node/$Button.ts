import { $Container, $ContainerOptions } from "./$Container";
import { $State, $StateArgument } from "../$State";
export interface $ButtonOptions extends $ContainerOptions {}
export class $Button extends $Container<HTMLButtonElement> {
    constructor(options?: $ButtonOptions) {
        super('button', options);
    }
    
    disabled(): boolean;
    disabled(disabled: $StateArgument<boolean>): this;
    disabled(disabled?: $StateArgument<boolean>) { return $.fluent(this, arguments, () => this.dom.disabled, () => $.set(this.dom, 'disabled', disabled))}
    
    type(): ButtonType;
    type(type: ButtonType): this;
    type(type?: ButtonType) { return $.fluent(this, arguments, () => this.dom.type as ButtonType, () => $.set(this.dom, 'type', type as any))}
    
    checkValidity() { return this.dom.checkValidity() }
    reportValidity() { return this.dom.reportValidity() }

    formAction(): string;
    formAction(action: string | undefined): this;
    formAction(action?: string) { return $.fluent(this, arguments, () => this.dom.formAction, () => $.set(this.dom, 'formAction', action))}

    formEnctype(): string;
    formEnctype(enctype: string | undefined): this;
    formEnctype(enctype?: string) { return $.fluent(this, arguments, () => this.dom.formEnctype, () => $.set(this.dom, 'formEnctype', enctype))}
    
    formMethod(): string;
    formMethod(method: string | undefined): this;
    formMethod(method?: string) { return $.fluent(this, arguments, () => this.dom.formMethod, () => $.set(this.dom, 'formMethod', method))}

    formNoValidate(): boolean;
    formNoValidate(boolean: boolean | undefined): this;
    formNoValidate(boolean?: boolean) { return $.fluent(this, arguments, () => this.dom.formNoValidate, () => $.set(this.dom, 'formNoValidate', boolean))}

    formTarget(): string;
    formTarget(target: string | undefined): this;
    formTarget(target?: string) { return $.fluent(this, arguments, () => this.dom.formTarget, () => $.set(this.dom, 'formTarget', target))}
}