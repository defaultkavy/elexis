import { $Image } from "../src/node/$Image";

declare module '../core' {
    export namespace $ {
        export interface TagNameElementMap {
            'img': typeof $Image
        }
    }
}

$.registerTagName('img', $Image)