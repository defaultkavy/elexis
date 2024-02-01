export function EventMethod<T>(target: T) {return $.mixin(target, $EventMethod)}
export abstract class $EventMethod<EM> {
    abstract events: $EventManager<EM>;
    //@ts-expect-error
    on<K extends keyof EM>(type: K, callback: (...args: EM[K]) => void) { this.events.on(type, callback); return this }
    //@ts-expect-error
    off<K extends keyof EM>(type: K, callback: (...args: EM[K]) => void) { this.events.off(type, callback); return this }
    //@ts-expect-error
    once<K extends keyof EM>(type: K, callback: (...args: EM[K]) => void) { this.events.once(type, callback); return this }
}
export class $EventManager<EM> {
    private eventMap = new Map<string, $Event>();
    register(...names: string[]) { 
        names.forEach(name => {
            const event = new $Event(name);
            this.eventMap.set(event.name, event);
        })
        return this;
    }
    delete(name: string) { this.eventMap.delete(name); return this }
    //@ts-expect-error
    fire<K extends keyof EM>(type: K, ...args: EM[K]) {
        const event = this.get(type)
        //@ts-expect-error
        if (event instanceof $Event) event.fire(...args);
        return this
    }
    //@ts-expect-error
    on<K extends keyof EM>(type: K, callback: (...args: EM[K]) => void) { 
        this.get(type).add(callback);
        return this
    }
    //@ts-expect-error
    off<K extends keyof EM>(type: K, callback: (...args: EM[K]) => void) {
        this.get(type).delete(callback);
        return this
    }
    //@ts-expect-error
    once<K extends keyof EM>(type: K, callback: (...args: EM[K]) => void) {
        //@ts-expect-error
        const onceFn = (...args: EM[K]) => {
            this.get(type).delete(onceFn);
            //@ts-expect-error
            callback(...args);
        }
        this.get(type).add(onceFn);
        return this;
    }

    get<K extends keyof EM>(type: K) {
        //@ts-expect-error
        const event = this.eventMap.get(type);
        if (!event) throw new Error('EVENT NOT EXIST')
        return event;
    }
}
export class $Event {
    name: string;
    private callbackList = new Set<Function>()
    constructor(name: string) {
        this.name = name;
    }
    fire(...args: any[]) { this.callbackList.forEach(callback => callback(...args)) }
    add(callback: Function) { this.callbackList.add(callback) }
    delete(callback: Function) { this.callbackList.delete(callback) }
}