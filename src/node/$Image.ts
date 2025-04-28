import { $HTMLElement, type $HTMLElementOptions } from "./$HTMLElement";
import type { $StateArgument } from "../structure/$State";
import { assign } from "../lib/assign";
export interface $ImageOptions extends $HTMLElementOptions {}
export class $Image extends $HTMLElement<HTMLImageElement> {
    constructor(options?: $ImageOptions) {
        super('img', options);
    }

    async load(src: Promise<string> | string): Promise<$Image> {
        return new Promise(resolve => {
            const $img = this.once('load', () => {
                resolve($img)
            })
            if (typeof src === 'string') $img.src(src);
            else src.then(src => $img.src(src));
        })
    }

    static resize(src: string | File, size: number | [number, number]): Promise<string> {
        return new Promise(resolve => {
            const img = new Image();
            img.addEventListener('load', () => {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                if (!context) throw '$Image.resize: context undefined';
                const ratio = img.width / img.height;
                const [landscape, portrait, square] = [ratio > 1, ratio < 1, ratio === 1];
                const w = size instanceof Array ? size[0] : portrait ? size : size * ratio;
                const h = size instanceof Array ? size[1] : landscape ? size : size / ratio;
                canvas.height = h; canvas.width = w;
                context.drawImage(img, 0, 0, w, h);
                resolve(canvas.toDataURL());
            }, {once: true})
            if (src instanceof File) {
                const fr = new FileReader()
                fr.addEventListener('load', () => img.src = fr.result as string)
                fr.readAsDataURL(src);
            } else img.src = src;
        })
    }

}

assign($Image, {
    set: ['alt', 'crossOrigin', 'decoding', 'height', 'isMap', 'loading', 'referrerPolicy', 'sizes', 'src', 'srcset', 'useMap', 'width'],
    fn: ['decode'],
    get: ['complete', 'currentSrc', 'naturalHeight', 'naturalWidth', 'x', 'y']
})

export interface $Image {
    alt(): string;
    alt(alt: string): this;

    crossOrigin(): string | null;
    crossOrigin(crossOrigin: string | null): this;

    decoding(): ImageDecoding;
    decoding(decoding: ImageDecoding): this;

    height(): number;
    height(height: number): this;

    isMap(): boolean;
    isMap(isMap: boolean): this;

    loading(): ImageLoading;
    loading(loading: ImageLoading): this;

    referrerPolicy(): string;
    referrerPolicy(referrerPolicy: string): this;

    sizes(): string;
    sizes(sizes: string): this;

    src(): string;
    src(src: $StateArgument<string>): this;

    srcset(): string;
    srcset(srcset: string): this;

    useMap(): string;
    useMap(useMap: string): this;

    width(): number;
    width(width: number): this;

    decode(): Promise<void>;

    get complete(): boolean;
    get currentSrc(): string;
    get naturalHeight(): number;
    get naturalWidth(): number;
    get x(): number;
    get y(): number;
}