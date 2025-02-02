import { $Container, $ContainerOptions } from "./$Container";
import { $Util } from "../structure/$Util";
import { $HTMLElementAPIFilter, $HTMLElementAPIs } from "../structure/$ElementTemplate";
export interface $ButtonOptions extends $ContainerOptions {}
export class $Button extends $Container<HTMLButtonElement> {
    constructor(options?: $ButtonOptions) {
        super('button', options);
    }
    
    type(): ButtonType;
    type(type: ButtonType): this;
    type(type?: ButtonType) { return $.fluent(this, arguments, () => this.dom.type as ButtonType, () => $.set(this.dom, 'type', type as any))}
}

export interface $Button extends $HTMLElementAPIFilter<$Button, 'disabled' | 'checkValidity' | 'formAction' | 'formEnctype' | 'formMethod' | 'formNoValidate' | 'formTarget' | 'reportValidity'> {}
$Util.mixin($Button, $HTMLElementAPIs.create('disabled', 'checkValidity', 'formAction', 'formEnctype', 'formMethod', 'formNoValidate', 'formTarget', 'reportValidity'))