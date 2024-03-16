import { $Node } from "./$Node";

export interface $ElementOptions {
    id?: string;
    class?: string[];
}

export class $Element<H extends HTMLElement = HTMLElement> extends $Node<H> {
    readonly dom: H;
    private static_classes = new Set<string>();
    constructor(tagname: string, options?: $ElementOptions) {
        super();
        this.dom = document.createElement(tagname) as H;
        this.dom.$ = this;
        this.options(options);
    }

    options(options: $ElementOptions | undefined) {
        this.id(options?.id)
        if (options && options.class) this.class(...options.class)
        return this;
    }

    /**Replace id of element. @example Element.id('customId');*/
    id(): string;
    id(name: string | undefined): this;
    id(name?: string | undefined): this | string {return $.fluent(this, arguments, () => this.dom.id, () => $.set(this.dom, 'id', name))}

    /**Replace list of class name to element. @example Element.class('name1', 'name2') */
    class(): DOMTokenList;
    class(...name: (string | undefined)[]): this;
    class(...name: (string | undefined)[]): this | DOMTokenList {return $.fluent(this, arguments, () => this.dom.classList, () => {this.dom.classList.forEach(n => this.static_classes.has(n) ?? this.dom.classList.remove(n)); this.dom.classList.add(...name.detype())})}
    /**Add class name to dom. */
    addClass(...name: (string | undefined)[]): this {return $.fluent(this, arguments, () => this, () => {this.dom.classList.add(...name.detype())})}
    /**Remove class name from dom */
    removeClass(...name: (string | undefined)[]): this {return $.fluent(this, arguments, () => this, () => {this.dom.classList.remove(...name.detype())})}

    staticClass(): Set<string>;
    staticClass(...name: (string | undefined)[]): this;
    staticClass(...name: (string | undefined)[]) {return $.fluent(this, arguments, () => this.static_classes, () => {this.removeClass(...this.static_classes); this.static_classes.clear(); this.addStaticClass(...name);})}
    addStaticClass(...name: (string | undefined)[]) {return $.fluent(this, arguments, () => this, () => {name.detype().forEach(n => this.static_classes.add(n)); this.addClass(...name)})}
    removeStaticClass(...name: (string | undefined)[]) {return $.fluent(this, arguments, () => this, () => {name.detype().forEach(n => this.static_classes.delete(n)); this.removeClass(...name)})}

    /**Modify css of element. */
    css(): CSSStyleDeclaration
    css(style: Partial<CSSStyleDeclaration>): this;
    css(style?: Partial<CSSStyleDeclaration>) { return $.fluent(this, arguments, () => this.dom.style, () => {Object.assign(this.dom.style, style)})}
    
    attribute(qualifiedName: string | undefined): string | null;
    attribute(qualifiedName: string | undefined, value?: string | number | boolean): this;
    attribute(qualifiedName: string | undefined, value?: string | number | boolean): this | string | null { 
        if (!arguments.length) return null;
        if (arguments.length === 1) {
            if (qualifiedName === undefined) return null;
            return this.dom.getAttribute(qualifiedName);
        }
        if (arguments.length === 2) {
            if (qualifiedName && value) this.dom.setAttribute(qualifiedName, `${value}`);
            return this;
        }
        return this;
    }
    
    autocapitalize(): Autocapitalize;
    autocapitalize(autocapitalize?: Autocapitalize): this;
    autocapitalize(autocapitalize?: Autocapitalize) { return $.fluent(this, arguments, () => this.dom.autocapitalize, () => $.set(this.dom, 'autocapitalize', autocapitalize))}

    dir(): TextDirection;
    dir(dir?: TextDirection): this;
    dir(dir?: TextDirection) { return $.fluent(this, arguments, () => this.dom.dir, () => $.set(this.dom, 'dir', dir))}

    innerText(): string;
    innerText(text?: string): this;
    innerText(text?: string) { return $.fluent(this, arguments, () => this.dom.innerText, () => $.set(this.dom, 'innerText', text))}

    title(): string;
    title(title?: string): this;
    title(title?: string) { return $.fluent(this, arguments, () => this.dom.title, () => $.set(this.dom, 'title', title))}

    translate(): boolean;
    translate(translate?: boolean): this;
    translate(translate?: boolean) { return $.fluent(this, arguments, () => this.dom.translate, () => $.set(this.dom, 'translate', translate))}

    popover(): string | null;
    popover(popover?: string | null): this;
    popover(popover?: string | null) { return $.fluent(this, arguments, () => this.dom.popover, () => $.set(this.dom, 'popover', popover))}

    spellcheck(): boolean;
    spellcheck(spellcheck?: boolean): this;
    spellcheck(spellcheck?: boolean) { return $.fluent(this, arguments, () => this.dom.spellcheck, () => $.set(this.dom, 'spellcheck', spellcheck))}

    inert(): boolean;
    inert(inert?: boolean): this;
    inert(inert?: boolean) { return $.fluent(this, arguments, () => this.dom.inert, () => $.set(this.dom, 'inert', inert))}

    lang(): string;
    lang(lang?: string): this;
    lang(lang?: string) { return $.fluent(this, arguments, () => this.dom.lang, () => $.set(this.dom, 'lang', lang))}

    draggable(): boolean;
    draggable(draggable?: boolean): this;
    draggable(draggable?: boolean) { return $.fluent(this, arguments, () => this.dom.draggable, () => $.set(this.dom, 'draggable', draggable))}

    hidden(): boolean;
    hidden(hidden?: boolean): this;
    hidden(hidden?: boolean) { return $.fluent(this, arguments, () => this.dom.hidden, () => $.set(this.dom, 'hidden', hidden))}

    click() { this.dom.click(); return this; }
    attachInternals() { return this.dom.attachInternals(); }
    hidePopover() { this.dom.hidePopover(); return this; }
    showPopover() { this.dom.showPopover(); return this; }
    togglePopover() { this.dom.togglePopover(); return this; }

    animate(keyframes: Keyframe[] | PropertyIndexedKeyframes | null, options?: number | KeyframeAnimationOptions, callback?: (animation: Animation) => void) {
        const animation = this.dom.animate(keyframes, options);
        if (callback) callback(animation);
        return this;
    }

    getAnimations(options?: GetAnimationsOptions) { return this.dom.getAnimations(options) }

    get accessKeyLabel() { return this.dom.accessKeyLabel }
    get offsetHeight() { return this.dom.offsetHeight }
    get offsetLeft() { return this.dom.offsetLeft }
    get offsetParent() { return $(this.dom.offsetParent) }
    get offsetTop() { return this.dom.offsetTop }
    get offsetWidth() { return this.dom.offsetWidth }
}