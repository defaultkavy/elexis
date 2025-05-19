import { assign } from "#lib/assign";
import { type $StateArgument } from "#structure/$State";
import { $Media, type $MediaOptions } from "./$Media";

export interface $VideoOptions extends $MediaOptions {}
export class $Video extends $Media<HTMLVideoElement> {
    constructor(options?: Partial<$VideoOptions>) {
        super('video', options)
    }
}

assign($Video, {
    set: ['disablePictureInPicture', 'height', 'width', 'playsinline', 'poster'],
    get: ['videoHeight', 'videoWidth'],
    fn: ['cancelVideoFrameCallback', 'getVideoPlaybackQuality', 'requestPictureInPicture', 'requestVideoFrameCallback']
})

export interface $Video {
    disablePictureInPicture(): boolean;
    disablePictureInPicture(disablePictureInPicture: $StateArgument<boolean>): this;
    
    height(): number;
    height(height: $StateArgument<number>): this;

    width(): number;
    width(width: $StateArgument<number>): this;

    playsInline(): boolean;
    playsInline(playsInline: $StateArgument<boolean>): this;
    
    poster(): string;
    poster(poster: $StateArgument<string>): this;

    get videoHeight(): number;
    get videoWidth(): number;

    cancelVideoFrameCallback(handle: number): this;
    getVideoPlaybackQuality(): VideoPlaybackQuality;
    requestPictureInPicture(): Promise<PictureInPictureWindow>;
    requestVideoFrameCallback(callback: VideoFrameRequestCallback): number;
}