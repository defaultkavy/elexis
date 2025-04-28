import { $State, type $StateArgument } from "../structure/$State";
import { type $HTMLElementGeneralAPIFilter } from "../structure/$HTMLElementGeneralAPI";
import { $HTMLElement, type $HTMLElementEventMap, type $HTMLElementOptions } from "./$HTMLElement";
import { assign } from "../lib/assign";
import { mixin } from "../lib/mixin";

export interface $InputOptions extends $HTMLElementOptions {}
export class $Input<T extends string | number = string, I = $Input<T, never>> extends $HTMLElement<HTMLInputElement, $InputEventMap<I>> {
    constructor(options?: Partial<$InputOptions>) {
        super('input', options);
    }
    
    value(): T;
    value(value: $StateArgument<T>): this;
    value(value?: $StateArgument<T>) { return $.fluent(this, arguments, () => {
        if (this.type() === 'number') return Number(this.dom.value);
        return this.dom.value as T;
    }, () => $.set(this.dom, 'value', value as $State<string> | string, (value$) => {
        this.on('input', () => {
            if (value$.attributesMap.has(this.dom) === false) return;
            if (typeof value$.value === 'string') (value$ as $State<string>).value(`${this.value()}`, {disableUpdate: true})
            if (typeof value$.value === 'number') (value$ as unknown as $State<number>).value(Number(this.value()), {disableUpdate: true})
        })
    }))}
}

assign($Input, {
    set: ['type', 'capture', 'alt', 'height', 'width', 'defaultValue', 'dirName', 'pattern', 'placeholder', 'readOnly', 'selectionDirection', 'selectionEnd', 'selectionStart', 'size', 'src', 'inputMode', 'valueAsDate', 'webkitdirectory', 'formAction', 'formEnctype', 'formMethod', 'formNoValidate', 'formTarget', 'required', 'name', 'autocomplete', 'checked', 'defaultChecked', 'multiple'],
    fn: ['select', 'setCustomValidity', 'setRangeText', 'setSelectionRange', 'showPicker', 'checkValidity', 'reportValidity', 'stepDown', 'stepUp'],
    get: ['files', 'webkitEntries', 'labels', 'form', 'validity', 'willValidate', 'validationMessage']
})

export interface $Input extends $HTMLElementGeneralAPIFilter<$Input, 'checkValidity' | 'reportValidity' | 'autocomplete' | 'name' | 'form' | 'required' | 'validationMessage' | 'validity' | 'willValidate' | 'formAction' | 'formEnctype' | 'formMethod' | 'formNoValidate' | 'formTarget'> {
    type(): InputType;
    type<T extends InputType>(type: T): $InputType<T>;

    capture(): string;
    capture(capture: $StateArgument<string>): this;

    alt(): string;
    alt(alt: $StateArgument<string>): this;

    height(): number;
    height(height: $StateArgument<number>): this;

    width(): number;
    width(wdith: $StateArgument<number>): this;
    
    defaultValue(): string;
    defaultValue(defaultValue: $StateArgument<string>): this;
    
    dirName(): string;
    dirName(dirName: $StateArgument<string>): this;
    
    pattern(): string;
    pattern(pattern: $StateArgument<string>): this;
    
    placeholder(): string;
    placeholder(placeholder: $StateArgument<string>): this;
    
    readOnly(): boolean;
    readOnly(readOnly: boolean): this;
    
    selectionDirection(): SelectionDirection | null;
    selectionDirection(selectionDirection: SelectionDirection | null): this;
    
    selectionEnd(): number | null;
    selectionEnd(selectionEnd: $StateArgument<number | null>): this;
    
    selectionStart(): number | null;
    selectionStart(selectionStart: $StateArgument<number | null>): this;
    
    size(): number;
    size(size: $StateArgument<number>): this;
    
    src(): string;
    src(src: $StateArgument<string>): this;

    inputMode(): InputMode;
    inputMode(mode: $StateArgument<InputMode>): this;
    
    valueAsDate(): Date | null;
    valueAsDate(date: $StateArgument<Date | null>): this;
    
    valueAsNumber(): number;
    valueAsNumber(number: $StateArgument<number>): this;
    
    webkitdirectory(): boolean;
    webkitdirectory(boolean: $StateArgument<boolean>): this;

    select(): this;
    setCustomValidity(error: string): this;
    setRangeText(replacement: string): this;
    setRangeText(replacement: string, start: number, end: number, selectionMode?: SelectionMode): this;
    setSelectionRange(start: number | null, end: number | null, direction?: SelectionDirection): this;
    showPicker(): this;

    get files(): FileList | null
    get webkitEntries(): readonly FileSystemEntry[]
}

export interface $InputEventMap<T> extends $HTMLElementEventMap {
    input: [InputEvent, T]
}

export type $InputType<T extends InputType> = T extends 'number' ? $NumberInput : T extends 'radio' | 'checkbox' ? $CheckInput : T extends 'file' ? $FileInput : $Input<string>;

export class $CheckInput extends $Input<string, $CheckInput> {
    constructor(options?: $InputOptions) {
        super(options)
        this.type('radio')
    }
}

export interface $CheckInput extends $Input<string, $CheckInput> {
    checked(): boolean;
    checked(boolean: $StateArgument<boolean>): this;
    
    defaultChecked(): boolean;
    defaultChecked(defaultChecked: boolean): this;
}

export class $FileInput extends $Input<string, $FileInput> {
    constructor(options?: $InputOptions) {
        super(options)
        this.type('file')
    }
    
    accept(): string[]
    accept(...filetype: string[]): this
    accept(...filetype: string[]) { return $.fluent(this, arguments, () => this.dom.accept.split(','), () => this.dom.accept = filetype.toString() )}
}

export interface $FileInput extends $Input<string, $FileInput> {
    multiple(): boolean;
    multiple(multiple: boolean): this;
}

export class $NumberInput extends $Input<number, $NumberInput> {
    constructor(options?: $InputOptions) {
        super(options)
        this.type('number')
    }
    
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

export interface $NumberInput extends $Input<number, $NumberInput> {
    stepDown(): this;
    stepUp(): this;
}

mixin($Input, [$NumberInput, $CheckInput, $FileInput]);