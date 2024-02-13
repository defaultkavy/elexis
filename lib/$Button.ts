import { $Container, $ContainerOptions } from "./$Container";
import { FormElementMethod, $FormElementMethod } from "./$Form";
import { $State } from "./$State";
export interface $ButtonOptions extends $ContainerOptions {}
//@ts-expect-error
export interface $Button extends $FormElementMethod {}
@FormElementMethod
export class $Button extends $Container<HTMLButtonElement> {
    constructor(options?: $ButtonOptions) {
        super('button', options);
    }
    
    disabled(): boolean;
    disabled(disabled: boolean | $State<boolean>): this;
    disabled(disabled?: boolean | $State<boolean>) { return $.fluent(this, arguments, () => this.dom.disabled, () => $.set(this.dom, 'disabled', disabled))}
    
    type(): ButtonType;
    type(type: ButtonType): this;
    type(type?: ButtonType) { return $.fluent(this, arguments, () => this.dom.type as ButtonType, () => $.set(this.dom, 'type', type))}
    
    checkValidity() { return this.dom.checkValidity() }
    reportValidity() { return this.dom.reportValidity() }
}