import { $Textarea } from "../src/node/$Textarea";

declare module '../core' {
    export namespace $ {
        export interface TagNameElementMap {
            'textarea': typeof $Textarea
        }
    }
}

$.registerTagName('textarea', $Textarea)