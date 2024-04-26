import { $State, $StateArgument, $StateOption } from "./index";
import { $Node } from "./lib/node/$Node"
import { $Document } from "./lib/node/$Document"
import { $Anchor } from "./lib/node/$Anchor";
import { $Button } from "./lib/node/$Button";
import { $Form } from "./lib/node/$Form";
import { $Input } from "./lib/node/$Input";
import { $Container } from "./lib/node/$Container";
import { $Element } from "./lib/node/$Element";
import { $Label } from "./lib/node/$Label";
import { $Image } from "./lib/node/$Image";
import { $Canvas } from "./lib/node/$Canvas";
import { $Dialog } from "./lib/node/$Dialog";
import { $View } from "./lib/node/$View";
import { $Select } from "./lib/node/$Select";
import { $Option } from "./lib/node/$Option";
import { $OptGroup } from "./lib/node/$OptGroup";
import { $Textarea } from "./lib/node/$Textarea";
import { $Util } from "./lib/$Util";
import { $HTMLElement } from "./lib/node/$HTMLElement";
import { $Async } from "./lib/node/$Async";

export type $ = typeof $;
export function $<E extends $Element = $Element>(query: `::${string}`): E[];
export function $<E extends $Element = $Element>(query: `:${string}`): E | null;
export function $(element: null): null;
export function $<K extends keyof $.TagNameTypeMap>(resolver: K): $.TagNameTypeMap[K];
export function $<K extends string>(resolver: K): $Container;
export function $<H extends HTMLElement>(htmlElement: H): $.$HTMLElementMap<H>;
export function $<H extends Element>(element: H): $Element;
export function $<N extends $Node>(node: N): N;
export function $<H extends EventTarget>(element: H): $Element;
export function $(element: null | HTMLElement | EventTarget): $Element | null;
export function $(element: undefined): undefined;
export function $(resolver: any) {
    if (typeof resolver === 'undefined') return resolver;
    if (resolver === null) return resolver;
    if (resolver instanceof $Node) return resolver;
    if (typeof resolver === 'string') {
        if (resolver.startsWith('::')) return Array.from(document.querySelectorAll(resolver.replace(/^::/, ''))).map(dom => $(dom));
        else if (resolver.startsWith(':')) return $(document.querySelector(resolver.replace(/^:/, '')));
        else if (resolver in $.TagNameElementMap) {
            const instance = $.TagNameElementMap[resolver as keyof $.TagNameElementMap]
            if (instance === $HTMLElement) return new $HTMLElement(resolver);
            if (instance === $Container) return new $Container(resolver);
            //@ts-expect-error
            return new instance();
        } else return new $Container(resolver);
    }
    if (resolver instanceof Node) {
        if (resolver.$) return resolver.$;
        else return $Util.from(resolver);
    }
    throw `$: NOT SUPPORT TARGET ELEMENT TYPE ('${resolver}')`
}
export namespace $ {
    export let anchorHandler: null | (($a: $Anchor, e: Event) => void) = null;
    export let anchorPreventDefault: boolean = false;
    export const TagNameElementMap = {
        'document': $Document,
        'body': $Container,
        'a': $Anchor,
        'p': $Container,
        'pre': $Container,
        'code': $Container,
        'blockquote': $Container,
        'strong': $Container,
        'h1': $Container,
        'h2': $Container,
        'h3': $Container,
        'h4': $Container,
        'h5': $Container,
        'h6': $Container,
        'div': $Container,
        'ol': $Container,
        'ul': $Container,
        'dl': $Container,
        'li': $Container,
        'input': $Input,
        'label': $Label,
        'button': $Button,
        'form': $Form,
        'img': $Image,
        'dialog': $Dialog,
        'canvas': $Canvas,
        'view': $View,
        'select': $Select,
        'option': $Option,
        'optgroup': $OptGroup,
        'textarea': $Textarea,
        'async': $Async,
    }
    export type TagNameElementMapType = typeof TagNameElementMap;
    export interface TagNameElementMap extends TagNameElementMapType {} 
    export type TagNameTypeMap = {
        [key in keyof $.TagNameElementMap]: InstanceType<$.TagNameElementMap[key]>;
    };
    export type ContainerTypeTagName = Exclude<keyof TagNameTypeMap, 'input'>;
    export type SelfTypeTagName = 'input';

    export type $HTMLElementMap<H extends HTMLElement> = 
    H extends HTMLLabelElement ? $Label 
    : H extends HTMLInputElement ? $Input
    : H extends HTMLAnchorElement ? $Anchor
    : H extends HTMLButtonElement ? $Button
    : H extends HTMLFormElement ? $Form
    : H extends HTMLImageElement ? $Image
    : H extends HTMLFormElement ? $Form
    : H extends HTMLCanvasElement ? $Canvas
    : H extends HTMLDialogElement ? $Dialog
    : H extends HTMLSelectElement ? $Select
    : H extends HTMLOptionElement ? $Option
    : H extends HTMLOptGroupElement ? $OptGroup
    : H extends HTMLTextAreaElement ? $Textarea
    : $Container<H>;

    /**
     * A helper for fluent method design. Return the `instance` object when arguments length not equal 0. Otherwise, return the `value`.
     * @param instance The object to return when arguments length not equal 0.
     * @param args The method `arguments`.
     * @param value The value to return when arguments length equal 0.
     * @param action The action to execute when arguments length not equal 0.
     * @returns 
     */
    export function fluent<T, A, V>(instance: T, args: IArguments, value: () => V, action: (...args: any[]) => void) {
        if (!args.length) return value();
        action();
        return instance;
    }
    
