import '#register/node/img';
import '#register/node/canvas';

declare module '../../core' {
    export namespace $ {
        export function resize(object: Blob, size: number): Promise<string>;
    }
}

Object.assign($, {
    resize(object: Blob, size: number): Promise<string> {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const $img = $('img');
                $img.once('load', e => {
                    const $canvas = $('canvas');
                    const context = $canvas.getContext('2d');
                    const ratio = $img.height() / $img.width();
                    const [w, h] = [
                        ratio > 1 ? size / ratio : size,
                        ratio > 1 ? size : size * ratio,
                    ]
                    $canvas.height(h).width(w);
                    context?.drawImage($img.dom, 0, 0, w, h);
                    resolve($canvas.toDataURL(object.type))
                })
                if (!e.target) throw "$.resize(): e.target is null";
                $img.src(e.target.result as string);
            }
            reader.readAsDataURL(object);
        })
    },
})