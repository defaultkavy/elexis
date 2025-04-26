import { _orArrayResolve } from "./orArrayResolve";

export function mixin(target: any, constructors: OrArray<any>) {
    _orArrayResolve(constructors).forEach(constructor => {
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