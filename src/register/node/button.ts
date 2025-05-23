import { $Button } from "#node/$Button";

declare module '../../core' {
    export namespace $ {
        export interface TagNameElementMap {
            'button': typeof $Button
        }
    }
}

$.registerTagName('button', $Button)