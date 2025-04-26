import { $Video } from "../src/node/$Video";

declare module '../core' {
    export namespace $ {
        export interface TagNameElementMap {
            'video': typeof $Video
        }
    }
}

$.registerTagName('video', $Video)