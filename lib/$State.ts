import { $EventManager, $EventMap } from "./$EventManager";

export interface $StateOption<T> {
    format: (value: T) => string;
}
export class $State<T> extends $EventManager<$StateEventMap<T>> {
    protected _value!: T | $State<T>;
    protected _convert?: (value: any) => T;
    readonly attributes = new Map<Object, Set<string | number | symbol>>();
    readonly linkStates = new Set<$State<T>>;
    options: Partial<$StateOption<T>> = {}
    constructor(value: T, options?: $StateOption<T>) {
        super();
        this.set(value);
        if (options) this.options = options;
    }
    set(value: T | $State<T>) {
        this._value = value;
        if (value instanceof $State) value.linkStates.add(this as any);
        this.update();
        this.linkStates.forEach($state => $state.update());
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
        this.fire('update', {state$: this})
    }

    use<O extends Object, K extends keyof O>(object: O, attrName: K) {
        const attrList = this.attributes.get(object)
        if (attrList) attrList.add(attrName);
        else this.attributes.set(object, new Set<string | number | symbol>().add(attrName))
    }

    convert<K>(fn: (value: T) => K) {
        const convert$ = new $State<K>(this as any);
        convert$._convert = fn;
        return convert$;
    }

    get value(): T {
        return this._value instanceof $State ? this._convert ? this._convert(this._value.value) : this._value.value : this._value;
    }

    toString(): string {
        if (this.options.format) return `${this.options.format(this.value)}`;
        if (this.value instanceof Object) return JSON.stringify(this.toJSON());
        return `${this.value}`
    }

    toJSON(): Object {
        if (this.value instanceof $State) return this.value.toJSON();
        if (this.value instanceof Object) return $State.toJSON(this.value);
        else return this.toString();
    }
};

export type $StateArgument<T> = $State<T> | $State<undefined | T> | undefined | (T extends (infer R)[] ? R : T);
export interface $StateEventMap<T> extends $EventMap {
    update: [{state$: $State<T>}]
}