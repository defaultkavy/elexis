import type { $StateArgument } from "./$State";
import type { $Form } from "#node/$Form";
export interface $HTMLElementCommonAPI<This = any> {
    disabled(): boolean;
    disabled(disabled: $StateArgument<boolean>): This;
    
    checkValidity(): boolean
    reportValidity(): boolean

    formAction(): string;
    formAction(action: $StateArgument<string>): This;

    formEnctype(): string;
    formEnctype(enctype: $StateArgument<string>): This;
    
    formMethod(): string;
    formMethod(method: $StateArgument<string>): This;

    formNoValidate(): boolean;
    formNoValidate(boolean: $StateArgument<boolean>): This;

    formTarget(): string;
    formTarget(target: $StateArgument<string>): This;
    
    autocomplete(): AutoFill;
    autocomplete(autocomplete: AutoFill): This;
    
    name(): string;
    name(name?: $StateArgument<string>): This;

    maxLength(): number;
    maxLength(maxLength: $StateArgument<number>): This;
    
    minLength(): number;
    minLength(minLength: $StateArgument<number>): This;
    
    required(): boolean;
    required(required: $StateArgument<boolean>): This;
    
    label(): string;
    label(label: $StateArgument<string>): This;
    
    get form(): $Form | null
    get validationMessage(): string
    get validity(): ValidityState
    get willValidate(): boolean
}
export type $HTMLElementCommonAPIFilter<This, M extends keyof $HTMLElementCommonAPI> = Pick<$HTMLElementCommonAPI<This>, M>