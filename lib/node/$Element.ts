import { $Util } from "../structure/$Util";
import { $Node, $NodeEventMap } from "./$Node";
export interface $ElementOptions {
    id?: string;
    class?: string[];
    dom?: HTMLElement | SVGElement;
    tagname?: string;
}

export class $Element<H extends HTMLElement | SVGElement = HTMLElement, $EM extends $ElementEventMap = $ElementEventMap, EM extends HTMLElementEventMap = HTMLElementEventMap> extends $Node<H, $EM, EM> {
    readonly dom: H;
    private static_classes = new Set<string>();
    constructor(tagname: string, options?: $ElementOptions) {
        super();
        this.dom = this.createDom(tagname, options) as H;
        this.dom.$ = this;
        this.setOptions(options);
    }

    private createDom(tagname: string, options?: $ElementOptions) {
        if (options?.dom) return options.dom;
        if (tagname === 'svg') return document.createElementNS("http://www.w3.org/2000/svg", "svg");
        return document.createElement(options?.tagname ?? tagname);

    }

    setOptions(options: $ElementOptions | undefined) {
        this.id(options?.id)
        if (options && options.class) this.class(...options.class)
        return this;
    }

    /**Replace id of element. @example Element.id('customId');*/
    id(): string;
    id(name: string | undefined): this;
    id(name?: string | undefined): this | string {return $.fluent(this, arguments, () => this.dom.id, () => $.set(this.dom, 'id', name as any))}

    /**Replace list of class name to element. @example Element.class('name1 name2 name3', 'name4') */
    class(): DOMTokenList;
    class(...name: (string | undefined)[]): this;
    class(...name: (string | undefined)[]): this | DOMTokenList {return $.fluent(this, arguments, () => this.dom.classList, () => {this.dom.classList.forEach(n => this.static_classes.has(n) ?? this.dom.classList.remove(n)); this.dom.classList.add(...$Util.classlist(name))})}
    /**Add class name to dom. */
    addClass(...name: (string | undefined)[]): this {return $.fluent(this, arguments, () => this, () => {this.dom.classList.add(...$Util.classlist(name))})}
    /**Remove class name from dom */
    removeClass(...name: (string | undefined)[]): this {return $.fluent(this, arguments, () => this, () => {this.dom.classList.remove(...$Util.classlist(name))})}

    staticClass(): Set<string>;
    staticClass(...name: (string | undefined)[]): this;
    staticClass(...name: (string | undefined)[]) {return $.fluent(this, arguments, () => this.static_classes, () => {name = $Util.classlist(name); this.removeClass(...this.static_classes); this.static_classes.clear(); this.addStaticClass(...name);})}
    addStaticClass(...name: (string | undefined)[]) {return $.fluent(this, arguments, () => this, () => {name = $Util.classlist(name); name.detype().forEach(n => this.static_classes.add(n)); this.addClass(...name)})}
    removeStaticClass(...name: (string | undefined)[]) {return $.fluent(this, arguments, () => this, () => {name = $Util.classlist(name); name.detype().forEach(n => this.static_classes.delete(n)); this.removeClass(...name)})}

    /**Modify css of element. */
    css(): CSSStyleDeclaration
    css(style: Partial<CSSStyleDeclaration>): this;
    css(style?: Partial<CSSStyleDeclaration>) { return $.fluent(this, arguments, () => this.dom.style, () => {Object.assign(this.dom.style, style)})}
    
    /**
     * Get or set attribute from this element.
     * @param qualifiedName Attribute name
     * @param value Attribute value. Set `null` will remove attribute.
     */
    attribute(qualifiedName: string | undefined): string | null;
    attribute(qualifiedName: string | undefined, value?: string | number | boolean | null): this;
    attribute(qualifiedName: string | undefined, value?: string | number | boolean | null): this | string | null { 
        if (!arguments.length) return null;
        if (arguments.length === 1) {
            if (qualifiedName === undefined) return null;
            return this.dom.getAttribute(qualifiedName);
        }
        if (arguments.length === 2) {
            if (!qualifiedName) return this;
            if (value === null) this.dom.removeAttribute(qualifiedName);
            else if (value !== undefined) this.dom.setAttribute(qualifiedName, `${value}`);
            return this;
        }
        return this;
    }
    
    tabIndex(): number;
    tabIndex(tabIndex: number): this;
    tabIndex(tabIndex?: number) { return $.fluent(this, arguments, () => this.dom.tabIndex, () => $.set(this.dom, 'tabIndex', tabIndex as any))}

    focus(options?: FocusOptions) { this.dom.focus(options); return this; }
    blur() { this.dom.blur(); return this; }

    animate(keyframes: Keyframe[] | PropertyIndexedKeyframes | null, options?: number | KeyframeAnimationOptions, callback?: (animation: Animation) => void) {
        const animation = this.dom.animate(keyframes, options);
        if (callback) animation.onfinish = () => callback(animation);
        return animation;
    }

    getAnimations(options?: GetAnimationsOptions) { return this.dom.getAnimations(options) }

    get dataset() { return this.dom.dataset }

    domRect(target?: $Element | $DOMRect) {
        const this_rect = this.dom.getBoundingClientRect();
        if (!target) return this_rect;
        const target_rect = target instanceof $Element ? target.dom.getBoundingClientRect() : target;
        const rect: $DOMRect = {
            ...this_rect,
            top: this_rect.top - target_rect.top,
            left: this_rect.left - target_rect.left,
            right: this_rect.right - target_rect.left,
            bottom: this_rect.bottom - target_rect.top,
            x: this_rect.x - target_rect.x,
            y: this_rect.y - target_rect.y,
        }
        return rect;
    }
}

export type $DOMRect = Omit<DOMRect, 'toJSON'>;
export interface $ElementEventMap extends $NodeEventMap {}