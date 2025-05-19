import { assign } from "#lib/assign";
import type { $StateArgument } from "#structure/$State";
import { $Container, type $ContainerOptions } from "./$Container";
export interface $DialogOptions extends $ContainerOptions {}
export class $Dialog extends $Container<HTMLDialogElement> {
    constructor(options?: Partial<$DialogOptions>) {
        super('dialog', options);
    }
}

assign($Dialog, {
    set: ['open', 'returnValue'],
    fn: ['close', 'show', 'showModal']
})

export interface $Dialog {

    open(): boolean;
    open(open: $StateArgument<boolean>): this;

    returnValue(): string;
    returnValue(returnValue: $StateArgument<string>): this;

    close(): this;
    show(): this;
    showModal(): this;
}