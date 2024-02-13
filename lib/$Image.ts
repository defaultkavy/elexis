import { $Element, $ElementOptions } from "./$Element";
import { $State } from "./$State";
export interface $ImageOptions extends $ElementOptions {}
export class $Image extends $Element<HTMLImageElement> {
    constructor(options?: $ImageOptions) {
        super('img', options);
    }

    /**HTMLImageElement base property */
    alt(): string;
    alt(alt: string): this;
    alt(alt?: string) { return $.fluent(this, arguments, () => this.dom.alt, () => $.set(this.dom, 'alt', alt))}

    /**HTMLImageElement base property */
    crossOrigin(): string | null;
    crossOrigin(crossOrigin: string | null): this;
    crossOrigin(crossOrigin?: string | null) { return $.fluent(this, arguments, () => this.dom.crossOrigin, () => $.set(this.dom, 'crossOrigin', crossOrigin))}

    /**HTMLImageElement base property */
    decoding(): ImageDecoding;
    decoding(decoding: ImageDecoding): this;
    decoding(decoding?: ImageDecoding) { return $.fluent(this, arguments, () => this.dom.decoding, () => $.set(this.dom, 'decoding', decoding))}

    /**HTMLImageElement base property */
    height(): number;
    height(height: number): this;
    height(height?: number) { return $.fluent(this, arguments, () => this.dom.height, () => $.set(this.dom, 'height', height))}

    /**HTMLImageElement base property */
    isMap(): boolean;
    isMap(isMap: boolean): this;
    isMap(isMap?: boolean) { return $.fluent(this, arguments, () => this.dom.isMap, () => $.set(this.dom, 'isMap', isMap))}

    /**HTMLImageElement base property */
    loading(): ImageLoading;
    loading(loading: ImageLoading): this;
    loading(loading?: ImageLoading) { return $.fluent(this, arguments, () => this.dom.loading, () => $.set(this.dom, 'loading', loading))}

    /**HTMLImageElement base property */
    referrerPolicy(): string;
    referrerPolicy(referrerPolicy: string): this;
    referrerPolicy(referrerPolicy?: string) { return $.fluent(this, arguments, () => this.dom.referrerPolicy, () => $.set(this.dom, 'referrerPolicy', referrerPolicy))}

    /**HTMLImageElement base property */
    sizes(): string;
    sizes(sizes: string): this;
    sizes(sizes?: string) { return $.fluent(this, arguments, () => this.dom.sizes, () => $.set(this.dom, 'sizes', sizes))}

    /**HTMLImageElement base property */
    src(): string;
    src(src?: string | $State<string | undefined>): this;
    src(src?: string | $State<string | undefined>) { return $.fluent(this, arguments, () => this.dom.src, () => $.set(this.dom, 'src', src))}

    /**HTMLImageElement base property */
    srcset(): string;
    srcset(srcset: string): this;
    srcset(srcset?: string) { return $.fluent(this, arguments, () => this.dom.srcset, () => $.set(this.dom, 'srcset', srcset))}

    /**HTMLImageElement base property */
    useMap(): string;
    useMap(useMap: string): this;
    useMap(useMap?: string) { return $.fluent(this, arguments, () => this.dom.useMap, () => $.set(this.dom, 'useMap', useMap))}

    /**HTMLImageElement base property */
    width(): number;
    width(width: number): this;
    width(width?: number) { return $.fluent(this, arguments, () => this.dom.width, () => $.set(this.dom, 'width', width))}

    /**HTMLImageElement base method */
    decode() { return this.dom.decode() }

    /**HTMLImageElement base property */
    get complete() { return this.dom.complete }
    /**HTMLImageElement base property */
    get currentSrc() { return this.dom.currentSrc }
    /**HTMLImageElement base property */
    get naturalHeight() { return this.dom.naturalHeight }
    /**HTMLImageElement base property */
    get naturalWidth() { return this.dom.naturalWidth }
    /**HTMLImageElement base property */
    get x() { return this.dom.x }
    /**HTMLImageElement base property */
    get y() { return this.dom.y }

}