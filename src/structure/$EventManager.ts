export class $EventManager<EM extends $EventMap> {
    private eventMap = new Map<string, Set<Function>>();
    //@ts-expect-error
    fire<K extends keyof EM>(type: K, ...args: EM[K]) {
        this.eventMap.get(type as string)?.forEach(fn => fn(...args as []));
        return this
    }
    //@ts-expect-error
    on<K extends keyof EM>(type: K, callback: (...args: EM[K]) => any) { 
        const set = this.eventMap.get(type as string) ?? this.eventMap.set(type as string, new Set()).get(type as string);
        set?.add(callback);
        return this
    }
    //@ts-expect-error
    off<K extends keyof EM>(type: K, callback: (...args: EM[K]) => any) {
        this.eventMap.get(type as string)?.delete(callback);
        return this
    }
    //@ts-expect-error
    once<K extends keyof EM>(type: K, callback: (...args: EM[K]) => any) {
        const onceFn = (...args: []) => {
            this.eventMap.get(type as string)?.delete(onceFn);
            //@ts-expect-error
            callback(...args);
        }
        const set = this.eventMap.get(type as string) ?? this.eventMap.set(type as string, new Set()).get(type as string)
        set?.add(onceFn);
        return this;
    }
}

export interface $EventMap {}