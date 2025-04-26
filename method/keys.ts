import type { $EventTarget } from '../src/structure/$EventTarget';
import { $KeyboardManager } from '../src/structure/$KeyboardManager';

declare module '../core' {
    export namespace $ {
        export function keys($target: $EventTarget): $KeyboardManager;
    }
}

Object.assign($, {
    keys($target: $EventTarget) { return new $KeyboardManager($target) },
})