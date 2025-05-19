import type { $StateArgument } from "#structure/$State";
import { $Node } from "./$Node";

export class $Text extends $Node<Text> {
    dom: Text;
    constructor(data: string, dom = new Text(data)) {
        super();
        this.dom = dom;
        this.dom.$ = this;
    }

    content(): string;
    content(text: $StateArgument<string | null>): this;
    content(text?: $StateArgument<string | null>) { return $.fluent(this, arguments, () => this.dom.textContent, () => $.set(this.dom, 'textContent', text))}
}