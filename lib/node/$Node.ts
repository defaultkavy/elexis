import { $, $Element, $State, $Text } from "../../index";
import { $Container } from "./$Container";

export abstract class $Node<N extends Node = Node> {
    abstract readonly dom: N;
    readonly __hidden: boolean = false;
    private domEvents: {[key: string]: Map<Function, Function>} = {};

    on<K extends keyof HTMLElementEventMap>(type: K, callback: (event: HTMLElementEventMap[K], $node: this) => any, options?: AddEventListenerOptions | boolean) { 
        if (!this.domEvents[type]) this.domEvents[type] = new Map()
        const middleCallback = (e: Event) => callback(e as HTMLElementEventMap[K], this);
        this.domEvents[type].set(callback, middleCallback)
        this.dom.addEventListener(type, middleCallback, options)
        return this;
    }

    off<K extends keyof HTMLElementEventMap>(type: K, callback: (event: HTMLElementEventMap[K], $node: this) => any, options?: AddEventListenerOptions | boolean) { 
        const middleCallback = this.domEvents[type]?.get(callback);
        if (middleCallback) this.dom.removeEventListener(type, middleCallback as EventListener, options)
        return this;
    }

    once<K extends keyof HTMLElementEventMap>(type: K, callback: (event: HTMLElementEventMap[K], $node: this) => any, options?: AddEventListenerOptions | boolean) { 
        const onceFn = (event: Event) => {
            this.dom.removeEventListener(type, onceFn, options)
            callback(event as HTMLElementEventMap[K], this);
        };
        this.dom.addEventListener(type, onceFn, options)
        return this;
    }

    hide(): boolean; 
    hide(hide?: boolean | $State<boolean>): this; 
    hide(hide?: boolean | $State<boolean>) { return $.fluent(this, arguments, () => this.__hidden, () => {
        if (hide === undefined) return;
        if (hide instanceof $State) { (this as Mutable<$Node>).__hidden = hide.value; hide.use(this, 'hide')}
        else (this as Mutable<$Node>).__hidden = hide; 
        this.parent?.children.render(); 
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

    self(callback: ($node: this) => void) { callback(this); return this; }
    inDOM() { return document.contains(this.dom); }
    isElement(): $Element | undefined {
        if (this instanceof $Element) return this;
        else return undefined;
    }

    get parent() {
        return this.dom.parentElement?.$ as $Container | undefined;
    }
}