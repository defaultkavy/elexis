export interface $StateOption<T> {
    format: (value: T) => string;
}
export class $State<T> {
    readonly value: T;
    readonly attributes = new Map<Object, Set<string | number | symbol>>();
    options: Partial<$StateOption<T>> = {}
    constructor(value: T, options?: $StateOption<T>) {
        this.value = value;
        if (options) this.options = options;
    }
    set(value: T) {
        (this as Mutable<$State<T>>).value = value;
        for (const [node, attrList] of this.attributes.entries()) {
            for (const attr of attrList) {
                console.debug(node, attr)
                //@ts-expect-error
                if (node[attr] instanceof Function) {
                    //@ts-expect-error
                    if (this.options.format) node[attr](this.options.format(value))
                    //@ts-expect-error
                    else node[attr](value)
                }
                else if (attr in node) {
                    //@ts-expect-error
                    node[attr] = value
                }
            }
        }
    }

    toString(): string {
        if (this.options.format) return this.options.format(this.value);
        if (this.value instanceof Object) return JSON.stringify(this.toJSON());
        return `${this.value}`
    }

    use<O extends Object, K extends keyof O>(object: O, attrName: K) {
        const attrList = this.attributes.get(object)
        if (attrList) attrList.add(attrName);
        else this.attributes.set(object, new Set<string | number | symbol>().add(attrName))
    }

    toJSON(): Object {
        if (this.value instanceof $State) return this.value.toJSON();
        if (this.value instanceof Object) return $State.toJSON(this.value);
        else return this.toString();
    }

    static toJSON(object: Object): Object {
        const data = {};
        for (let [key, value] of Object.entries(object)) {
            if (value instanceof $State) value = value.toJSON();
            else if (value instanceof Object) $State.toJSON(value);
            Object.assign(data, {[key]: value})
        }
        return data;
    }
};

export type $StateArgument<T> = T | $State<T> | undefined;