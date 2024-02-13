import { $Container, $ContainerOptions } from "./$Container";
export interface $DialogOptions extends $ContainerOptions {}
export class $Dialog extends $Container<HTMLDialogElement> {
    constructor(options?: $DialogOptions) {
        super('dialog', options);
    }

    open(): boolean;
    open(open?: boolean): this;
    open(open?: boolean) { return $.fluent(this, arguments, () => this.dom.open, () => $.set(this.dom, 'open', open)) }

    returnValue(): string;
    returnValue(returnValue?: string): this;
    returnValue(returnValue?: string) { return $.fluent(this, arguments, () => this.dom.returnValue, () => $.set(this.dom, 'returnValue', returnValue)) }

    close() { this.dom.close(); return this; }
    show() { this.dom.show(); return this; }
    showModal() { this.dom.showModal(); return this; }
}