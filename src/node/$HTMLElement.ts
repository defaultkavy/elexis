import { $Element, type $ElementEventMap, type $ElementOptions } from "./$Element";

export interface $HTMLElementOptions extends $ElementOptions {}
export class $HTMLElement<H extends HTMLElement = HTMLElement, $EM extends $HTMLElementEventMap = $HTMLElementEventMap> extends $Element<H, $EM> {
    constructor(tagname: string, options?: $HTMLElementOptions) {
        super(tagname, options)
    }
    
    /**Modify style of element. */
    style(): CSSStyleDeclaration
    style(style: Partial<CSSStyleDeclaration>): this;
    style(style?: Partial<CSSStyleDeclaration>) { return $.fluent(this, arguments, () => this.dom.style, () => {Object.assign(this.dom.style, style)})}
    
    tabIndex(): number;
    tabIndex(tabIndex: number): this;
    tabIndex(tabIndex?: number) { return $.fluent(this, arguments, () => this.dom.tabIndex, () => $.set(this.dom, 'tabIndex', tabIndex as any))}

    focus(options?: FocusOptions) { this.dom.focus(options); return this; }
    blur() { this.dom.blur(); return this; }

    autocapitalize(): Autocapitalize;
    autocapitalize(autocapitalize?: Autocapitalize): this;
    autocapitalize(autocapitalize?: Autocapitalize) { return $.fluent(this, arguments, () => this.dom.autocapitalize, () => $.set(this.dom, 'autocapitalize', autocapitalize as any))}

    innerText(): string;
    innerText(text?: string): this;
    innerText(text?: string) { return $.fluent(this, arguments, () => this.dom.innerText, () => $.set(this.dom, 'innerText', text as any))}

    title(): string;
    title(title?: string): this;
    title(title?: string) { return $.fluent(this, arguments, () => this.dom.title, () => $.set(this.dom, 'title', title as any))}

    dir(): TextDirection;
    dir(dir?: TextDirection): this;
    dir(dir?: TextDirection) { return $.fluent(this, arguments, () => this.dom.dir, () => $.set(this.dom, 'dir', dir as any))}

    translate(): boolean;
    translate(translate?: boolean): this;
    translate(translate?: boolean) { return $.fluent(this, arguments, () => this.dom.translate, () => $.set(this.dom, 'translate', translate as any))}

    popover(): string | null;
    popover(popover?: string | null): this;
    popover(popover?: string | null) { return $.fluent(this, arguments, () => this.dom.popover, () => $.set(this.dom, 'popover', popover as any))}

    spellcheck(): boolean;
    spellcheck(spellcheck?: boolean): this;
    spellcheck(spellcheck?: boolean) { return $.fluent(this, arguments, () => this.dom.spellcheck, () => $.set(this.dom, 'spellcheck', spellcheck as any))}

    inert(): boolean;
    inert(inert?: boolean): this;
    inert(inert?: boolean) { return $.fluent(this, arguments, () => this.dom.inert, () => $.set(this.dom, 'inert', inert as any))}

    lang(): string;
    lang(lang?: string): this;
    lang(lang?: string) { return $.fluent(this, arguments, () => this.dom.lang, () => $.set(this.dom, 'lang', lang as any))}

    draggable(): boolean;
    draggable(draggable?: boolean): this;
    draggable(draggable?: boolean) { return $.fluent(this, arguments, () => this.dom.draggable, () => $.set(this.dom, 'draggable', draggable as any))}

    hidden(): boolean;
    hidden(hidden?: boolean): this;
    hidden(hidden?: boolean) { return $.fluent(this, arguments, () => this.dom.hidden, () => $.set(this.dom, 'hidden', hidden as any))}

    click() { this.dom.click(); return this; }
    attachInternals() { return this.dom.attachInternals(); }
    hidePopover() { this.dom.hidePopover(); return this; }
    showPopover() { this.dom.showPopover(); return this; }
    togglePopover() { this.dom.togglePopover(); return this; }

    get accessKeyLabel() { return this.dom.accessKeyLabel }
    get offsetHeight() { return this.dom.offsetHeight }
    get offsetLeft() { return this.dom.offsetLeft }
    get offsetParent() { return $(this.dom.offsetParent) }
    get offsetTop() { return this.dom.offsetTop }
    get offsetWidth() { return this.dom.offsetWidth }
    get dataset() { return this.dom.dataset }
}

export interface $HTMLElementEventMap extends $ElementEventMap {}