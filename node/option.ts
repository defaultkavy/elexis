import { $Option } from "../src/node/$Option";

declare module '../core' {
    export namespace $ {
        export interface TagNameElementMap {
            'option': typeof $Option
        }
    }
}

$.registerTagName('option', $Option)