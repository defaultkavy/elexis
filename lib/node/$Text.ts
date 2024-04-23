import { $Node } from "./$Node";

export class $Text extends $Node<Text> {
    dom: Text;
    constructor(data: string) {
        super();
        this.dom = new Text(data);
        this.dom.$ = this;
    }

    content(): string;
    content(text: string): this;
    content(text?: string) { return $.fluent(this, arguments, () => this.dom.textContent, () => $.set(this.dom, 'textContent', text))}
}