    export function orArrayResolve<T>(multable: OrArray<T>) {
        if (multable instanceof Array) return multable;
        else return [multable];
    }
    
    export function mixin(target: any, constructors: OrArray<any>) { return $Util.mixin(target, constructors) }
    /**
     * A helper for undefined able value and $State.set() which apply value to target.
     * @param object Target object.
     * @param key The key of target object.
     * @param value Value of target property or parameter of method(Using Tuple to apply parameter).
     * @param methodKey Variant key name when apply value on $State.set()
     * @returns 
     */
    export function set<O extends Object, K extends keyof O, V>(
        object: O, 
        key: K, 
        value: O[K] extends (...args: any) => any 
            ? (undefined | $StateArgument<Parameters<O[K]>>) 
            : (undefined | $StateArgument<O[K]>), 
        handle?: ($state: $State<O[K]>) => any) {
            if (value === undefined) return;
            if (value instanceof $State) {
                value.use(object, key);
                if (object[key] instanceof Function) (object[key] as Function)(value)
                    else object[key] = value.value;
                if (handle) handle(value);
                return;
            }
            if (object[key] instanceof Function) (object[key] as Function)(value);
            else object[key] = value as any;
    }
    
    export function state<T>(value: T, options?: $StateOption<T>) {
        return new $State<T>(value, options)
    }

    export async function resize(object: Blob, size: number): Promise<string> {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const $img = $('img');
                $img.once('load', e => {
                    const $canvas = $('canvas');
                    const context = $canvas.getContext('2d');
                    const ratio = $img.height() / $img.width();
                    const [w, h] = [
                        ratio > 1 ? size / ratio : size,
                        ratio > 1 ? size : size * ratio,
                    ]
                    $canvas.height(h).width(w);
                    context?.drawImage($img.dom, 0, 0, w, h);
                    resolve($canvas.toDataURL(object.type))
                })
                if (!e.target) throw "$.resize(): e.target is null";
                $img.src(e.target.result as string);
            }
            reader.readAsDataURL(object);
        })
    }

    export function rem(amount: number = 1) {
        return parseInt(getComputedStyle(document.documentElement).fontSize) * amount
    }

    export function html(html: string) {
        const body = new DOMParser().parseFromString(html, 'text/html').body;
        return Array.from(body.children).map(child => $(child))
    }

    /**Build multiple element in once. */
    export function builder<F extends BuildNodeFunction, R extends ReturnType<F>>(bulder: F, params: [...Parameters<F>][], callback?: BuilderSelfFunction<R>): R[]
    export function builder<F extends BuildNodeFunction, R extends ReturnType<F>>(bulder: [F, ...Parameters<F>], size: number, callback?: BuilderSelfFunction<R>): R[]
    export function builder<F extends BuildNodeFunction, R extends ReturnType<F>>(bulder: [F, ...Parameters<F>], options: ($Node | string | BuilderSelfFunction<R>)[]): R[]
    export function builder<K extends $.SelfTypeTagName>(tagname: K, size: number, callback?: BuilderSelfFunction<$.TagNameTypeMap[K]>): $.TagNameTypeMap[K][]
    export function builder<K extends $.SelfTypeTagName>(tagname: K, callback: BuilderSelfFunction<$.TagNameTypeMap[K]>[]): $.TagNameTypeMap[K][]
    export function builder<K extends $.ContainerTypeTagName>(tagname: K, size: number, callback?: BuilderSelfFunction<$.TagNameTypeMap[K]>): $.TagNameTypeMap[K][]
    export function builder<K extends $.ContainerTypeTagName>(tagname: K, options: ($Node | string | BuilderSelfFunction<$.TagNameTypeMap[K]>)[]): $.TagNameTypeMap[K][]
    export function builder(tagname: any, resolver: any, callback?: BuilderSelfFunction<any>) {
        if (typeof resolver === 'number') {
            return Array(resolver).fill('').map(v => {
                const ele = isTuppleBuilder(tagname) ? tagname[0](...tagname.slice(1) as []) : $(tagname);
                if (callback) callback(ele);
                return ele
            });
        }
        else {
            const eleArray = [];
            for (const item of resolver) {
                const ele = tagname instanceof Function ? tagname(...item) // tagname is function, item is params
                : isTuppleBuilder(tagname) ? tagname[0](...tagname.slice(1) as []) 
                : $(tagname);
                if (item instanceof Function) { item(ele) }
                else if (item instanceof $Node || typeof item === 'string') { ele.content(item) }
                eleArray.push(ele);
            }
            return eleArray;
        }
    
        function isTuppleBuilder(target: any): target is [BuildNodeFunction, ...any] {
            if (target instanceof Array && target[0] instanceof Function) return true;
            else return false; 
        }
    }

    export function registerTagName(string: string, node: {new(...args: undefined[]): $Node}) {
        Object.assign($.TagNameElementMap, {[string]: node});
        return $.TagNameElementMap;
    }
}
type BuildNodeFunction = (...args: any[]) => $Node;
type BuilderSelfFunction<K extends $Node> = (self: K) => void;
globalThis.$ = $;