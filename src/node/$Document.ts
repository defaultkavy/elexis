import { $Node } from "./$Node";
export class $Document extends $Node {
    dom: Node;
    constructor(document: Document) {
        super()
        this.dom = document;
        this.dom.$ = this;
    }

    static from(document: Document) {
        if (document.$ instanceof $Document) return document.$
        else return new $Document(document);
    }
}