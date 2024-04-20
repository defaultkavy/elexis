import { $Container, $ContainerOptions } from "./$Container";
import { $State } from "./$State";

export interface $TextareaOptions extends $ContainerOptions {}
export class $Textarea extends $Container<HTMLTextAreaElement> {
    constructor(options?: $TextareaOptions) {
        super('textarea', options);
    }
    
    cols(): number;
    cols(cols: number): this;
    cols(cols?: number) { return $.fluent(this, arguments, () => this.dom.cols, () => $.set(this.dom, 'cols', cols))}
    
    name(): string;
    name(name?: string | $State<string>): this;
    name(name?: string | $State<string>) { return $.fluent(this, arguments, () => this.dom.name, () => $.set(this.dom, 'name', name))}
    
    wrap(): string;
    wrap(wrap?: string | $State<string>): this;
    wrap(wrap?: string | $State<string>) { return $.fluent(this, arguments, () => this.dom.wrap, () => $.set(this.dom, 'wrap', wrap))}
    
    value(): string;
    value(value?: string | $State<string>): this;
    value(value?: string | $State<string>) { return $.fluent(this, arguments, () => this.dom.value, () => $.set(this.dom, 'value', value))}
    
    maxLength(): number;
    maxLength(maxLength: number): this;
    maxLength(maxLength?: number) { return $.fluent(this, arguments, () => this.dom.maxLength, () => $.set(this.dom, 'maxLength', maxLength))}
    
    minLength(): number;
    minLength(minLength: number): this;
    minLength(minLength?: number) { return $.fluent(this, arguments, () => this.dom.minLength, () => $.set(this.dom, 'minLength', minLength))}
    
    autocomplete(): AutoFill;
    autocomplete(autocomplete: AutoFill): this;
    autocomplete(autocomplete?: AutoFill) { return $.fluent(this, arguments, () => this.dom.autocomplete, () => $.set(this.dom, 'autocomplete', autocomplete))}
    
    defaultValue(): string;
    defaultValue(defaultValue: string): this;
    defaultValue(defaultValue?: string) { return $.fluent(this, arguments, () => this.dom.defaultValue, () => $.set(this.dom, 'defaultValue', defaultValue))}
    
    dirName(): string;
    dirName(dirName: string): this;
    dirName(dirName?: string) { return $.fluent(this, arguments, () => this.dom.dirName, () => $.set(this.dom, 'dirName', dirName))}
    
    disabled(): boolean;
    disabled(disabled: boolean): this;
    disabled(disabled?: boolean) { return $.fluent(this, arguments, () => this.dom.disabled, () => $.set(this.dom, 'disabled', disabled))}
    
    placeholder(): string;
    placeholder(placeholder?: string): this;
    placeholder(placeholder?: string) { return $.fluent(this, arguments, () => this.dom.placeholder, () => $.set(this.dom, 'placeholder', placeholder))}
    
    readOnly(): boolean;
    readOnly(readOnly: boolean): this;
    readOnly(readOnly?: boolean) { return $.fluent(this, arguments, () => this.dom.readOnly, () => $.set(this.dom, 'readOnly', readOnly))}
    
    required(): boolean;
    required(required: boolean): this;
    required(required?: boolean) { return $.fluent(this, arguments, () => this.dom.required, () => $.set(this.dom, 'required', required))}
    
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
    
    checkValidity() { return this.dom.checkValidity() }
    reportValidity() { return this.dom.reportValidity() }

    get validationMessage() { return this.dom.validationMessage }
    get validity() { return this.dom.validity }
    get form() { return this.dom.form ? $(this.dom.form) : null }
    get labels() { return Array.from(this.dom.labels ?? []).map(label => $(label)) }
}