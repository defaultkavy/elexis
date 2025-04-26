import { $OptionGroup } from "../src/node/$OptGroup";

declare module '../core' {
    export namespace $ {
        export interface TagNameElementMap {
            'optgroup': typeof $OptionGroup
        }
    }
}

$.registerTagName('optgroup', $OptionGroup)