import { $EventManager, $EventMap, $EventTarget, $FocusManager, $StateObject, $PointerManager, $State, $StateArgument, $StateOption } from "./index";
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
import { $Select } from "./lib/node/$Select";
import { $Option } from "./lib/node/$Option";
import { $OptGroup } from "./lib/node/$OptGroup";
import { $Textarea } from "./lib/node/$Textarea";
import { $Util } from "./lib/structure/$Util";
import { $HTMLElement } from "./lib/node/$HTMLElement";
import { $Async } from "./lib/node/$Async";
import { $Video } from "./lib/node/$Video";
import { $Window } from "./lib/structure/$Window";
import { $KeyboardManager } from "./lib/structure/$KeyboardManager";
import { convertFrom } from "./lib/method/convertFrom";

export type $ = typeof $;
export function $<E extends $Element = $Element>(query: `::${string}`): E[];
export function $<E extends $Element = $Element>(query: `:${string}`): E | null;
export function $(element: null): null;
export function $<K extends keyof $.TagNameTypeMap>(resolver: K): $.TagNameTypeMap[K];
export function $<K extends string>(resolver: K): $Container;
export function $(window: Window): $Window;
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
        else return convertFrom(resolver);
    }
    if (resolver instanceof Window) { return $Window.$ }
    throw `$: NOT SUPPORT TARGET ELEMENT TYPE ('${resolver}')`
}
export namespace $ {
    export let anchorHandler: null | (($a: $Anchor, e: Event) => void) = null;
    export const TagNameElementMap = {
        'html': $Container,
        'head': $Container,
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
        'select': $Select,
        'option': $Option,
        'optgroup': $OptGroup,
        'textarea': $Textarea,
        'video': $Video,
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
    : H extends HTMLVideoElement ? $Video
    : $Container<H>;

    /**
     * A helper for fluent method design. Return the `instance` object when arguments length not equal 0. Otherwise, return the `value`.
     * @param instance The object to return when arguments length not equal 0.
     * @param args The method `arguments`.
     * @param value The value to return when arguments length equal 0.
     * @param action The action to execute when arguments length not equal 0.
     * @returns 
     */
    export function fluent<T, A, V>(instance: T, args: IArguments, value: () => V, action: (...args: any[]) => void): T | V {
        if (!args.length) return value();
        action();
        return instance;
    }
    /**
     * A helper for undefined able value and $State.set() which apply value to target.
     * @param object Target object.
     * @param key The key of target object.
     * @param value Value of target property or parameter of method (Using Tuple to apply parameter).
     * @param handle callback when param `value` is $State object.
     * @returns 
     */
    export function set<O extends Object, K extends keyof O>(
        object: O, 
        key: K, 
        value: O[K] extends (...args: any) => any 
            ? (undefined | [$StateArgument<Parameters<O[K]>>]) 
            : (undefined | $StateArgument<O[K]>), 
        handle?: ($state: $State<O[K]>) => any) {
            if (value === undefined) return;
            if (value instanceof $State) {
                value.use(object, key);
                if (object[key] instanceof Function) (object[key] as Function)(...value.value)
                else if (value.value !== undefined) object[key] = value.value;
                if (handle) handle(value);
                return;
            }
            if (object[key] instanceof Function) (object[key] as Function)(...value as any);
            else object[key] = value as any;
    }
    
    export function state<T extends number>(value: T, options?: $StateOption<T>): $State<number>;
    export function state<T extends string>(value: T, options?: $StateOption<T>): $State<string>;
    export function state<T extends boolean>(value: T, options?: $StateOption<boolean>): $State<boolean>;
    export function state<T extends $State<any>, K extends T extends $State<infer A> ? A : never>(value: T, options?: $StateOption<K>): $State<K>;
    export function state<T extends Object>(value: T, options?: $StateOption<T>): $StateObject<T>;
    export function state<T>(value: T, options?: $StateOption<T>): $State<T>;
    export function state<T>(value: T, options?: $StateOption<T extends $State<infer K> ? K : T>) {
        return $State.create<T>(value, options as $StateOption<T>)
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

    export function html(html: string) {
        const body = new DOMParser().parseFromString(html, 'text/html').body;
        return Array.from(body.children).map(child => $(child))
    }

    export function registerTagName(string: string, node: {new(...args: undefined[]): $Node}) {
        Object.assign($.TagNameElementMap, {[string]: node});
        return $.TagNameElementMap;
    }
    
    export function orArrayResolve<T>(multable: OrArray<T>) { if (multable instanceof Array) return multable; else return [multable]; }
    export function mixin(target: any, constructors: OrArray<any>) { return $Util.mixin(target, constructors) }
    export function rem(amount: number = 1) { return parseInt(getComputedStyle(document.documentElement).fontSize) * amount }
    export function call<T>(fn: () => T): T { return fn() }
    export function events<EM extends $EventMap>() { return new $EventManager<EM> }
    export function pointers($node: $Node) { return new $PointerManager($node) }
    export function keys($target: $EventTarget) { return new $KeyboardManager($target) }
    export function focus() { return new $FocusManager() }
    export function classlist(...name: (string | undefined)[]) { return $Util.classlist(name) }
    export function pass(...args: any) { return true }
}

globalThis.$ = $;