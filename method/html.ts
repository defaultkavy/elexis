import type { $Element } from '../src/node/$Element';

declare module '../core' {
    export namespace $ {
        export function html(html: string): $Element[]
    }
}

Object.assign($, {
    html(html: string) {
        const body = new DOMParser().parseFromString(html, 'text/html').body;
        return Array.from(body.children).map(child => $(child))
    }
})