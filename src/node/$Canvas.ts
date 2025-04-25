import { $Container, type $ContainerOptions } from "./$Container";
export interface $CanvasOptions extends $ContainerOptions {}
export class $Canvas extends $Container<HTMLCanvasElement> {
    constructor(options?: $CanvasOptions) {
        super('canvas', options);
    }
    
    height(): number;
    height(height?: number): this;
    height(height?: number) { return $.fluent(this, arguments, () => this.dom.height, () => { $.set(this.dom, 'height', height)}) }
    
    width(): number;
    width(width?: number): this;
    width(width?: number) { return $.fluent(this, arguments, () => this.dom.width, () => { $.set(this.dom, 'width', width)}) }

    captureStream(frameRequestRate?: number) { return this.dom.captureStream(frameRequestRate) }
    
    getContext(contextId: "2d", options?: CanvasRenderingContext2DSettings): CanvasRenderingContext2D | null;
    getContext(contextId: "bitmaprenderer", options?: ImageBitmapRenderingContextSettings): ImageBitmapRenderingContext | null;
    getContext(contextId: "webgl", options?: WebGLContextAttributes): WebGLRenderingContext | null;
    getContext(contextId: "webgl2", options?: WebGLContextAttributes): WebGL2RenderingContext | null;
    getContext(contextId: string, options?: any): RenderingContext | null { return this.dom.getContext(contextId); }

    toBlob(callback: BlobCallback, type?: string, quality?: any) { this.dom.toBlob(callback, type, quality); return this;}

    toDataURL(type?: string, quality?: any) { return this.dom.toDataURL(type, quality) }

    transferControlToOffscreen() { return this.dom.transferControlToOffscreen() }
}