import { $Element } from "./$Element";
import { $NodeManager } from "../structure/$NodeManager";
import { $Node } from "./$Node";
import { $State, $StateArgument } from "../structure/$State";
import { $Text } from "./$Text";
import { $HTMLElement, $HTMLElementEventMap, $HTMLElementOptions } from "./$HTMLElement";

export interface $ContainerOptions extends $HTMLElementOptions {}
export class $Container<H extends HTMLElement = HTMLElement, EM extends $ContainerEventMap = $ContainerEventMap> extends $HTMLElement<H, EM> {
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
    insert(children: $ContainerContentBuilder<this>, position = -1): this { return $.fluent(this, arguments, () => this, async () => {
        if (children instanceof Function) { // resolve function and promise
            let cache = children(this);
            if (cache instanceof Promise) children = await cache;
            else children = cache;
        } else if (children instanceof Promise) { children = await children }
        children = $.orArrayResolve(children);
        // Set position cursor depend negative or positive number, position will count from last index when position is negative.
        this.__position_cursor = position < 0 ? this.children.array.length + position : position;
        for (const child of children) {
            if (child === undefined || child === null) continue; // skip
            if (child instanceof Array) this.insert(child, this.__position_cursor); // insert element group at this position
            else if (typeof child === 'string') this.children.add(new $Text(child), position); // turn string into $Text element
            else if (child instanceof $State) {
                const ele = new $Text(child.toString()); // turn $State object into $Text element
                child.use(ele, 'content'); // bind $Text elelment and function name to $State
                this.children.add(ele, position);
            } 
            else if (child instanceof Promise) {
                const $Async = (await import('./$Async')).$Async; // import $Async avoid extends error
                const ele = new $Async().await(child) // using $Async.await resolve promise element
                this.children.add(ele, position); // insert $Async element at this position, leave a position for promised element
            }
            else this.children.add(child, position); // insert $Node element directly
            this.__position_cursor += 1; // increase position count
        }
        this.children.render(); // start to render dom tree
    })}

    /**Remove all children elemetn from this element */
    clear() {
        this.children.removeAll();
        return this;
    }

    $<E extends $Element = $Element>(query: `::${string}`): E[];
    $<E extends $Element = $Element>(query: `:${string}`): E | null;
    $(query: string) { 
        if (query.startsWith('::')) return Array.from(this.dom.querySelectorAll(query.replace(/^::/, ''))).map(dom => $(dom));
        else if (query.startsWith(':')) return $(this.dom.querySelector(query.replace(/^:/, '')));
    }

    get scrollHeight() { return this.dom.scrollHeight }
    get scrollWidth() { return this.dom.scrollWidth }
    
    scrollTop(): number;
    scrollTop(scrollTop: $StateArgument<number> | undefined): this
    scrollTop(scrollTop?: $StateArgument<number> | undefined) { return $.fluent(this, arguments, () => this.dom.scrollTop, () => $.set(this.dom, 'scrollTop', scrollTop as any))}
    
    scrollLeft(): number;
    scrollLeft(scrollLeft: $StateArgument<number> | undefined): this
    scrollLeft(scrollLeft?: $StateArgument<number> | undefined) { return $.fluent(this, arguments, () => this.dom.scrollLeft, () => $.set(this.dom, 'scrollLeft', scrollLeft as any))}
}

export type $ContainerContentBuilder<P extends $Container> = $ContainerContentGroup | (($node: P) => OrPromise<$ContainerContentGroup>)
export type $ContainerContentGroup = OrMatrix<OrPromise<$ContainerContentType>>
export type $ContainerContentType = $Node | string | undefined | $State<any> | null

export interface $ContainerEventMap extends $HTMLElementEventMap {}