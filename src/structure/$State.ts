import { uuidv7 } from "../lib/uuidv7";
import { $EventManager, type $EventMap } from "./$EventManager";

export interface $StateOption<T> {
    format: (value: T) => string;
}
export class $State<T = any> extends $EventManager<$StateEventMap<T>> {
    static cache = new Map<string, $State>();
    static templateMap = new Map<Object, { template: (string | $State)[], attribute: string | number | symbol }>();
    protected _value!: T | $State<T>;
    protected _convert?: (value: any) => T;
    readonly attributesMap = new Map<Object, Map<string | number | symbol, (this | any)[]>>();
    readonly linkStates = new Set<$State<T>>();
    readonly id: string;
    readonly options: Partial<$StateOption<T>> = {};
    private constructor(value: T, options?: $StateOption<T>) {
        super();
        this.id = uuidv7().str;
        $State.cache.set(this.id, this);
        this.value(value);
        if (options) this.options = options;
    }

    static create<T>(value: T, options?: $StateOption<T>): $State<T>;
    static create<T extends $State<any>, K extends T extends $State<infer A> ? A : never>(value: T, options?: $StateOption<K>): $State<K>;
    static create<T extends Object>(value: T, options?: $StateOption<T>): $StateObject<T>;
    static create<T>(value: T, options?: $StateOption<T extends $State<infer K> ? K : T>) {
        return new $State<T>(value, options as $StateOption<T>)
    }

    value(): T;
    value(value: T | $State<T> | ((state$: this) => T | $State<T>), config?: {excludeUpdate?: Object[], disableUpdate?: boolean, disableUpdateLink?: boolean}): this
    value(resolver?: T | $State<T> | ((state$: this) => T | $State<T>), config?: {excludeUpdate?: Object[], disableUpdate?: boolean, disableUpdateLink?: boolean}): this | T {
        if (!arguments.length) return this._value instanceof $State ? this._convert ? this._convert(this._value.value()) : this._value.value() : this._value;
        if (resolver === undefined) return this;
        if (resolver instanceof Function) return this.value(resolver(this));
        this._value = resolver;
        if (resolver instanceof $State) resolver.linkStates.add(this as any);
        else if (resolver instanceof Object) {
            const this_map = new Map(Object.entries(this))
            for (const [k, v] of Object.entries(resolver)) {
                const assigned_state =  this_map.get(`${k}$`);
                if (assigned_state instanceof $State) assigned_state.value(v);
                else Object.assign(this, {[`${k}$`]: $.state(v).on('change', state$ => {
                    Object.assign(this._value as Object, {[k]: state$._value})
                })});
            }
        }
        
        this.fire('change', this);
        if (!config?.disableUpdate) this.update(config?.excludeUpdate);
        if (!config?.disableUpdateLink) this.linkStates.forEach($state => $state.update(config?.excludeUpdate));
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

    protected update(exclude?: Object[]) {
        // update element content for eatch attributes
        for (const [node, attrList] of this.attributesMap.entries()) {
            if (exclude?.includes(node)) continue;
            for (const [name, argsTemplate] of attrList.entries()) {
                //@ts-expect-error
                if (node[name] instanceof Function) {
                    const args = argsTemplate.map(v => v === this ? this.options.format ? this.options.format(this.value()) : this.value() : v);
                    //@ts-expect-error
                    node[name](...args);
                }
                else if (name in node) {
                    //@ts-expect-error
                    node[name] = this.value()
                }
            }
        }
        this.fire('update', this)
    }

    use<O extends Object, K extends keyof O>(object: O, attrName: K, args: (this | any)[] = [this]) {
        const attrList = this.attributesMap.get(object) ?? new Map().set(attrName, args)
        this.attributesMap.set(object, attrList)
    }

    convert<K>(fn: (value: T) => K) {
        const convert$ = new $State<K>(this as any);
        convert$._convert = fn;
        return convert$;
    }

    /**
     * Return $State ID
     */
    toString(): string { return `$@$${this.id}$@$`; }

    toJSON(): Object {
        const value = this.value();
        if (value instanceof $State) return value.toJSON();
        if (value instanceof Object) return $State.toJSON(value);
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

    static set<O extends Object, K extends keyof O>(
        object: O, 
        key: K, 
        value: O[K] extends (...args: any) => any 
            ? (undefined | $StateParameter<Parameters<O[K]>>) 
            : (undefined | $StateArgument<O[K]>), 
        options?: {
            callback?: (value: O[K]) => void,
            stateHandler?: ($state: $State<O[K]>) => void
        }) {
            if (value === undefined) return;
            if (value instanceof $State) {
                value.use(object, key);
                const val = value.value();
                if (object[key] instanceof Function) (object[key] as Function)(...val)
                else if (val !== undefined) object[key] = val;
                options?.callback?.(val);
                options?.stateHandler?.(value);
                return;
            } else if (typeof value === 'string') {
                const template = $State.resolver(value);
                const stateList = template.filter(item => item instanceof $State);
                if (!stateList.length) { 
                    object[key] = value as any; 
                    options?.callback?.(value as any);
                    return 
                }
                $State.templateMap.set(object, { template, attribute: key });
                stateList.forEach(state$ => { state$.on('update', () => setTemplate()) })
                setTemplate();
                function setTemplate() {
                    const string = template.map(item => item instanceof $State ? item.value() : item).join('');
                    if (object[key] instanceof Function) object[key](...string)
                    else object[key] = string as any;
                    options?.callback?.(string as any);
                }
                return;
            } else {
                if (object[key] instanceof Function) (object[key] as Function)(...value as any);
                else object[key] = value as any;
                options?.callback?.(value as any);
                return;
            }
    }
};

export type $StateArgument<T> = $State<T> | (T extends any ? $State<T> : never) | $State<undefined | T> | undefined | T;
export type $StateArgumentOptions<T> = {
    [key in keyof T]: $StateArgument<T[key]>;
};
export type $StateParameter<T> = T extends [infer P, ...infer Rest] ? [$StateArgument<P>, ...$StateParameter<Rest>] : T;
export interface $StateEventMap<T> extends $EventMap {
    update: [state$: $State<T>],
    change: [state$: $State<T>]
}

export type $StateObject<T> = T extends string | number | undefined | null ? $State<T> : T extends boolean ? $State<boolean> :$State<T> & { [key in ObjectKeyExcludeFunctionValue<T> & string as `${key}$`]: $StateObject<T[key]> }

type ObjectKeyExcludeFunctionValue<T> = {[K in keyof T]-?: T[K] extends Function ? never : K}[keyof T]