import { $Element, $DOMRect } from "./$Element";
import { $Node } from "./$Node";
export class $Document extends $Node {
    dom: Node;
    constructor(document: Document) {
        super()
        this.dom = document;
        this.dom.$ = this;
    }

    domRect(target?: $Element | $DOMRect) {
        const this_rect: $DOMRect = {
            bottom: innerHeight,
            height: innerHeight,
            left: 0,
            right: innerWidth,
            top: 0,
            width: innerWidth,
            x: 0,
            y: 0
        };
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

    static from(document: Document) {
        if (document.$ instanceof $Document) return document.$
        else return new $Document(document);
    }
}