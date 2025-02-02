export namespace $Util {
    export function orArrayResolve<T>(multable: OrArray<T>) {
        if (multable instanceof Array) return multable;
        else return [multable];
    }
    
    export function mixin(target: any, constructors: OrArray<any>) {
        orArrayResolve(constructors).forEach(constructor => {
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

    export function classlist(name: (string | undefined)[]) { return name.map(class_name => class_name?.split(' ').filter(n => n.length)).flat().detype(undefined); }

}