import { $Node } from "./$Node";

export interface $ElementOptions {
    id?: string;
    class?: string[];
}

export class $Element<H extends HTMLElement = HTMLElement> extends $Node<H> {
    readonly dom: H;
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
    id(name?: string | undefined): this | string {return $.fluent(this, arguments, () => this.dom.id, () => {if (name) this.dom.id === name})}

    /**Replace list of class name to element. @example Element.class('name1', 'name2') */
    class(): DOMTokenList;
    class(...name: (string | undefined)[]): this;
    class(...name: (string | undefined)[]): this | DOMTokenList {return $.fluent(this, arguments, () => this.dom.classList, () => {this.dom.className = ''; this.dom.classList.add(...name.detype())})}
    /**Add class name to dom. */
    addClass(...name: (string | undefined)[]): this {return $.fluent(this, arguments, () => this, () => {this.dom.classList.add(...name.detype())})}
    /**Remove class name from dom */
    removeClass(...name: (string | undefined)[]): this {return $.fluent(this, arguments, () => this, () => {this.dom.classList.remove(...name.detype())})}

    /**Modify css of element. */
    css(): CSSStyleDeclaration
    css(style: Partial<CSSStyleDeclaration>): this;
    css(style?: Partial<CSSStyleDeclaration>) { return $.fluent(this, arguments, () => this.dom.style, () => {Object.assign(this.dom.style, style)})}

    /**Remove this element from parent */
    remove() {
        this.parent?.children.remove(this);
        (this as Mutable<this>).parent = undefined;
        this.dom.remove();
        return this;
    }
    
    autocapitalize(): Autocapitalize;
    autocapitalize(autocapitalize: Autocapitalize): this;
    autocapitalize(autocapitalize?: Autocapitalize) { return $.fluent(this, arguments, () => this.dom.autocapitalize, () => $.set(this.dom, 'autocapitalize', autocapitalize))}

    dir(): TextDirection;
    dir(dir: TextDirection): this;
    dir(dir?: TextDirection) { return $.fluent(this, arguments, () => this.dom.dir, () => $.set(this.dom, 'dir', dir))}

    innerText(): string;
    innerText(text: string): this;
    innerText(text?: string) { return $.fluent(this, arguments, () => this.dom.innerText, () => $.set(this.dom, 'innerText', text))}

    title(): string;
    title(title: string): this;
    title(title?: string) { return $.fluent(this, arguments, () => this.dom.title, () => $.set(this.dom, 'title', title))}

    translate(): boolean;
    translate(translate: boolean): this;
    translate(translate?: boolean) { return $.fluent(this, arguments, () => this.dom.translate, () => $.set(this.dom, 'translate', translate))}
}