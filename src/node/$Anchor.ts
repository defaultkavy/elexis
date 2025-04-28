import { assign } from "../lib/assign";
import type { $StateArgument } from "../structure/$State";
import { $Container, type $ContainerOptions } from "./$Container";

export interface $AnchorOptions extends $ContainerOptions {}
export class $Anchor extends $Container<HTMLAnchorElement> {
    constructor(options?: Partial<$AnchorOptions>) {
        super('a', options);
        // Link Handler event
        this.dom.addEventListener('click', e => {
            if ($.anchorHandler && !!this.href()) {
                e.preventDefault();
                $.anchorHandler(this, e);
            }
        })
    }
}

assign($Anchor, {
    set: ['href', 'target']
})

export interface $Anchor {
    /**Set URL of anchor element. */
    href(): string;
    href(url: $StateArgument<string>): this;

    /**Link open with this window, new tab or other */
    target(): $AnchorTarget;
    target(target: $StateArgument<$AnchorTarget>): this;
}

export type $AnchorTarget = '_blank' | '_self' | '_parent' | '_top' | null;