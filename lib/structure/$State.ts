import { $EventManager, $EventMap } from "./$EventManager";
import { $Util } from "./$Util";

export interface $StateOption<T> {
    format: (value: T) => string;
}
export class $State<T = any> extends $EventManager<$StateEventMap<T>> {
    static cache = new Map<string, $State>();
    static templateMap = new Map<Object, { template: (string | $State)[], attribute: string | number | symbol }>();
    protected _value!: T | $State<T>;
    protected _convert?: (value: any) => T;
    readonly attributes = new Map<Object, Set<string | number | symbol>>();
    readonly linkStates = new Set<$State<T>>();
    readonly id: string;
    readonly options: Partial<$StateOption<T>> = {};
    private constructor(value: T, options?: $StateOption<T>) {
        super();
        this.id = $Util.uuidv7().str;
        $State.cache.set(this.id, this);
        this.set(value);
        if (options) this.options = options;
    }

    static create<T>(value: T, options?: $StateOption<T>): $State<T>;
    static create<T extends $State<any>, K extends T extends $State<infer A> ? A : never>(value: T, options?: $StateOption<K>): $State<K>;
    static create<T extends Object>(value: T, options?: $StateOption<T>): $StateObject<T>;
    static create<T>(value: T, options?: $StateOption<T extends $State<infer K> ? K : T>) {
        return new $State<T>(value, options as $StateOption<T>)
    }

    set(value: T | $State<T> | ((state$: this) => T | $State<T>), config?: {disableUpdate?: boolean, disableUpdateLink?: boolean}): this {
        if (value instanceof Function) return this.set(value(this));
        this._value = value;
        if (value instanceof $State) value.linkStates.add(this as any);
        else if (value instanceof Object) {
            const this_map = new Map(Object.entries(this))
            for (const [k, v] of Object.entries(value)) {
                const assigned_state =  this_map.get(`${k}$`);
                if (assigned_state instanceof $State) assigned_state.set(v);
                else Object.assign(this, {[`${k}$`]: $.state(v).on('change', state$ => {
                    Object.assign(this._value as Object, {[k]: state$._value})
                })});
            }
        }
        
        this.fire('change', this)
        if (!config?.disableUpdate) this.update();
        if (!config?.disableUpdateLink) this.linkStates.forEach($state => $state.update());
        return this;
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
        this.fire('update', this)
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

    /**
     * Return $State ID
     */
    toString(): string { return `$@$${this.id}$@$`; }

    toJSON(): Object {
        if (this.value instanceof $State) return this.value.toJSON();
        if (this.value instanceof Object) return $State.toJSON(this.value);
        else return this.toString();
    }

    isType(): T extends null | undefined ? null : $StateObject<T> {
        //@ts-expect-error
        if (this._value === null || this._value === undefined) return null;
        //@ts-expect-error
        return this;
    }

    static resolver(txt: string) {
        const result = [];
        let cursor = 0;
        for (const match of txt.matchAll(/\$@\$(.+?)\$@\$/g)) {
            const stateId = match.at(1);
            if (!stateId) continue;
            const state$ = this.cache.get(stateId);
            if (!state$) continue;
            result.push(txt.slice(cursor, match.index), state$)
            cursor = match.index + match[0].length;
        }
        result.push(txt.slice(cursor));
        return result.filter(content => content !== '');
    }
};

export type $StateArgument<T> = $State<T> | $State<undefined | T> | undefined | (T extends (infer R)[] ? R : T);
export interface $StateEventMap<T> extends $EventMap {
    update: [state$: $State<T>],
    change: [state$: $State<T>]
}

export type $StateObject<T> = T extends string | number | undefined | null ? $State<T> : T extends boolean ? $State<boolean> :$State<T> & { [key in ObjectKeyExcludeFunctionValue<T> & string as `${key}$`]: $StateObject<T[key]> }

type ObjectKeyExcludeFunctionValue<T> = {[K in keyof T]-?: T[K] extends Function ? never : K}[keyof T]