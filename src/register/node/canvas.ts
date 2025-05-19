import { $Canvas } from "#node/$Canvas"

declare module '../../core' {
    export namespace $ {
        export interface TagNameElementMap {
            'canvas': typeof $Canvas
        }
        export function resize(object: Blob, size: number): Promise<string>;
    }
}

$.registerTagName('canvas', $Canvas)