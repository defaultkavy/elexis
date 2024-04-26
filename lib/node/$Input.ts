import { $Element, $ElementOptions } from "./$Element";
import { $State, $StateArgument } from "../$State";

export interface $InputOptions extends $ElementOptions {}
export class $Input<T extends string | number = string> extends $Element<HTMLInputElement> {
    constructor(options?: $InputOptions) {
        super('input', options);
    }
    
    value(): T;
    value(value: $StateArgument<T>): this;
    value(value?: $StateArgument<T>) { return $.fluent(this, arguments, () => {
        if (this.type() === 'number') return Number(this.dom.value);
        return this.dom.value as T;
    }, () => $.set(this.dom, 'value', value as $State<string> | string, (value$) => {
        this.on('input', () => {
            if (value$.attributes.has(this.dom) === false) return;
            if (typeof value$.value === 'string') (value$ as $State<string>).set(`${this.value()}`)
            if (typeof value$.value === 'number') (value$ as unknown as $State<number>).set(Number(this.value()))
        })
    }))}
    
    type(): InputType;
    type<T extends InputType>(type: T): $InputType<T>;
    type<T extends InputType>(type?: T) { return $.fluent(this, arguments, () => this.dom.type, () => $.set(this.dom, 'type', type)) as unknown as $InputType<T> | InputType}

    capture(): string;
    capture(capture: string): this;
    capture(capture?: string) { return $.fluent(this, arguments, () => this.dom.capture, () => $.set(this.dom, 'capture', capture))}

    alt(): string;
    alt(alt: string): this;
    alt(alt?: string) { return $.fluent(this, arguments, () => this.dom.alt, () => $.set(this.dom, 'alt', alt))}

    height(): number;
    height(height: number): this;
    height(height?: number) { return $.fluent(this, arguments, () => this.dom.height, () => $.set(this.dom, 'height', height))}

    width(): number;
    width(wdith: number): this;
    width(width?: number) { return $.fluent(this, arguments, () => this.dom.width, () => $.set(this.dom, 'width', width))}
    
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
    
    pattern(): string;
    pattern(pattern: string): this;
    pattern(pattern?: string) { return $.fluent(this, arguments, () => this.dom.pattern, () => $.set(this.dom, 'pattern', pattern))}
    
    placeholder(): string;
    placeholder(placeholder?: string): this;
    placeholder(placeholder?: string) { return $.fluent(this, arguments, () => this.dom.placeholder, () => $.set(this.dom, 'placeholder', placeholder))}
    
    readOnly(): boolean;
    readOnly(readOnly: boolean): this;
    readOnly(readOnly?: boolean) { return $.fluent(this, arguments, () => this.dom.readOnly, () => $.set(this.dom, 'readOnly', readOnly))}
    
    required(): boolean;
    required(required: boolean): this;
    required(required?: boolean) { return $.fluent(this, arguments, () => this.dom.required, () => $.set(this.dom, 'required', required))}
    
    selectionDirection(): SelectionDirection | null;
    selectionDirection(selectionDirection: SelectionDirection | null): this;
    selectionDirection(selectionDirection?: SelectionDirection | null) { return $.fluent(this, arguments, () => this.dom.selectionDirection, () => $.set(this.dom, 'selectionDirection', selectionDirection))}
    
    selectionEnd(): number | null;
    selectionEnd(selectionEnd: number | null): this;
    selectionEnd(selectionEnd?: number | null) { return $.fluent(this, arguments, () => this.dom.selectionEnd, () => $.set(this.dom, 'selectionEnd', selectionEnd))}
    
    selectionStart(): number | null;
    selectionStart(selectionStart: number | null): this;
    selectionStart(selectionStart?: number | null) { return $.fluent(this, arguments, () => this.dom.selectionStart, () => $.set(this.dom, 'selectionStart', selectionStart))}
    
    size(): number;
    size(size: number): this;
    size(size?: number) { return $.fluent(this, arguments, () => this.dom.size, () => $.set(this.dom, 'size', size))}
    
    src(): string;
    src(src: string): this;
    src(src?: string) { return $.fluent(this, arguments, () => this.dom.src, () => $.set(this.dom, 'src', src))}

    inputMode(): InputMode;
    inputMode(mode: InputMode): this;
    inputMode(mode?: InputMode) { return $.fluent(this, arguments, () => this.dom.inputMode as InputMode, () => $.set(this.dom, 'inputMode', mode))}
    
