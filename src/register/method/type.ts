declare module '../../core' {
    export namespace $ {
        export function type<T>(): T
    }
}

Object.assign($, {
    type<T>(): T { return undefined as T }
})