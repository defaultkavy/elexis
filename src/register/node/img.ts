import { $Image } from "#node/$Image";

declare module '../../core' {
    export namespace $ {
        export interface TagNameElementMap {
            'img': typeof $Image
        }
    }
}

$.registerTagName('img', $Image)