import { assign } from "../lib/assign";
import { _classList } from "../lib/classList";
import { $State, type $StateArgument, type $StateArgumentOptions } from "../structure/$State";
import { $Node, type $NodeEventMap } from "./$Node";
export interface $ElementOptions {
    id: string;
    class: string;
    dom: Element;
}
export class $Element<
    H extends Element = Element, 
    $EM extends $ElementEventMap = $ElementEventMap, 
    EM extends ElementEventMap & GlobalEventHandlersEventMap = ElementEventMap & GlobalEventHandlersEventMap,
    Options extends $ElementOptions = $ElementOptions
> extends $Node<H, $EM, EM> {
    readonly dom: H;
    // static class
    private SC = new Set<string>();
    // class list
    private CL: DOMTokenList;
    constructor(tagname: string, options?: Partial<$ElementOptions>) {
        super();
        this.dom = $Element.createDom(tagname, options) as H;
        this.dom.$ = this;
        this.CL = this.dom.classList;
        this.option(options);
    }

    private static createDom(tagname: string, options?: Partial<$ElementOptions>) {
        if (options?.dom) return options.dom;
        if (tagname === 'svg') return document.createElementNS("http://www.w3.org/2000/svg", "svg");
        return document.createElement(tagname);
    }

    option(options: Partial<$StateArgumentOptions<Omit<Options, 'dom'>>> | {[key: string]: $StateArgument<any>} | undefined) {
        if (options) {
            for (const [key, value] of Object.entries(options)) {
                if (value instanceof $State) {
                    value.use(this, 'attribute', [key, value]);
                    this.attribute(key, value.value());
                } else this.attribute(key, value);
            }
        }
        return this;
    }

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

    visible() {
        if (!this.inDOM()) return false;
        const {top, left, bottom, right} = this.dom.getBoundingClientRect();
        const DE = document.documentElement;
        return (top >= 0 && left >= 0 && bottom <= (window.innerHeight || DE.clientHeight) && right <= (window.innerWidth || DE.clientWidth))
    }
}
assign($Element, { set: ['id', 'innerHTML'], fn: ['getAnimations'] })

export interface $Element {
    /**Replace id of element. @example Element.id('customId');*/
    id(): string;
    id(name: $StateArgument<string>): this;
    id(name?: $StateArgument<string>): this | string;

    innerHTML(): string;
    innerHTML(html: $StateArgument<string>): this;

    getAnimations(options?: GetAnimationsOptions): Animation[];
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