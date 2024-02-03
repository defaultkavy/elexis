import { $Text } from "../index";
import { $Container } from "./$Container";

export abstract class $Node<N extends Node = Node> {
    readonly parent?: $Container;
    abstract readonly dom: N;
    readonly hidden: boolean = false;
    private domEvents: {[key: string]: Map<Function, Function>} = {};

    on<K extends keyof HTMLElementEventMap>(type: K, callback: (event: Event, $node: this) => void, options?: AddEventListenerOptions | boolean) { 
        if (!this.domEvents[type]) this.domEvents[type] = new Map()
        const middleCallback = (e: Event) => callback(e, this);
        this.domEvents[type].set(callback, middleCallback)
        this.dom.addEventListener(type, middleCallback, options)
        return this;
    }

    off<K extends keyof HTMLElementEventMap>(type: K, callback: (event: Event, $node: this) => void, options?: AddEventListenerOptions | boolean) { 
        const middleCallback = this.domEvents[type]?.get(callback);
        if (middleCallback) this.dom.removeEventListener(type, middleCallback as EventListener, options)
        return this;
    }

    once<K extends keyof HTMLElementEventMap>(type: K, callback: (event: Event, $node: this) => void, options?: AddEventListenerOptions | boolean) { 
        const onceFn = (event: Event) => {
            this.dom.removeEventListener(type, onceFn, options)
            callback(event, this);
        };
        this.dom.addEventListener(type, onceFn, options)
        return this;
    }

    show() { (this as Mutable<$Node>).hidden = false; this.parent?.children.render(); return this; }
    hide() { 
        (this as Mutable<$Node>).hidden = true; 
        this.parent?.children.render(); 
        return this;
    }

    contains(target: $Node | EventTarget | Node) {
        if (target instanceof $Node) return this.dom.contains(target.dom);
        else if (target instanceof EventTarget) return this.dom.contains($(target).dom)
        else return this.dom.contains(target)
    }

    static from(element: HTMLElement | Text): $Node {
        if (element.$) return element.$;
        else if (element instanceof HTMLElement) {
            const node = $(element.tagName) as Mutable<$Node>;
            node.dom = element;
            if (element.parentElement) node.parent = $(element.parentElement) as $Container;
            return node as $Node;
        }
        else if (element instanceof Text) {
            const node = new $Text(element.textContent ?? '') as Mutable<$Node>;
            node.dom = element;
            if (element.parentElement) node.parent = $(element.parentElement) as $Container;
            return node as $Node;
        }
        throw '$NODE.FROM: NOT SUPPORT TARGET ELEMENT TYPE'
    }
}