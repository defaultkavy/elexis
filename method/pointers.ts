import type { $Node } from '../src/node/$Node';
import { $PointerManager } from '../src/structure/$PointerManager';

declare module '../core' {
    export namespace $ {
        export function pointers($node: $Node): $PointerManager;
    }
}

Object.assign($, {
    pointers($node: $Node) { return new $PointerManager($node) }
})