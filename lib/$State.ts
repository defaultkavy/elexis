import { $Node } from "./$Node";

export class $State<T> {
    readonly value: T;
    readonly attributes = new Map<$Node, Set<string | number | symbol>>();
    constructor(value: T) {
        this.value = value;
    }
    set(value: T) {
        (this as Mutable<$State<T>>).value = value;
        for (const [node, attrList] of this.attributes.entries()) {
            for (const attr of attrList) {
                //@ts-expect-error
                if (node[attr] instanceof Function) node[attr](value)
            }
        }
    }

    toString(): string {
        return `${this.value}`
    }

    use<T extends $Node, K extends keyof T>($node: T, attrName: K) {
        const attrList = this.attributes.get($node)
        if (attrList) attrList.add(attrName);
        else this.attributes.set($node, new Set<string | number | symbol>().add(attrName))
    }
};