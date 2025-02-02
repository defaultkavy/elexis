import { $Container } from "../node/$Container";
import { $Node } from "../node/$Node";

export class $NodeManager {
    readonly $container: $Container;
    readonly childList = new Set<$Node>
    constructor(container: $Container) {
        this.$container = container;
    }

    add(element: $Node, position = -1) {
        if (position === -1 || this.childList.size - 1 === position) {
            this.childList.add(element);
        } else {
            const children = [...this.childList]
            children.splice(position, 0, element);
            this.childList.clear();
            children.forEach(child => this.childList.add(child));
        }
        (element as Mutable<$Node>).parent = this.$container;
    }

    remove(element: $Node) {
        if (!this.childList.has(element)) return this;
        this.childList.delete(element);
        (element as Mutable<$Node>).parent = undefined;
        return this;
    }

    removeAll(render = true) {
        this.childList.forEach(ele => this.remove(ele));
        if (render) this.render();
    }

    replace(target: $Node, replace: $Node) {
        const array = this.array
        array.splice(array.indexOf(target), 1, replace);
        target.remove();
        this.childList.clear();
        array.forEach(node => this.childList.add(node));
        (replace as Mutable<$Node>).parent = this.$container;
        return this;
    }

    render() {
        const [domList, nodeList] = [this.array.map(node => node.dom), Array.from(this.dom.childNodes)];
        const appendedNodeList: Node[] = []; // appended node list
        // Rearrange
        while (nodeList.length || domList.length) { // while nodeList or domList has item
            const [node, dom] = [nodeList.at(0), domList.at(0)];
            if (!dom) { if (node && !appendedNodeList.includes(node)) node.remove(); nodeList.shift()} 
            else if (!node) { if (!dom.$.hide()) this.dom.append(dom); domList.shift();}
            else if (dom !== node) { 
                if (!dom.$.hide()) { this.dom.insertBefore(dom, node); appendedNodeList.push(dom) }
                domList.shift();
            }
            else {
                if (dom.$.hide()) this.dom.removeChild(dom);
                domList.shift(); nodeList.shift();
            }
        }
    }

    indexOf(target: $Node) {
        return this.array.indexOf(target);
    }

    get array() {return [...this.childList.values()]};

    get dom() {return this.$container.dom}
}