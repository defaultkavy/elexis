import { $Element, $ElementOptions } from "./$Element";
import { $NodeManager } from "../$NodeManager";
import { $Node } from "./$Node";
import { $State } from "../$State";
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

    /**Insert element to this element */
    insert(children: $ContainerContentBuilder<this>): this { return $.fluent(this, arguments, () => this, () => {
        if (children instanceof Function) children = children(this);
        children = $.orArrayResolve(children);
        for (const child of children) {
            if (child === undefined) continue;
            if (child instanceof Array) this.insert(child)
            else if (child instanceof $State) {
                const ele = new $Text(child.toString());
                child.use(ele, 'content');
                this.children.add(ele);
            } else this.children.add(child);
        }
        this.children.render();
    })}

    /**Remove all children elemetn from this element */
    clear() {
        this.children.removeAll();
        return this;
    }

    //**Query selector one of child element */
    $<E extends $Element>(query: string) { return $(this.dom.querySelector(query)) as E | null }

    //**Query selector of child elements */
    $all<E extends $Element>(query: string) { return Array.from(this.dom.querySelectorAll(query)).map($dom => $($dom) as E) }
}

export type $ContainerContentBuilder<P extends $Container> = OrMatrix<$ContainerContentType> | (($node: P) => OrMatrix<$ContainerContentType>)
export type $ContainerContentType = $Node | string | undefined | $State<any>