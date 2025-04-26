import { $EventTarget } from "../structure/$EventTarget";
import { $State } from "../structure/$State";
import type { $Element } from "./$Element";
import type { $HTMLElement } from "./$HTMLElement";
import type { $Container } from "./$Container";

export abstract class $Node<N extends Node = Node, $EM extends $NodeEventMap = $NodeEventMap, EM extends GlobalEventHandlersEventMap = GlobalEventHandlersEventMap> extends $EventTarget<$EM, EM> {
    abstract readonly dom: N;
    protected $data: any = {
        hidden: false,
        coordinate: undefined as $NodeCoordinate | undefined
    };
    readonly parent?: $Container;

    hide(): boolean; 
    hide(hide?: boolean | $State<boolean>, render?: boolean): this; 
    hide(hide?: boolean | $State<boolean>, render = true) { return $.fluent(this, arguments, () => this.$data.hidden, () => {
        if (hide === undefined) return;
        if (hide instanceof $State) { this.$data.hidden = hide.value(); hide.use(this, 'hide')}
        else if (this.$data.hidden !== hide) {
            this.$data.hidden = hide;
            if (render) this.parent?.children.render();
        }
        return this;
    })}

    /**Remove this element from parent */
    remove() {
        this.parent?.children.remove(this).render();
        return this;
    }

    /**Replace $Node with this element */
    replace($node: $Node) {
        this.parent?.children.replace(this, $node).render();
        return this;
    }

    contains(target: $Node | EventTarget | Node | null): boolean {
        if (!target) return false;
        if (target instanceof $Node) return this.dom.contains(target.dom);
        else if (target instanceof EventTarget) return this.dom.contains($(target).dom)
        else return this.dom.contains(target)
    }

    coordinate(): $NodeCoordinate | undefined;
    coordinate(coordinate: $NodeCoordinate): this;
    coordinate(coordinate?: $NodeCoordinate) { return $.fluent(this, arguments, () => this.$data.coordinate, () => $.set(this.$data, 'coordinate', coordinate))}

    use(callback: OrArray<($node: this) => void>) { $.orArrayResolve(callback).forEach(fn => fn(this)); return this; }
    inDOM() { return document.contains(this.dom); }

    await<T>(promise: Promise<T>, callback: ($node: this, result: T) => void): this {
        promise.then(result => callback(this, result));
        return this;
    }
    
    get element(): $Element | null { 
        if (this.dom instanceof Element) return this as unknown as $Element;
        else return null;
    }
    get htmlElement(): $HTMLElement | null {
        if (this.dom instanceof HTMLElement) return this as unknown as $HTMLElement;
        else return null;
    }
}

export interface $NodeCoordinate {
    x: number;
    y: number;
    height: number;
    width: number;
}

export interface $NodeEventMap {
}