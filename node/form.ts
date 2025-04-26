import { $Form } from "../src/node/$Form";

declare module '../core' {
    export namespace $ {
        export interface TagNameElementMap {
            'form': typeof $Form
        }
    }
}

$.registerTagName('form', $Form)