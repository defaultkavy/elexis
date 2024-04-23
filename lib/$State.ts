import { $Node } from "./node/$Node";

export interface $StateOption<T> {
    format: (value: T) => string;
}
export class $State<T> {
    readonly value: T;
    readonly attributes = new Map<$Node, Set<string | number | symbol>>();
    options: Partial<$StateOption<T>> = {}
    constructor(value: T, options?: $StateOption<T>) {
        this.value = value;
        if (options) this.options = options;
    }
    set(value: T) {
        (this as Mutable<$State<T>>).value = value;
        for (const [node, attrList] of this.attributes.entries()) {
            for (const attr of attrList) {
                //@ts-expect-error
                if (node[attr] instanceof Function) {
                    //@ts-expect-error
                    if (this.options.format) node[attr](this.options.format(value))
                    //@ts-expect-error
                    else node[attr](value)
                }
            }
        }
    }

    toString(): string {
        if (this.options.format) return this.options.format(this.value);
        return `${this.value}`
    }

    use<T extends $Node, K extends keyof T>($node: T, attrName: K) {
        const attrList = this.attributes.get($node)
        if (attrList) attrList.add(attrName);
        else this.attributes.set($node, new Set<string | number | symbol>().add(attrName))
    }
};

export type $StateArgument<T> = T | $State<T | undefined>;