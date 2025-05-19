import { assign } from "#lib/assign";
import { _orArrayResolve } from "#lib/orArrayResolve";
import { $NodeManager } from "#structure/$NodeManager";
import { $Element, type $ElementEventMap, type $ElementOptions } from "./$Element"

export interface $SVGOptions extends $ElementOptions {}
export class $SVGElement<S extends SVGElement = SVGElement, EM extends $SVGElementEventMap = $SVGElementEventMap> extends $Element<S, EM> {
    readonly children: $NodeManager<this, $SVGElement> = new $NodeManager(this);
    constructor(tagname: string, options?: Partial<$SVGOptions>) {
        super(tagname, options);
    }

    content(children: OrMatrix<$SVGElement | null | undefined>) {
        this.children.removeAll();
        this.insert(children);
        return this;
    }

    insert(children: OrMatrix<$SVGElement | null | undefined>) {
        children = _orArrayResolve(children);
        for (const child of children) {
            if (!child) continue;
            if (child instanceof Array) {
                this.insert(child);
            } else {
                this.children.add(child);
            }
        }
        this.children.render();
        return this;
    }

    get ownerSVGElement() { return $(this.dom.ownerSVGElement) }
    get viewportElement() { return $(this.dom.viewportElement) }
}

assign($SVGElement, {
    set: ['autofocus', 'tabIndex'],
    fn: ['blur', 'focus']
})

export interface $SVGElement {
    autofocus(): boolean;
    autofocus(autofocus: boolean): this;

    tabIndex(): number;
    tabIndex(tabIndex: number): this;

    blur(): this;
    focus(options?: FocusOptions): this;
}

export interface $SVGElementEventMap extends $ElementEventMap {

}