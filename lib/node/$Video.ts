import { $StateArgument } from "../structure/$State";
import { $Media, $MediaOptions } from "./$Media";

export interface $VideoOptions extends $MediaOptions {}
export class $Video extends $Media<HTMLVideoElement> {
    constructor(options?: $VideoOptions) {
        super('video', options)
    }

    disablePictureInPicture(): boolean;
    disablePictureInPicture(disablePictureInPicture: $StateArgument<boolean>): this;
    disablePictureInPicture(disablePictureInPicture?: $StateArgument<boolean>) { return $.fluent(this, arguments, () => this.dom.disablePictureInPicture, () => $.set(this.dom, 'disablePictureInPicture', disablePictureInPicture))}
    
    height(): number;
    height(height: $StateArgument<number>): this;
    height(height?: $StateArgument<number>) { return $.fluent(this, arguments, () => this.dom.height, () => $.set(this.dom, 'height', height))}

    width(): number;
    width(width: $StateArgument<number>): this;
    width(width?: $StateArgument<number>) { return $.fluent(this, arguments, () => this.dom.width, () => $.set(this.dom, 'width', width))}

    playsInline(): boolean;
    playsInline(playsInline: $StateArgument<boolean>): this;
    playsInline(playsInline?: $StateArgument<boolean>) { return $.fluent(this, arguments, () => this.dom.playsInline, () => $.set(this.dom, 'playsInline', playsInline))}
    
    poster(): string;
    poster(poster: $StateArgument<string>): this;
    poster(poster?: $StateArgument<string>) { return $.fluent(this, arguments, () => this.dom.poster, () => $.set(this.dom, 'poster', poster))}

    get videoHeight() { return this.dom.videoHeight }
    get videoWidth() { return this.dom.videoWidth }

    cancelVideoFrameCallback(handle: number) { this.dom.cancelVideoFrameCallback(handle); return this }
    getVideoPlaybackQuality() { return this.dom.getVideoPlaybackQuality() }
    requestPictureInPicture() { return this.dom.requestPictureInPicture() }
    requestVideoFrameCallback(callback: VideoFrameRequestCallback) { return this.dom.requestVideoFrameCallback(callback) }
}