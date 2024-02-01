import { $Container } from "./$Container";
import { $Element } from "./$Element";
import { $Node } from "./$Node";
import { $Text } from "./$Text";

export class $ElementManager {
    #container: $Container;
    #dom: HTMLElement;
    elementList = new Set<$Node>
    constructor(container: $Container) {
        this.#container = container;
        this.#dom = this.#container.dom
    }

    add(element: $Node | string) {
        if (typeof element === 'string') {
            const text = new $Text(element);
            this.elementList.add(text);
        } else {
            this.elementList.add(element);
        }
    }

    remove(element: $Node) {
        this.elementList.delete(element);
    }

    removeAll() {
        this.elementList.clear();
    }

    render() {
        const [domList, nodeList] = [this.array.map(node => node.dom), Array.from(this.#dom.childNodes)];
        // Rearrange
        while (nodeList.length || domList.length) {
            const [node, dom] = [nodeList.at(0), domList.at(0)];
            if (!dom) { node?.remove(); nodeList.shift()} 
            else if (!node) { this.#dom.append(dom); domList.shift();}
            else if (dom !== node) { this.#dom.insertBefore(dom, node); domList.shift();}
            else {domList.shift(); nodeList.shift();}
        }
    }

    get array() {return [...this.elementList.values()]};
}