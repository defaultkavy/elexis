import { $Container } from "./$Container";
import { $Node } from "./$Node";
import { $Text } from "./$Text";
import { $State } from "./$State";

export class $NodeManager {
    #container: $Container;
    #dom: HTMLElement;
    elementList = new Set<$Node>
    constructor(container: $Container) {
        this.#container = container;
        this.#dom = this.#container.dom
    }

    add(element: $Node | string | $State<any>) {
        if (typeof element === 'string') {
            const text = new $Text(element);
            (text as Mutable<$Text>).parent = this.#container;
            this.elementList.add(text);
        } else if (element instanceof $State) {
            if (typeof element.value === 'string') {
                const ele = new $Text(element.value);
                element.contents.add(ele);
                (ele as Mutable<$Text>).parent = this.#container;
                this.elementList.add(ele);
            }
        } else {
            (element as Mutable<$Node>).parent = this.#container;
            this.elementList.add(element);
        }
    }

    remove(element: $Node) {
        if (!this.elementList.has(element)) return;
        this.elementList.delete(element);
        (element as Mutable<$Node>).parent = undefined;

    }

    removeAll() {
        this.elementList.forEach(ele => this.remove(ele))
    }

    render() {
        const [domList, nodeList] = [this.array.map(node => node.dom), Array.from(this.#dom.childNodes)];
        // Rearrange
        while (nodeList.length || domList.length) {
            const [node, dom] = [nodeList.at(0), domList.at(0)];
            if (!dom) { node?.remove(); nodeList.shift()} 
            else if (!node) { if (!dom.$.hidden) this.#dom.append(dom); domList.shift();}
            else if (dom !== node) { if (!dom.$.hidden) this.#dom.insertBefore(dom, node); domList.shift();}
            else {
                if (dom.$.hidden) this.#dom.removeChild(dom);
                domList.shift(); nodeList.shift();
            }
        }
    }

    get array() {return [...this.elementList.values()]};
}