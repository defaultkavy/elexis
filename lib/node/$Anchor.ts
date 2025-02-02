import { $StateArgument } from "../structure/$State";
import { $Container, $ContainerOptions } from "./$Container";

export interface $AnchorOptions extends $ContainerOptions {}
export class $Anchor extends $Container<HTMLAnchorElement> {
    constructor(options?: $AnchorOptions) {
        super('a', options);
        // Link Handler event
        this.dom.addEventListener('click', e => {
            if ($.anchorHandler && !!this.href()) {
                e.preventDefault();
                $.anchorHandler(this, e);
            }
        })
    }
    /**Set URL of anchor element. */
    href(): string;
    href(url: $StateArgument<string>): this;
    href(url?: $StateArgument<string>) { return $.fluent(this, arguments, () => this.dom.href, () => $.set(this.dom, 'href', url)) }
    /**Link open with this window, new tab or other */
    target(): $AnchorTarget | undefined;
    target(target: $AnchorTarget | undefined): this;
    target(target?: $AnchorTarget | undefined) { return $.fluent(this, arguments, () => (this.dom.target ?? undefined) as $AnchorTarget | undefined, () => {if (target) this.dom.target = target}) }
}

export type $AnchorTarget = '_blank' | '_self' | '_parent' | '_top';