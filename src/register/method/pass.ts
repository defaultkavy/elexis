declare module '../../core' {
    export namespace $ {
        export function pass(...args: any): true;
    }
}

Object.assign($, {
    pass(...args: any) { return true },
})