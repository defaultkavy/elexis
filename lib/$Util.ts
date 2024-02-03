import { $State } from "./$State";

export namespace $Util {
    export function fluent<T, A, V>(instance: T, args: IArguments, value: () => V, action: (...args: any[]) => void) {
        if (!args.length) return value();
        action();
        return instance;
    }
    
    export function multableResolve<T>(multable: OrArray<T>) {
        if (multable instanceof Array) return multable;
        else return [multable];
    }
    
    export function mixin(target: any, constructors: OrArray<any>) {
        multableResolve(constructors).forEach(constructor => {
            Object.getOwnPropertyNames(constructor.prototype).forEach(name => {
            if (name === 'constructor') return;
            Object.defineProperty(
                target.prototype,
                name,
                Object.getOwnPropertyDescriptor(constructor.prototype, name) || Object.create(null)
            )
            })
        })
        return target;
    }
    
    export function set<O, K extends keyof O>(object: O, key: K, value: any) {
        if (value !== undefined) object[key] = value;
    }
    
    export function state<T>(value: T) {
        return new $State<T>(value)
    }
}