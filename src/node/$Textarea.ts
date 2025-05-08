import { $Container, type $ContainerOptions } from "./$Container";
import { type $StateArgument } from "../structure/$State";
import { type $HTMLElementGeneralAPIFilter } from "../structure/$HTMLElementGeneralAPI";
import { assign } from "../lib/assign";

export interface $TextareaOptions extends $ContainerOptions {}
export class $Textarea extends $Container<HTMLTextAreaElement> {
    constructor(options?: Partial<$TextareaOptions>) {
        super('textarea', options);
    }
    
    value(): string;
    value(value: $StateArgument<string>): this;
    value(value?: $StateArgument<string>) { return $.fluent(this, arguments, () => this.dom.value, () => $.set(this.dom, 'value', value, { stateHandler: (value$) => {
        this.on('input', () => {
            if (value$.attributesMap.has(this.dom) === false) return;
            value$.value(`${this.value()}`)
        })
    }}))}

    get labels() { return Array.from(this.dom.labels ?? []).map(label => $(label)) }
}

assign($Textarea, {
    set: ['cols', 'wrap', 'defaultValue', 'dirName', 'placeholder', 'readOnly', 'selectionDirection', 'selectionEnd', 'selectionStart', 'type', 'inputMode', 'autocomplete', 'name', 'required', 'disabled', 'minLength', 'maxLength'],
    fn: ['select', 'setCustomValidity', 'setRangeText', 'setSelectionRange', 'checkValidity', 'reportValidity'],
    get: ['form', 'validationMessage', 'validity', 'willValidate']
})

export interface $Textarea extends $HTMLElementGeneralAPIFilter<$Textarea, 'checkValidity' | 'reportValidity' | 'autocomplete' | 'name' | 'form' | 'required' | 'disabled' | 'minLength' | 'maxLength' | 'validationMessage' | 'validity' | 'willValidate'> {
    cols(): number;
    cols(cols: number): this;
    
    wrap(): string;
    wrap(wrap?: $StateArgument<string> | undefined): this;

    defaultValue(): string;
    defaultValue(defaultValue: string): this;
    
    dirName(): string;
    dirName(dirName: string): this;
    
    placeholder(): string;
    placeholder(placeholder?: string): this;
    
    readOnly(): boolean;
    readOnly(readOnly: boolean): this;
    
    selectionDirection(): SelectionDirection;
    selectionDirection(selectionDirection: SelectionDirection): this;
    
    selectionEnd(): number;
    selectionEnd(selectionEnd: number): this;
    
    selectionStart(): number;
    selectionStart(selectionStart: number): this;
    
    type(): InputType;
    type(type: InputType): this;

    inputMode(): InputMode;
    inputMode(mode: InputMode): this;

    select(): this;
    setCustomValidity(error: string): this
    setRangeText(replacement: string): this;

    setSelectionRange(start: number | null, end: number | null, direction?: SelectionDirection): this;
}