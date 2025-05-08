import { $EventManager, type $EventMap } from "./$EventManager";

export abstract class $EventTarget<$EM extends $EventMap = $EventMap, EM extends GlobalEventHandlersEventMap = GlobalEventHandlersEventMap> {
    private domEvents: Partial<{[key in keyof EM]: Map<Function, Function>}> = {};
    readonly events = new $EventManager<$EM>();
    abstract dom: EventTarget

    //@ts-expect-error
    on<K extends keyof $EM>(type: OrArray<K>, callback: (...args: $EM[K]) => any): this;
    on<K extends keyof EM>(type: OrArray<K>, callback: (event: EM[K], $node: this) => any, options?: AddEventListenerOptions | boolean): this;
    on<K extends string>(type: OrArray<K>, callback: (event: Event, $node: this) => any, options?: AddEventListenerOptions | boolean): this;
    on<K extends keyof EM>(types: OrArray<K>, callback: (event: EM[K], $node: this) => any, options?: AddEventListenerOptions | boolean) { 
        types = $.orArrayResolve(types);
        for (const type of types) {
            if (!this.domEvents[type]) this.domEvents[type] = new Map()
            const handler = (e: Event) => { callback(e as EM[K], this); }
            this.domEvents[type].set(callback, handler);
            this.events.on(type as any, callback);
            this.dom.addEventListener(type as string, handler, options);
        }
        return this;
    }

    //@ts-expect-error
    off<K extends keyof $EM>(types: OrArray<K>, callback: (...args: $EM[K]) => any): this;
    off<K extends keyof EM>(types: OrArray<K>, callback: (event: EM[K], $node: this) => any, options?: AddEventListenerOptions | boolean): this;
    off<K extends string>(types: OrArray<K>, callback: (event: Event, $node: this) => any, options?: AddEventListenerOptions | boolean): this;
    off<K extends keyof EM>(types: OrArray<K>, callback: (event: EM[K], $node: this) => any, options?: AddEventListenerOptions | boolean) { 
        types = $.orArrayResolve(types);
        for (const type of types) {
            const middleCallback = this.domEvents[type]?.get(callback);
            if (middleCallback) this.dom.removeEventListener(type as string, middleCallback as EventListener, options);
            this.events.off(type as any, callback);
        }
        return this;
    }

    //@ts-expect-error
    once<K extends keyof $EM>(types: OrArray<K>, callback: (...args: $EM[K]) => any): this;
    once<K extends keyof EM>(types: OrArray<K>, callback: (event: EM[K], $node: this) => any, options?: AddEventListenerOptions | boolean): this;
    once<K extends string>(types: OrArray<K>, callback: (event: Event, $node: this) => any, options?: AddEventListenerOptions | boolean): this;
    once<K extends keyof EM>(types: OrArray<K>, callback: (event: EM[K], $node: this) => any, options?: AddEventListenerOptions | boolean) { 
        types = $.orArrayResolve(types);
        for (const type of types) {
            const onceFn = (event: Event) => {
                this.dom.removeEventListener(type as string, onceFn, options)
                callback(event as EM[K], this);
            };
            this.dom.addEventListener(type as string, onceFn, options);
            this.events.once(type as any, callback);
        }
        return this;
    }

    trigger(event: string) { this.dom.dispatchEvent(new Event(event)); return }
}