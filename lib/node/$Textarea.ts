import { $Container, type $ContainerOptions } from "./$Container";
import { $State, type $StateArgument } from "../structure/$State";
import { type $HTMLElementAPIFilter, $HTMLElementAPIs } from "../structure/$ElementTemplate";
import { $Util } from "../structure/$Util";

export interface $TextareaOptions extends $ContainerOptions {}
export class $Textarea extends $Container<HTMLTextAreaElement> {
    constructor(options?: $TextareaOptions) {
        super('textarea', options);
    }
    
    cols(): number;
    cols(cols: number): this;
    cols(cols?: number) { return $.fluent(this, arguments, () => this.dom.cols, () => $.set(this.dom, 'cols', cols))}
    
    wrap(): string;
    wrap(wrap?: $StateArgument<string> | undefined): this;
    wrap(wrap?: $StateArgument<string> | undefined) { return $.fluent(this, arguments, () => this.dom.wrap, () => $.set(this.dom, 'wrap', wrap))}
    
    value(): string;
    value(value: $StateArgument<string>): this;
    value(value?: $StateArgument<string>) { return $.fluent(this, arguments, () => this.dom.value, () => $.set(this.dom, 'value', value as $State<string> | string, (value$) => {
        this.on('input', () => {
            if (value$.attributes.has(this.dom) === false) return;
            (value$ as $State<string>).set(`${this.value()}`)
        })
    }))}

    defaultValue(): string;
    defaultValue(defaultValue: string): this;
    defaultValue(defaultValue?: string) { return $.fluent(this, arguments, () => this.dom.defaultValue, () => $.set(this.dom, 'defaultValue', defaultValue))}
    
    dirName(): string;
    dirName(dirName: string): this;
    dirName(dirName?: string) { return $.fluent(this, arguments, () => this.dom.dirName, () => $.set(this.dom, 'dirName', dirName))}
    
    placeholder(): string;
    placeholder(placeholder?: string): this;
    placeholder(placeholder?: string) { return $.fluent(this, arguments, () => this.dom.placeholder, () => $.set(this.dom, 'placeholder', placeholder))}
    
    readOnly(): boolean;
    readOnly(readOnly: boolean): this;
    readOnly(readOnly?: boolean) { return $.fluent(this, arguments, () => this.dom.readOnly, () => $.set(this.dom, 'readOnly', readOnly))}
    
    selectionDirection(): SelectionDirection;
    selectionDirection(selectionDirection: SelectionDirection): this;
    selectionDirection(selectionDirection?: SelectionDirection) { return $.fluent(this, arguments, () => this.dom.selectionDirection, () => $.set(this.dom, 'selectionDirection', selectionDirection))}
    
    selectionEnd(): number;
    selectionEnd(selectionEnd: number): this;
    selectionEnd(selectionEnd?: number) { return $.fluent(this, arguments, () => this.dom.selectionEnd, () => $.set(this.dom, 'selectionEnd', selectionEnd))}
    
    selectionStart(): number;
    selectionStart(selectionStart: number): this;
    selectionStart(selectionStart?: number) { return $.fluent(this, arguments, () => this.dom.selectionStart, () => $.set(this.dom, 'selectionStart', selectionStart))}
    
    type(): InputType;
    type(type: InputType): this;
    type(type?: InputType) { return $.fluent(this, arguments, () => this.dom.type, () => $.set(this.dom, 'type', type))}

    inputMode(): InputMode;
    inputMode(mode: InputMode): this;
    inputMode(mode?: InputMode) { return $.fluent(this, arguments, () => this.dom.inputMode as InputMode, () => $.set(this.dom, 'inputMode', mode))}

    select() { this.dom.select(); return this }
    setCustomValidity(error: string) { this.dom.setCustomValidity(error); return this }
    setRangeText(replacement: string): this;
    setRangeText(replacement: string, start: number, end: number, selectionMode?: SelectionMode): this;
    setRangeText(replacement: string, start?: number, end?: number, selectionMode?: SelectionMode) {
        if (typeof start === 'number' && typeof end === 'number') this.dom.setRangeText(replacement, start, end, selectionMode)
        this.dom.setRangeText(replacement); 
        return this 
    }
    setSelectionRange(start: number | null, end: number | null, direction?: SelectionDirection) { this.dom.setSelectionRange(start, end, direction); return this }

    get labels() { return Array.from(this.dom.labels ?? []).map(label => $(label)) }
}

export interface $Textarea extends $HTMLElementAPIFilter<$Textarea, 'checkValidity' | 'reportValidity' | 'autocomplete' | 'name' | 'form' | 'required' | 'disabled' | 'minLength' | 'maxLength' | 'validationMessage' | 'validity' | 'willValidate'> {}
$Util.mixin($Textarea, $HTMLElementAPIs.create('checkValidity', 'reportValidity', 'autocomplete', 'name', 'form', 'required', 'disabled', 'minLength', 'maxLength', 'validationMessage', 'validity', 'willValidate'))