export interface $StateOption<T> {
    format: (value: T) => string;
}
export class $State<T> {
    protected _value!: T | $State<T>;
    readonly attributes = new Map<Object, Set<string | number | symbol>>();
    readonly linkStates = new Set<$State<T>>;
    options: Partial<$StateOption<T>> = {}
    constructor(value: T, options?: $StateOption<T>) {
        this.set(value);
        if (options) this.options = options;
    }
    set(value: T | $State<T>) {
        this._value = value;
        if (value instanceof $State) value.linkStates.add(this as any);
        this.update();
        this.linkStates.forEach($state => $state.update());
    }

    protected update() {
        // update element content for eatch attributes
        for (const [node, attrList] of this.attributes.entries()) {
            for (const attr of attrList) {
                //@ts-expect-error
                if (node[attr] instanceof Function) {
                    //@ts-expect-error
                    if (this.options.format) node[attr](this.options.format(this.value))
                    //@ts-expect-error
                    else node[attr](this.value)
                }
                else if (attr in node) {
                    //@ts-expect-error
                    node[attr] = this.value
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

    get value(): T {
        return this._value instanceof $State ? this._value.value as T : this._value;
    }
};

export type $StateArgument<T> = $State<T> | undefined | (T extends (infer R)[] ? R : T);