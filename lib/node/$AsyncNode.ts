import { $Node } from "./$Node";
export interface $AsyncNodeOptions {
    dom?: Node;
}
export class $AsyncNode<N extends $Node = $Node> extends $Node {
    dom: Node = document.createElement('async');
    loaded: boolean = false;
    constructor(options?: $AsyncNodeOptions) {
        super()
        this.dom.$ = this;
    }

    await<T extends $Node = $Node>($node: Promise<T>) {
        $node.then($node => this._loaded($node));
        return this as $AsyncNode<T>
    }

    protected _loaded($node: $Node) {
        this.loaded = true;
        this.replace($node)
        this.dom.dispatchEvent(new Event('load'))
    }
}