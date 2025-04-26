import { $Input } from "../src/node/$Input"

declare module '../core' {
    export namespace $ {
        export interface TagNameElementMap {
            'input': typeof $Input
        }
        export function resize(object: Blob, size: number): Promise<string>;
    }
}

$.registerTagName('input', $Input)