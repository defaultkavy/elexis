import { mixin } from '#lib/mixin';

declare module '../../core' {
    export namespace $ {
        export function mixin(target: any, constructors: OrArray<any>): any;
    }
}

Object.assign($, {
    mixin(target: any, constructors: OrArray<any>) { return mixin(target, constructors) }
})