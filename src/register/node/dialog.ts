import { $Dialog } from "#node/$Dialog";

declare module '../../core' {
    export namespace $ {
        export interface TagNameElementMap {
            'dialog': typeof $Dialog
        }
    }
}

$.registerTagName('dialog', $Dialog)