import { assign } from "#lib/assign";
import { $Element, type $ElementEventMap, type $ElementOptions } from "./$Element";

export interface $HTMLElementOptions extends $ElementOptions {
    tabIndex: number;
    autocapitalize: Autocapitalize;
    title: string;
    dir: TextDirection;
    translate: boolean;
    popover: string | null;
    inert: boolean;
    lang: string
    draggable: boolean;
    hidden: boolean;
}
export class $HTMLElement<H extends HTMLElement = HTMLElement, $EM extends $HTMLElementEventMap = $HTMLElementEventMap> extends $Element<H, $EM> {
    constructor(tagname: string, options?: Partial<$HTMLElementOptions>) {
        super(tagname, options)
    }
    
    /**Modify style of element. */
    style(): CSSStyleDeclaration
    style(style: Partial<CSSStyleDeclaration>): this;
    style(style?: Partial<CSSStyleDeclaration>) { return $.fluent(this, arguments, () => this.dom.style, () => {Object.assign(this.dom.style, style)})}
}

assign($HTMLElement, { 
    set: ['tabIndex', 'autocapitalize', 'title', 'dir', 'translate', 'popover', 'spellcheck', 'inert', 'lang', 'draggable', 'hidden', 'innerText'],
    fn: ['click', 'attachInternals', 'hidePopover', 'showPopover', 'togglePopover', 'focus', 'blur'],
    get: ['offsetHeight', 'offsetLeft', 'offsetTop', 'offsetWidth', 'dataset', 'accessKeyLabel'] 
})

export interface $HTMLElement {
    tabIndex(): number;
    tabIndex(tabIndex: number): this;

    autocapitalize(): Autocapitalize;
    autocapitalize(autocapitalize?: Autocapitalize): this;

    title(): string;
    title(title?: string): this;

    dir(): TextDirection;
    dir(dir?: TextDirection): this;

    translate(): boolean;
    translate(translate?: boolean): this;

    popover(): string | null;
    popover(popover?: string | null): this;

    spellcheck(): boolean;
    spellcheck(spellcheck?: boolean): this;

    inert(): boolean;
    inert(inert?: boolean): this;

    lang(): string;
    lang(lang?: string): this;

    draggable(): boolean;
    draggable(draggable?: boolean): this;

    hidden(): boolean;
    hidden(hidden?: boolean): this;
    
    innerText(): string;
    innerText(text?: string): this;
    
    focus(options?: FocusOptions): this;
    blur(): this;
    click(): this;
    attachInternals(): this;
    hidePopover(): this;
    showPopover(): this;
    togglePopover(): this;

    get accessKeyLabel(): string;
    get offsetHeight(): number;
    get offsetLeft(): number;
    get offsetParent(): Element | null;
    get offsetTop(): number;
    get offsetWidth(): number;
    get dataset(): DOMStringMap;
}

export interface $HTMLElementEventMap extends $ElementEventMap {}