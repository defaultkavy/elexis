import { _classList } from "../lib/classList";
import type { $StateArgument } from "../structure/$State";
import { $Node, type $NodeEventMap } from "./$Node";
export interface $ElementOptions {
    id?: string;
    class?: string[];
    dom?: Element;
    tagname?: string;
}

export class $Element<H extends Element = Element, $EM extends $ElementEventMap = $ElementEventMap, EM extends ElementEventMap & GlobalEventHandlersEventMap = ElementEventMap & GlobalEventHandlersEventMap> extends $Node<H, $EM, EM> {
    readonly dom: H;
    // static class
    private SC = new Set<string>();
    // class list
    private CL: DOMTokenList;
    constructor(tagname: string, options?: $ElementOptions) {
        super();
        this.dom = this.createDom(tagname, options) as H;
        this.dom.$ = this;
        this.CL = this.dom.classList;
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
    id(name: $StateArgument<string | undefined>): this;
    id(name?: $StateArgument<string | undefined>): this | string {return $.fluent(this, arguments, () => this.dom.id, () => $.set(this.dom, 'id', name as any))}

    /**Replace list of class name to element. @example Element.class('name1 name2 name3', 'name4') */
    class(): DOMTokenList;
    class(...name: (string | undefined)[]): this;
    class(...name: (string | undefined)[]): this | DOMTokenList {return $.fluent(this, arguments, () => this.CL, () => {this.CL.forEach(n => this.SC.has(n) ?? this.CL.remove(n)); this.CL.add(..._classList(name))})}
    /**Add class name to dom. */
    addClass(...name: (string | undefined)[]): this {return $.fluent(this, arguments, () => this, () => {this.CL.add(..._classList(name))})}
    /**Remove class name from dom */
    removeClass(...name: (string | undefined)[]): this {return $.fluent(this, arguments, () => this, () => {this.CL.remove(..._classList(name))})}

    staticClass(): Set<string>;
    staticClass(...name: (string | undefined)[]): this;
    staticClass(...name: (string | undefined)[]) {return $.fluent(this, arguments, () => this.SC, () => {name = _classList(name); this.removeClass(...this.SC); this.SC.clear(); this.addStaticClass(...name);})}
    addStaticClass(...name: (string | undefined)[]) {return $.fluent(this, arguments, () => this, () => {name = _classList(name); name.detype().forEach(n => this.SC.add(n)); this.addClass(...name)})}
    removeStaticClass(...name: (string | undefined)[]) {return $.fluent(this, arguments, () => this, () => {name = _classList(name); name.detype().forEach(n => this.SC.delete(n)); this.removeClass(...name)})}
    
    innerHTML(): string;
    innerHTML(html: $StateArgument<string | undefined>): this;
    innerHTML(html?: $StateArgument<string | undefined>) { return $.fluent(this, arguments, () => this.dom.innerHTML, () => $.set(this.dom, 'innerHTML', html as any)) }

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

    animate(keyframes: $ElementAnimationKeyframe[] | $ElementAnimationPropertyIndexedKeyframes | null, options?: number | $ElementAnimationOptions<this>, callback?: (animation: Animation) => void) {
        const animation = this.dom.animate(keyframes, options);
        if (typeof options !== 'number') {
            if (options?.onfinish) animation.onfinish = (ev) => options.onfinish!(this, animation, ev);
            if (options?.oncancel) animation.oncancel = (ev) => options.oncancel!(this, animation, ev);
            if (options?.onremove) animation.onremove = (ev) => options.onremove!(this, animation, ev);
        }
        if (callback) callback(animation);
        return this;
    }

    getAnimations(options?: GetAnimationsOptions) { return this.dom.getAnimations(options) }

    inViewport() {
        if (!this.inDOM()) return false;
        const {top, left, bottom, right} = this.dom.getBoundingClientRect();
        const DE = document.documentElement;
        return (top >= 0 && left >= 0 && bottom <= (window.innerHeight || DE.clientHeight) && right <= (window.innerWidth || DE.clientWidth))
    }
}

export type $DOMRect = Omit<DOMRect, 'toJSON'>;
export interface $ElementEventMap extends $NodeEventMap {}
export type $ElementAnimationPropertyIndexedKeyframes = PropertyIndexedKeyframes & {
    [property in keyof CSSStyleDeclaration]?: string | string[] | number | null | (number | null)[] | undefined;
};
export type $ElementAnimationKeyframe = Keyframe & {
    [property in keyof CSSStyleDeclaration]?: string | number | null | undefined;
};
export interface $ElementAnimationOptions<E extends $Element<any, any, any>> extends KeyframeAnimationOptions {
    onfinish?: ($ele: E, animation: Animation, ev: AnimationPlaybackEvent) => void;
    oncancel?: ($ele: E, animation: Animation, ev: AnimationPlaybackEvent) => void;
    onremove?: ($ele: E, animation: Animation, ev: AnimationPlaybackEvent) => void;
}