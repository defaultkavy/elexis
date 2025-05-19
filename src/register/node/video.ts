import { $Video } from "#node/$Video";

declare module '../../core' {
    export namespace $ {
        export interface TagNameElementMap {
            'video': typeof $Video
        }
    }
}

$.registerTagName('video', $Video)