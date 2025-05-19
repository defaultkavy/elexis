import type { $EventTarget } from '#structure/$EventTarget';
import { $KeyboardManager } from '#structure/$KeyboardManager';

declare module '../../core' {
    export namespace $ {
        export function keys($target: $EventTarget): $KeyboardManager;
    }
}

Object.assign($, {
    keys($target: $EventTarget) { return new $KeyboardManager($target) },
})