import { $Element, $ElementOptions } from "./$Element";
import { $NodeManager } from "../$NodeManager";
import { $Node } from "./$Node";
import { $State, $StateArgument } from "../$State";
import { $Text } from "./$Text";
import { $HTMLElement, $HTMLElementOptions } from "./$HTMLElement";

export interface $ContainerOptions extends $HTMLElementOptions {}
export class $Container<H extends HTMLElement = HTMLElement> extends $HTMLElement<H> {
    readonly children: $NodeManager = new $NodeManager(this);
    constructor(tagname: string, options?: $ContainerOptions) {
        super(tagname, options)
    }

    /**Replace element to this element. 
     * @example Element.content([$('div')]) 
     * Element.content('Hello World')*/
    content(children: $ContainerContentBuilder<this>): this { return $.fluent(this, arguments, () => this, () => {
        this.children.removeAll(false);
        this.insert(children);
    })}

    private __position_cursor = 0;
    /**Insert element to this element */
    insert(children: $ContainerContentBuilder<this>, position = -1): this { return $.fluent(this, arguments, () => this, () => {
        if (children instanceof Function) children = children(this);
        children = $.orArrayResolve(children);
        this.__position_cursor = position < 0 ? this.children.array.length + position : position;
        for (const child of children) {
            if (child === undefined || child === null) continue;
            if (child instanceof Array) this.insert(child, this.__position_cursor);
            else if (typeof child === 'string') this.children.add(new $Text(child), position);
            else if (child instanceof $State) {
                const ele = new $Text(child.toString());
                child.use(ele, 'content');
                this.children.add(ele, position);
            } else this.children.add(child, position);
            this.__position_cursor += 1;
        }
        this.children.render();
    })}

    /**Remove all children elemetn from this element */
    clear() {
        this.children.removeAll();
        return this;
    }

    //**Query selector one of child element */
    $<E extends $Element>(query: string): E | null { return $(this.dom.querySelector(query)) as E | null }

    //**Query selector of child elements */
    $all<E extends $Element>(query: string): E[] { return Array.from(this.dom.querySelectorAll(query)).map($dom => $($dom) as E) }

    get scrollHeight() { return this.dom.scrollHeight }
    get scrollWidth() { return this.dom.scrollWidth }
    
    scrollTop(): number;
    scrollTop(scrollTop: $StateArgument<number> | undefined): this
    scrollTop(scrollTop?: $StateArgument<number> | undefined) { return $.fluent(this, arguments, () => this.dom.scrollTop, () => $.set(this.dom, 'scrollTop', scrollTop as any))}
    
    scrollLeft(): number;
    scrollLeft(scrollLeft: $StateArgument<number> | undefined): this
    scrollLeft(scrollLeft?: $StateArgument<number> | undefined) { return $.fluent(this, arguments, () => this.dom.scrollLeft, () => $.set(this.dom, 'scrollLeft', scrollLeft as any))}
}

export type $ContainerContentBuilder<P extends $Container> = OrMatrix<$ContainerContentType> | (($node: P) => OrMatrix<$ContainerContentType>)
export type $ContainerContentType = $Node | string | undefined | $State<any> | null