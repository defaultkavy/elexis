import { $State } from "../structure/$State";
import { type $ContainerContentType, type $ContainerOptions } from "./$Container";
import { $Element } from "./$Element";
import { $Node } from "./$Node";
import { $Text } from "./$Text";
export interface $AsyncNodeOptions extends $ContainerOptions {}
export class $Async<N extends $Node = $Node> extends $Element {
    #loaded: boolean = false;
    constructor(options?: Partial<$AsyncNodeOptions>) {
        super('async', options)
    }

    load<T extends $Node>($node: Promise<T | $ContainerContentType> | (($self: this) => Promise<T | $ContainerContentType>)) {
        if ($node instanceof Function) $node(this).then($node => this._loaded($node));
        else $node.then($node => this._loaded($node));
        return this as $Async<T>
    }

    protected _loaded($node: $ContainerContentType) {
        this.#loaded = true;
        if (typeof $node === 'string' || typeof $node === 'number' || typeof $node === 'boolean') this.replace(new $Text(`${$node}`));
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