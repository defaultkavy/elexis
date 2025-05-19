import { $Anchor } from "#node/$Anchor";

declare module '../../core' {
    export namespace $ {
        export interface TagNameElementMap {
            'a': typeof $Anchor
        }
        export function resize(object: Blob, size: number): Promise<string>;
        export let anchorHandler: null | (($a: $Anchor, e: Event) => void);
    }
}

$.registerTagName('a', $Anchor)
Object.assign($, {
    anchorHandler: null
})