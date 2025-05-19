import { _scrollTo } from "#lib/scrollTo";
import type { $Element } from "#node/$Element";

declare module '../../core' {
    export namespace $ {
        export function scrollTo($element: $Element | undefined, options?: {threshold?: number, behavior?: ScrollBehavior | undefined}): void;
    }
}

Object.assign($, {
    scrollTo($element: $Element | undefined, options?: {threshold?: number, behavior?: ScrollBehavior | undefined}) {
        return _scrollTo($element, options)
    }
})