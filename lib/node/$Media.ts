import { $State, $StateArgument } from "../$State";
import { $Element, $ElementOptions } from "./$Element";

export interface $MediaOptions extends $ElementOptions {}
export class $Media<H extends HTMLMediaElement> extends $Element<H> {
    constructor(tagname: string, options?: $MediaOptions) {
        super(tagname, options);
    }

    autoplay(): boolean;
    autoplay(autoplay: $StateArgument<boolean>): this;
    autoplay(autoplay?: $StateArgument<boolean>) { return $.fluent(this, arguments, () => this.dom.autoplay, () => $.set<HTMLMediaElement, 'autoplay'>(this.dom, 'autoplay', autoplay))}

    get buffered() { return this.dom.buffered }

    controls(): boolean;
    controls(controls: $StateArgument<boolean>): this;
    controls(controls?: $StateArgument<boolean>) { return $.fluent(this, arguments, () => this.dom.controls, () => $.set<HTMLMediaElement, 'controls'>(this.dom, 'controls', controls))}

    crossOrigin(): string | null;
    crossOrigin(crossOrigin: $StateArgument<string | null>): this;
    crossOrigin(crossOrigin?: $StateArgument<string | null>) { return $.fluent(this, arguments, () => this.dom.crossOrigin, () => $.set<HTMLMediaElement, 'crossOrigin'>(this.dom, 'crossOrigin', crossOrigin))}

    get currentSrc() { return this.dom.currentSrc };
    
    currentTime(): number;
    currentTime(currentTime: $StateArgument<number>): this;
    currentTime(currentTime?: $StateArgument<number>) { return $.fluent(this, arguments, () => this.dom.currentTime, () => $.set<HTMLMediaElement, 'currentTime'>(this.dom, 'currentTime', currentTime))}

    defaultMuted(): boolean;
    defaultMuted(defaultMuted: $StateArgument<boolean>): this;
    defaultMuted(defaultMuted?: $StateArgument<boolean>) { return $.fluent(this, arguments, () => this.dom.defaultMuted, () => $.set<HTMLMediaElement, 'defaultMuted'>(this.dom, 'defaultMuted', defaultMuted))}

    defaultPlaybackRate(): number;
    defaultPlaybackRate(defaultPlaybackRate: $StateArgument<number>): this;
    defaultPlaybackRate(defaultPlaybackRate?: $StateArgument<number>) { return $.fluent(this, arguments, () => this.dom.defaultPlaybackRate, () => $.set<HTMLMediaElement, 'defaultPlaybackRate'>(this.dom, 'defaultPlaybackRate', defaultPlaybackRate))}

    disableRemotePlayback(): boolean;
    disableRemotePlayback(disableRemotePlayback: $StateArgument<boolean>): this;
    disableRemotePlayback(disableRemotePlayback?: $StateArgument<boolean>) { return $.fluent(this, arguments, () => this.dom.disableRemotePlayback, () => $.set<HTMLMediaElement, 'disableRemotePlayback'>(this.dom, 'disableRemotePlayback', disableRemotePlayback))}

    get duration() { return this.dom.duration }
    get ended() { return this.dom.ended }
    get error() { return this.dom.error }
    
    loop(): boolean;
    loop(loop: $StateArgument<boolean>): this;
    loop(loop?: $StateArgument<boolean>) { return $.fluent(this, arguments, () => this.dom.loop, () => $.set<HTMLMediaElement, 'loop'>(this.dom, 'loop', loop))}
    
    mediaKeys(): MediaKeys | null;
    mediaKeys(mediaKeys: $StateArgument<[MediaKeys | null]>): this;
    mediaKeys(mediaKeys?: $StateArgument<[MediaKeys | null]>) { return $.fluent(this, arguments, () => this.dom.mediaKeys, () => $.set<HTMLMediaElement, 'setMediaKeys'>(this.dom, 'setMediaKeys', [mediaKeys]))}

    muted(): boolean;
    muted(muted: $StateArgument<boolean>): this;
    muted(muted?: $StateArgument<boolean>) { return $.fluent(this, arguments, () => this.dom.muted, () => $.set<HTMLMediaElement, 'muted'>(this.dom, 'muted', muted))}

    get networkState() { return this.dom.networkState }
    get paused() { return this.dom.paused }

    playbackRate(): number;
    playbackRate(playbackRate: $StateArgument<number>): this;
    playbackRate(playbackRate?: $StateArgument<number>) { return $.fluent(this, arguments, () => this.dom.playbackRate, () => $.set<HTMLMediaElement, 'playbackRate'>(this.dom, 'playbackRate', playbackRate))}

    get played() { return this.dom.played }
    
    preload(): this['dom']['preload'];
    preload(preload: $StateArgument<this['dom']['preload']>): this;
    preload(preload?: $StateArgument<this['dom']['preload']>) { return $.fluent(this, arguments, () => this.dom.preload, () => $.set<HTMLMediaElement, 'preload'>(this.dom, 'preload', preload))}

    preservesPitch(): boolean;
    preservesPitch(preservesPitch: $StateArgument<boolean>): this;
    preservesPitch(preservesPitch?: $StateArgument<boolean>) { return $.fluent(this, arguments, () => this.dom.preservesPitch, () => $.set<HTMLMediaElement, 'preservesPitch'>(this.dom, 'preservesPitch', preservesPitch))}

    get readyState() { return this.dom.readyState }
    get remote() { return this.dom.remote }
    get seekable() { return this.dom.seekable }
    get seeking() { return this.dom.seeking }
    
    sinkId(): string;
    sinkId(sinkId: $StateArgument<[string]>): this;
    sinkId(sinkId?: $StateArgument<[string]>) { return $.fluent(this, arguments, () => this.dom.sinkId, () => $.set<HTMLMediaElement, 'setSinkId'>(this.dom, 'setSinkId', [sinkId]))}

    src(): string;
    src(src: $StateArgument<string>): this;
    src(src?: $StateArgument<string>) { return $.fluent(this, arguments, () => this.dom.src, () => $.set<HTMLMediaElement, 'src'>(this.dom, 'src', src))}

    srcObject(): MediaProvider | null;
    srcObject(srcObject: $StateArgument<MediaProvider | null>): this;
    srcObject(srcObject?: $StateArgument<MediaProvider | null>) { return $.fluent(this, arguments, () => this.dom.srcObject, () => $.set<HTMLMediaElement, 'srcObject'>(this.dom, 'srcObject', srcObject))}

    get textTracks() { return this.dom.textTracks }
    
    volume(): number;
    volume(volume: $StateArgument<number>): this;
    volume(volume?: $StateArgument<number>) { return $.fluent(this, arguments, () => this.dom.volume, () => $.set<HTMLMediaElement, 'volume'>(this.dom, 'volume', volume))}

    addTextTrack(kind: TextTrackKind, label?: string, language?: string) { return this.dom.addTextTrack(kind, label, language)}
    canPlayType(type: string) { return this.dom.canPlayType(type) }
    fastSeek(time: number) { this.dom.fastSeek(time); return this }
    load() { this.dom.load(); return this }
    pause() { this.dom.pause(); return this }
    async play() { await this.dom.play(); return this}

    get isPlaying() { return this.currentTime() > 0 && !this.paused && !this.ended && this.readyState > 2 }
}