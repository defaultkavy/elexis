import { assign } from "#lib/assign";
import type { $StateArgument } from "#structure/$State";
import { $Container, type $ContainerOptions } from "./$Container";
export interface $CanvasOptions extends $ContainerOptions {}
export class $Canvas extends $Container<HTMLCanvasElement> {
    constructor(options?: Partial<$CanvasOptions>) {
        super('canvas', options);
    }
}

assign($Canvas, {
    set: ['height', 'width'],
    fn: ['captureStream', 'getContext', 'toBlob', 'toDataURL', 'transferControlToOffScreen']
})

export interface $Canvas {
    height(): number;
    height(height?: $StateArgument<number>): this;
    
    width(): number;
    width(width?: $StateArgument<number>): this;

    captureStream(frameRequestRate?: number): MediaStream
    
    getContext(contextId: "2d", options?: CanvasRenderingContext2DSettings): CanvasRenderingContext2D | null;
    getContext(contextId: "bitmaprenderer", options?: ImageBitmapRenderingContextSettings): ImageBitmapRenderingContext | null;
    getContext(contextId: "webgl", options?: WebGLContextAttributes): WebGLRenderingContext | null;
    getContext(contextId: "webgl2", options?: WebGLContextAttributes): WebGL2RenderingContext | null;

    toBlob(callback: BlobCallback, type?: string, quality?: any): this

    toDataURL(type?: string, quality?: any): string

    transferControlToOffscreen(): OffscreenCanvas
}