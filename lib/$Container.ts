import { $Element, $ElementOptions } from "./$Element";
import { $ElementManager } from "./$ElementManager";
import { $Node } from "./$Node";

export interface $ContainerOptions extends $ElementOptions {}

export class $Container<H extends HTMLElement = HTMLElement> extends $Element<H> {
    readonly children: $ElementManager = new $ElementManager(this);
    constructor(tagname: string, options?: $ContainerOptions) {
        super(tagname, options)
    }

    /**Replace element to this element. 
     * @example Element.content([$('div')]) 
     * Element.content('Hello World')*/
    content(children: OrMatrix<$Node | string | undefined>): this { return $.fluent(this, arguments, () => this, () => {
        this.children.removeAll();
        this.insert(children);
    })}

    /**Insert element to this element */
    insert(children: OrMatrix<$Node | string | undefined>): this { return $.fluent(this, arguments, () => this, () => {
        children = $.multableResolve(children);
        for (const child of children) {
            if (child === undefined) return;
            if (child instanceof Array) this.insert(child)
            else this.children.add(child);
        }
        this.children.render();
    })}
}
