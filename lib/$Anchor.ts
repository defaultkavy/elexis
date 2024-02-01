import { $Container, $ContainerOptions } from "./$Container";

export interface AnchorOptions extends $ContainerOptions {}

export class $Anchor extends $Container<HTMLAnchorElement> {
    constructor(options?: AnchorOptions) {
        super('a', options);
        // Link Handler event
        this.dom.addEventListener('click', e => {
            if ($.anchorPreventDefault) e.preventDefault();
            if ($.anchorHandler) $.anchorHandler(this.href(), e)
        })
    }
    /**Set URL of anchor element. */
    href(): URL;
    href(url: string | undefined): this;
    href(url?: string | undefined) { return $.fluent(this, arguments, () => new URL(this.dom.href), () => {if (url) this.dom.href = url}) }
    /**Link open with this window, new tab or other */
    target(): string;
    target(target: $AnchorTarget | undefined): this;
    target(target?: $AnchorTarget | undefined) { return $.fluent(this, arguments, () => this.dom.target, () => {if (target) this.dom.target = target}) }
}

export type $AnchorTarget = '_blank' | '_self' | '_parent' | '_top';