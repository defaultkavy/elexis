import { $Container, $ContainerOptions } from "./$Container";
import { $Node } from "./$Node";
export interface $AsyncNodeOptions extends $ContainerOptions {}
export class $Async<N extends $Node = $Node> extends $Container {
    #loaded: boolean = false;
    constructor(options?: $AsyncNodeOptions) {
        super('async', options)
    }

    await<T extends $Node = $Node>($node: Promise<T>) {
        $node.then($node => this._loaded($node));
        return this as $Async<T>
    }

    protected _loaded($node: $Node) {
        this.#loaded = true;
        this.replace($node)
        this.dom.dispatchEvent(new Event('load'))
    }

    get loaded() { return this.#loaded }
}