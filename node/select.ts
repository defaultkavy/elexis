import { $Select } from "../src/node/$Select";

declare module '../core' {
    export namespace $ {
        export interface TagNameElementMap {
            'select': typeof $Select
        }
    }
}

$.registerTagName('select', $Select)