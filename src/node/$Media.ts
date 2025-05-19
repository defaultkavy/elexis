import { assign } from "#lib/assign";
import type { $StateArgument } from "#structure/$State";
import { type $ElementOptions } from "./$Element";
import { $HTMLElement } from "./$HTMLElement";

export interface $MediaOptions extends $ElementOptions {}
export class $Media<H extends HTMLMediaElement> extends $HTMLElement<H> {
    constructor(tagname: string, options?: Partial<$MediaOptions>) {
        super(tagname, options);
    }

    sinkId(): string;
    sinkId(sinkId: $StateArgument<string>): this;
    sinkId(sinkId?: $StateArgument<string>) { return $.fluent(this, arguments, () => this.dom.sinkId, () => $.set<HTMLMediaElement, 'setSinkId'>(this.dom, 'setSinkId', [sinkId]))}

    get isPlaying() { return this.currentTime() > 0 && !this.paused && !this.ended && this.readyState > 2 }
}

assign($Media, {
    set: ['autoplay', 'controls', 'crossOrigin', 'currentTime', 'defaultMuted', 'defaultPlaybackRate', 'loop', 'mediaKeys', 'muted', 'playbackRate', 'preload', 'preservesPitch', 'sinkId', 'src', 'srcObject', 'volume'],
    fn: ['addTextTrack', 'canPlayType', 'fastSeek', 'load', 'pause', 'play'],
    get: ['buffered', 'currentSrc', 'duration', 'ended', 'error', 'networkState', 'paused', 'readyState', 'remote', 'seekable', 'seeking', 'textTracks']
})

export interface $Media<H extends HTMLMediaElement> {
    autoplay(): boolean;
    autoplay(autoplay: $StateArgument<boolean>): this;

    get buffered(): TimeRanges

    controls(): boolean;
    controls(controls: $StateArgument<boolean>): this;

    crossOrigin(): string | null;
    crossOrigin(crossOrigin: $StateArgument<string | null>): this;

    get currentSrc(): string;
    
    currentTime(): number;
    currentTime(currentTime: $StateArgument<number>): this;

    defaultMuted(): boolean;
    defaultMuted(defaultMuted: $StateArgument<boolean>): this;

    defaultPlaybackRate(): number;
    defaultPlaybackRate(defaultPlaybackRate: $StateArgument<number>): this;

    disableRemotePlayback(): boolean;
    disableRemotePlayback(disableRemotePlayback: $StateArgument<boolean>): this;

    get duration(): number;
    get ended(): boolean;
    get error(): MediaError | null;
    
    loop(): boolean;
    loop(loop: $StateArgument<boolean>): this;
    
    mediaKeys(): MediaKeys | null;
    mediaKeys(mediaKeys: $StateArgument<[MediaKeys | null]>): this;

    muted(): boolean;
    muted(muted: $StateArgument<boolean>): this;

    get networkState(): number;
    get paused(): boolean;

    playbackRate(): number;
    playbackRate(playbackRate: $StateArgument<number>): this;

    get played(): TimeRanges;
    
    preload(): this['dom']['preload'];
    preload(preload: $StateArgument<this['dom']['preload']>): this;

    preservesPitch(): boolean;
    preservesPitch(preservesPitch: $StateArgument<boolean>): this;

    get readyState(): number;
    get remote(): RemotePlayback;
    get seekable(): TimeRanges;
    get seeking(): boolean;

    src(): string;
    src(src: $StateArgument<string>): this;

    srcObject(): MediaProvider | null;
    srcObject(srcObject: $StateArgument<MediaProvider | null>): this;

    get textTracks(): TextTrackList;
    
    volume(): number;
    volume(volume: $StateArgument<number>): this;

    addTextTrack(kind: TextTrackKind, label?: string, language?: string): TextTrack;
    canPlayType(type: string): CanPlayTypeResult;
    fastSeek(time: number): this;
    load(): this;
    pause(): this;
    play(): Promise<this>;
}