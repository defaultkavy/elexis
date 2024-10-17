import { $EventTarget } from "../$EventTarget";
import { $, $Element, $EventManager, $State, $HTMLElement, $Container } from "../../index";

export abstract class $Node<N extends Node = Node, $EM extends $NodeEventMap = $NodeEventMap, EM extends GlobalEventHandlersEventMap = GlobalEventHandlersEventMap> extends $EventTarget<$EM, EM> {
    abstract readonly dom: N;
    protected __$property__ = {
        hidden: false,
        coordinate: undefined as $NodeCoordinate | undefined
    }
    readonly parent?: $Container;

    hide(): boolean; 
    hide(hide?: boolean | $State<boolean>, render?: boolean): this; 
    hide(hide?: boolean | $State<boolean>, render = true) { return $.fluent(this, arguments, () => this.__$property__.hidden, () => {
        if (hide === undefined) return;
        if (hide instanceof $State) { this.__$property__.hidden = hide.value; hide.use(this, 'hide')}
        else this.__$property__.hidden = hide;
        if (render) this.parent?.children.render();
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
    coordinate(coordinate?: $NodeCoordinate) { return $.fluent(this, arguments, () => this.__$property__.coordinate, () => $.set(this.__$property__, 'coordinate', coordinate))}

    self(callback: OrArray<($node: this) => void>) { $.orArrayResolve(callback).forEach(fn => fn(this)); return this; }
    inDOM() { return document.contains(this.dom); }
    
    isElement(): this is $Element {
        if (this instanceof $Element) return true;
        else return false;
    }
    get element(): $Element | null { 
        if (this instanceof $Element) return this;
        else return null;
    }
    get htmlElement(): $HTMLElement | null {
        if (this instanceof $HTMLElement) return this;
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

type $HTMLElementEventMap<$N> = {
    [keys in keyof HTMLElementEventMap]: [event: HTMLElementEventMap[keys], $this: $N];
};