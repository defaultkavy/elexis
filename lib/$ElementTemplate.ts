import { $StateArgument } from "./$State";
import { $Form } from "./node/$Form";
export abstract class $HTMLElementAPIs<This = any> {

    static create(...args: (keyof $HTMLElementAPIs)[]) {
        const $template = class {};
        Object.getOwnPropertyNames($HTMLElementAPIs.prototype).forEach(name => {
        if (name === 'constructor') return;
        if (!args.includes(name as keyof $HTMLElementAPIs)) return;
        Object.defineProperty(
            $template.prototype,
            name,
            Object.getOwnPropertyDescriptor($HTMLElementAPIs.prototype, name) || Object.create(null)
        )
        })
        return $template;
    }

    disabled(): boolean;
    disabled(disabled: $StateArgument<boolean>): This;
    //@ts-ignore
    disabled(disabled?: $StateArgument<boolean>) { return $.fluent(this, arguments, () => this.dom.disabled, () => $.set(this.dom, 'disabled', disabled)) }
    
    //@ts-ignore
    checkValidity(): boolean { return this.dom.checkValidity() }
    //@ts-ignore
    reportValidity(): boolean { return this.dom.reportValidity() }

    formAction(): string;
    formAction(action: string | undefined): This;
    //@ts-ignore
    formAction(action?: string) { return $.fluent(this, arguments, () => this.dom.formAction, () => $.set(this.dom, 'formAction', action))}

    formEnctype(): string;
    formEnctype(enctype: string | undefined): This;
    //@ts-ignore
    formEnctype(enctype?: string) { return $.fluent(this, arguments, () => this.dom.formEnctype, () => $.set(this.dom, 'formEnctype', enctype))}
    
    formMethod(): string;
    formMethod(method: string | undefined): This;
    //@ts-ignore
    formMethod(method?: string) { return $.fluent(this, arguments, () => this.dom.formMethod, () => $.set(this.dom, 'formMethod', method))}

    formNoValidate(): boolean;
    formNoValidate(boolean: boolean | undefined): This;
    //@ts-ignore
    formNoValidate(boolean?: boolean) { return $.fluent(this, arguments, () => this.dom.formNoValidate, () => $.set(this.dom, 'formNoValidate', boolean))}

    formTarget(): string;
    formTarget(target: string | undefined): This;
    //@ts-ignore
    formTarget(target?: string) { return $.fluent(this, arguments, () => this.dom.formTarget, () => $.set(this.dom, 'formTarget', target))}
    
    autocomplete(): AutoFill;
    //@ts-ignore
    autocomplete(autocomplete: AutoFill | undefined): This;
    //@ts-ignore
    autocomplete(autocomplete?: AutoFill) { return $.fluent(this, arguments, () => this.dom.autocomplete as AutoFill, () => $.set(this.dom, 'autocomplete', autocomplete as AutoFillBase))}
    
    name(): string;
    name(name?: $StateArgument<string> | undefined): This;
    //@ts-ignore
    name(name?: $StateArgument<string> | undefined) { return $.fluent(this, arguments, () => this.dom.name, () => $.set(this.dom, 'name', name))}

    maxLength(): number;
    maxLength(maxLength: number): This;
    //@ts-ignore
    maxLength(maxLength?: number) { return $.fluent(this, arguments, () => this.dom.maxLength, () => $.set(this.dom, 'maxLength', maxLength))}
    
    minLength(): number;
    minLength(minLength: number): This;
    //@ts-ignore
    minLength(minLength?: number) { return $.fluent(this, arguments, () => this.dom.minLength, () => $.set(this.dom, 'minLength', minLength))}
    
    required(): boolean;
    required(required: boolean): This;
    //@ts-ignore
    required(required?: boolean) { return $.fluent(this, arguments, () => this.dom.required, () => $.set(this.dom, 'required', required))}
    
    label(): string;
    label(label: $StateArgument<string> | undefined): This;
    //@ts-ignore
    label(label?: $StateArgument<string> | undefined) { return $.fluent(this, arguments, () => this.dom.label, () => $.set(this.dom, 'label', label))}
    
    //@ts-ignore
    get form(): $Form | null { return this.dom.form ? $(this.dom.form) : null }
    //@ts-ignore
    get validationMessage(): string { return this.dom.validationMessage }
    //@ts-ignore
    get validity(): ValidityState { return this.dom.validity }
    //@ts-ignore
    get willValidate(): boolean { return this.dom.willValidate }
}
export type $HTMLElementAPIFilter<This, M extends keyof $HTMLElementAPIs> = Pick<$HTMLElementAPIs<This>, M>