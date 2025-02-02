import { $State } from "../structure/$State";
import { $Container, $ContainerContentType, $ContainerOptions } from "./$Container";
import { $Node } from "./$Node";
import { $Text } from "./$Text";
export interface $AsyncNodeOptions extends $ContainerOptions {}
export class $Async<N extends $Node = $Node> extends $Container {
    #loaded: boolean = false;
    constructor(options?: $AsyncNodeOptions) {
        super('async', options)
    }

    await<T extends $Node>($node: Promise<T | $ContainerContentType> | (($self: this) => Promise<T | $ContainerContentType>)) {
        if ($node instanceof Function) $node(this).then($node => this._loaded($node));
        else $node.then($node => this._loaded($node));
        return this as $Async<T>
    }

    protected _loaded($node: $ContainerContentType) {
        this.#loaded = true;
        if (typeof $node === 'string') this.replace(new $Text($node));
        else if ($node instanceof $State) {
            const ele = new $Text($node.toString());
            $node.use(ele, 'content');
            this.replace(ele);
        } 
        else if ($node === null || $node === undefined) this.replace(new $Text(String($node)));
        else this.replace($node)
        this.dom.dispatchEvent(new Event('load'))
    }

    get loaded() { return this.#loaded }
}