    valueAsDate(): Date | null;
    valueAsDate(date: Date | null): this;
    valueAsDate(date?: Date | null) { return $.fluent(this, arguments, () => this.dom.valueAsDate, () => $.set(this.dom, 'valueAsDate', date))}
    
    valueAsNumber(): number;
    valueAsNumber(number: number): this;
    valueAsNumber(number?: number) { return $.fluent(this, arguments, () => this.dom.valueAsNumber, () => $.set(this.dom, 'valueAsNumber', number))}
    
    webkitdirectory(): boolean;
    webkitdirectory(boolean: boolean): this;
    webkitdirectory(boolean?: boolean) { return $.fluent(this, arguments, () => this.dom.webkitdirectory, () => $.set(this.dom, 'webkitdirectory', boolean))}

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
    showPicker() { this.dom.showPicker(); return this }
    
    checkValidity() { return this.dom.checkValidity() }
    reportValidity() { return this.dom.reportValidity() }
    get files() { return this.dom.files }
    get webkitEntries() { return this.dom.webkitEntries }
    

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
    
    name(): string;
    name(name?: $StateArgument<string> | undefined): this;
    name(name?: $StateArgument<string> | undefined) { return $.fluent(this, arguments, () => this.dom.name, () => $.set(this.dom, 'name', name))}

    maxLength(): number;
    maxLength(maxLength: number): this;
    maxLength(maxLength?: number) { return $.fluent(this, arguments, () => this.dom.maxLength, () => $.set(this.dom, 'maxLength', maxLength))}
    
    minLength(): number;
    minLength(minLength: number): this;
    minLength(minLength?: number) { return $.fluent(this, arguments, () => this.dom.minLength, () => $.set(this.dom, 'minLength', minLength))}

    get form() { return this.dom.form ? $(this.dom.form) : null }
    get labels() { return Array.from(this.dom.labels ?? []).map(label => $(label)) }
    get validationMessage() { return this.dom.validationMessage }
    get validity() { return this.dom.validity }
    get willValidate() { return this.dom.willValidate }
}

export class $NumberInput extends $Input<number> {
    constructor(options?: $InputOptions) {
        super(options)
        this.type('number')
    }

    static from($input: $Input) {
        return $.mixin($Input, this) as $NumberInput;
    }
    stepDown() { this.dom.stepDown(); return this }
    stepUp() { this.dom.stepUp(); return this }
    
    max(): number;
    max(max: number): this;
    max(max?: number) { return $.fluent(this, arguments, () => this.dom.max === '' ? null : parseInt(this.dom.min), () => $.set(this.dom, 'max', max?.toString()))}
    
    min(): number;
    min(min: number): this;
    min(min?: number) { return $.fluent(this, arguments, () => this.dom.min === '' ? null : parseInt(this.dom.min), () => $.set(this.dom, 'min', min?.toString()))}
    
    step(): number;
    step(step: number): this;
    step(step?: number) { return $.fluent(this, arguments, () => Number(this.dom.step), () => $.set(this.dom, 'step', step?.toString()))}
}

export class $CheckInput extends $Input<string> {
    constructor(options?: $InputOptions) {
        super(options)
        this.type('radio')
    }

    static from($input: $Input) {
        return $.mixin($Input, this) as $CheckInput;
    }

    checked(): boolean;
    checked(boolean: boolean): this;
    checked(boolean?: boolean) { return $.fluent(this, arguments, () => this.dom.checked, () => $.set(this.dom, 'checked', boolean))}
    
    defaultChecked(): boolean;
    defaultChecked(defaultChecked: boolean): this;
    defaultChecked(defaultChecked?: boolean) { return $.fluent(this, arguments, () => this.dom.defaultChecked, () => $.set(this.dom, 'defaultChecked', defaultChecked))}
}

export class $FileInput extends $Input<string> {
    constructor(options?: $InputOptions) {
        super(options)
        this.type('file')
    }

    static from($input: $Input) {
        return $.mixin($Input, this) as $CheckInput;
    }
    
    multiple(): boolean;
    multiple(multiple: boolean): this;
    multiple(multiple?: boolean) { return $.fluent(this, arguments, () => this.dom.multiple, () => $.set(this.dom, 'multiple', multiple))}
    
    accept(): string[]
    accept(...filetype: string[]): this
    accept(...filetype: string[]) { return $.fluent(this, arguments, () => this.dom.accept.split(','), () => this.dom.accept = filetype.toString() )}
}

export type $InputType<T extends InputType> = T extends 'number' ? $NumberInput : T extends 'radio' | 'checkbox' ? $CheckInput : T extends 'file' ? $FileInput : $Input<string>;