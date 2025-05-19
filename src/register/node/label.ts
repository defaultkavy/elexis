import { $Label } from "#node/$Label";

declare module '../../core' {
    export namespace $ {
        export interface TagNameElementMap {
            'label': typeof $Label
        }
    }
}

$.registerTagName('label', $Label)