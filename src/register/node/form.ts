import { $Form } from "#node/$Form";

declare module '../../core' {
    export namespace $ {
        export interface TagNameElementMap {
            'form': typeof $Form
        }
    }
}

$.registerTagName('form', $Form)