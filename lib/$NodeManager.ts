import { $Container } from "./$Container";
import { $Node } from "./$Node";
import { $Text } from "./$Text";

export class $NodeManager {
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
            (text as Mutable<$Text>).parent = this.#container;
            this.elementList.add(text);
        } else {
            (element as Mutable<$Node>).parent = this.#container;
            this.elementList.add(element);
        }
    }

    remove(element: $Node) {
        if (!this.elementList.has(element)) return this;
        this.elementList.delete(element);
        (element as Mutable<$Node>).parent = undefined;
        return this;
    }

    removeAll(render = true) {
        this.elementList.forEach(ele => this.remove(ele));
        if (render) this.render();
    }

    replace(target: $Node, replace: $Node) {
        const array = this.array.map(node => {
            if (node === target) return replace;
            else return node;
        })
        this.elementList.clear();
        array.forEach(node => this.elementList.add(node));
        (target as Mutable<$Node>).parent = undefined;
        (replace as Mutable<$Node>).parent = this.#container;
        return this;
    }

    render() {
        const [domList, nodeList] = [this.array.map(node => node.dom), Array.from(this.#dom.childNodes)];
        const appendedNodeList: Node[] = []; // appended node list
        // Rearrange
        while (nodeList.length || domList.length) { // while nodeList or domList has item
            const [node, dom] = [nodeList.at(0), domList.at(0)];
            if (!dom) { if (node && !appendedNodeList.includes(node)) node.remove(); nodeList.shift()} 
            else if (!node) { if (!dom.$.__hidden) this.#dom.append(dom); domList.shift();}
            else if (dom !== node) { 
                if (!dom.$.__hidden) { this.#dom.insertBefore(dom, node); appendedNodeList.push(dom) }
                domList.shift();
            }
            else {
                if (dom.$.__hidden) this.#dom.removeChild(dom);
                domList.shift(); nodeList.shift();
            }
        }
    }

    get array() {return [...this.elementList.values()]};
}