import { $Container } from "./$Container";

export abstract class $Node<N extends Node = Node> {
    readonly parent?: $Container;
    abstract readonly dom: N;
    constructor() {

    }

    on<K extends keyof HTMLElementEventMap>(type: K, callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean) { 
        this.dom.addEventListener(type, callback, options)
    }

    off<K extends keyof HTMLElementEventMap>(type: K, callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean) { 
        this.dom.removeEventListener(type, callback, options)
    }

    once<K extends keyof HTMLElementEventMap>(type: K, callback: (event: Event) => void, options?: AddEventListenerOptions | boolean) { 
        const onceFn = (event: Event) => {
            this.dom.removeEventListener(type, onceFn, options)
            callback(event);
        };
        this.dom.addEventListener(type, onceFn, options)
    }
}