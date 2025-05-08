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
    set: ['href', 'target', 'download', 'hreflang', 'referrerPolicy', 'rel', 'relList', 'type']
})

export interface $Anchor {
    /**Set URL of anchor element. */
    href(): string;
    href(url: $StateArgument<string>): this;

    /**Link open with this window, new tab or other */
    target(): $AnchorTarget;
    target(target: $StateArgument<$AnchorTarget>): this;

    download(): string;
    download(url: $StateArgument<string>): this;

    hreflang(): keyof LanguageMap;
    hreflang(lang: keyof LanguageMap): this;

    ping(): string;
    ping(url: string): this;

    referrerPolicy(): ReferrerPolicy;
    referrerPolicy(policy: ReferrerPolicy): this;

    rel(): $AnchorRel;
    rel(rel: $AnchorRel): this;
    
    relList(): DOMTokenList;
    relList(value: $AnchorRel): this;

    type(): string;
    type(type: string): this;
}

export type $AnchorTarget = '_blank' | '_self' | '_parent' | '_top' | null;
export type $AnchorRel = 'alternate' | 'author' | 'bookmark' | 'external' | 'help' | 'license' | 'me' | 'next' | 'nofollow' | 'noopener' | 'noreferrer' | 'opener' | 'prev' | 'privacy-policy' | 'search' | 'tag' | 'terms-of-service';