import { $EventManager, $EventMap, $EventTarget, $FocusManager, $StateObject, $PointerManager, $State, $StateArgument, $StateOption } from "../index";
import { $Node } from "./node/$Node"
import { $Document } from "./node/$Document"
import { $Anchor } from "./node/$Anchor";
import { $Button } from "./node/$Button";
import { $Form } from "./node/$Form";
import { $Input } from "./node/$Input";
import { $Container } from "./node/$Container";
import { $Element } from "./node/$Element";
import { $Label } from "./node/$Label";
import { $Image } from "./node/$Image";
import { $Canvas } from "./node/$Canvas";
import { $Dialog } from "./node/$Dialog";
import { $Select } from "./node/$Select";
import { $Option } from "./node/$Option";
import { $OptGroup } from "./node/$OptGroup";
import { $Textarea } from "./node/$Textarea";
import { $Util } from "./structure/$Util";
import { $HTMLElement } from "./node/$HTMLElement";
import { $Async } from "./node/$Async";
import { $Video } from "./node/$Video";
import { $Window } from "./structure/$Window";
import { $KeyboardManager } from "./structure/$KeyboardManager";
import { convertFrom } from "./method/convertFrom";

export type $ = typeof $;
/**
 * Multiple element selector query.
 * @param query - `::<selector>`
 * @example
 * $(':button.red'); // return single $Element
 * $('::button'); // return array of $Element
 */
export function $<E extends $Element = $Element>(query: `::${string}`): E[];
/**
 * Single element selector query.
 * @param query - `:<selector>`
 * @example
 * $(':button.red'); // return single $Element
 * $('::button'); // return array of $Element
 */
export function $<E extends $Element = $Element>(query: `:${string}`): E | null;
/**
 * Return `null`.
 * @param element - null 
 */
export function $(element: null): null;
/**
 * Create $Element with html tag name like 'a', 'div', 'h1'.
 * @param tagname - key of {@link $.TagNameElementMap}
 * @example $('div');
 */
export function $<K extends keyof $.TagNameTypeMap>(tagname: K): $.TagNameTypeMap[K];
/**
 * Create $Container with custom tag name.
 * @param tagname - tag name
 * @example $('custom-div');
 */
export function $<K extends string>(tagname: K): $Container;
/**
 * Return {@link $Window} object.
 * @param window - {@link Window} Object.
 * @example $(window);
 */
export function $(window: Window): $Window;
/**
 * Return {@link $HTMLElement} Object.
 * @param htmlElement - {@link HTMLElement} Object.
 * @example ${document.body}
 */
export function $<H extends HTMLElement>(htmlElement: H): $.$HTMLElementMap<H>;
/**
 * Return {@link $Element} Object.
 * @param element - {@link Element} Object.
 */
export function $<H extends Element>(element: H): $Element;
/**
 * Return {@link $Node} Object
 * @param node - {@link Node} Object.
 */
export function $<N extends $Node>(node: N): N;
export function $<H extends EventTarget>(element: H): $Element;
/**
 * Using {@link $Node} builder function as parameter.
 * @param builder - function of {@link $Node} builder.
 * @param args - builder function arguments.
 * @example
 * // define custom header element builder function
 * function $CustomHeader(title: string, intro: string) {
 *      return $('custom-div').class('header').content([
 *          $('h1').class('title').content(title),
 *          $('p').class('intro').content(intro)
 *      ])
 * }
 * // build and append into dom tree
 * $(document.body).content([
 *      $($CustomHeader, 'Hello, World!', 'This is intro.')
 * ])
 */
export function $<F extends (...args: any[]) => $Node, P extends Parameters<F>>(builder: F, ...args: P): ReturnType<F>; 
/**
 * Using constructor as parameter that extends {@link $Node} Object.
 * @param constructor - constructor of {@link $Node} extended class.
 * @param args - constructor arguments.
 * @example
 * // define custom header element class
 * class $CustomHeader extends $Container {
 *      constructor(title: string, intro: string) {
 *          super('custom-div');
 *          this.class('header').content([
 *              $('h1').class('title').content(title),
 *              $('p').class('intro').content(intro)
 *          ])
 *      }
 * }
 * // build and append into dom tree
 * $(document.body).content([
 *      $($CustomHeader, 'Hello, World!', 'This is intro.')
 * ])
 */
export function $<C extends ConstructorType<$Node>, P extends ConstructorParameters<C>>(constructor: C, ...args: P): InstanceType<C>;
export function $(element: null | HTMLElement | Element | Node | EventTarget): $EventTarget | $Node | $HTMLElement | $Element | null;
/**
 * Return `undefined`.
 * @param element - `undefined`
 */
export function $(element: undefined): undefined;
export function $(resolver: any, ...args: any[]) {
    if (typeof resolver === 'undefined') return resolver;
    if (resolver === null) return resolver;
    // is $Node
    if (resolver instanceof $Node) return resolver;
    // is tagname or selector query
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
    // is Node
    if (resolver instanceof Node) {
        if (resolver.$) return resolver.$;
        else return convertFrom(resolver);
    }
    // is Window
    if (resolver instanceof Window) return $Window.$;
    // is builder of element
    // if (resolver instanceof Function) { return resolver(...args) }
    // is constructor of element
    if (typeof resolver === 'function') {
        if (resolver.prototype && resolver.prototype.constructor) return new resolver.prototype.constructor(...args)
        else return resolver(...args)
    }
    throw new Error(`$(): Target not supported. ${resolver instanceof Object ? resolver.constructor.name : resolver}`)
}

/**
 * `$` is basic API interface to calling function, All major tools can be found in `$` properties.
 * This is also a feature-rich function to help you create and select elements.
 */
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
            } else if (typeof value === 'string') {
                const template = $State.resolver(value);
                const stateList = template.filter(item => item instanceof $State);
                if (!stateList.length) return object[key] = value as any;
                $State.templateMap.set(object, { template, attribute: key });
                stateList.forEach(state$ => { state$.on('update', () => setTemplate()) })
                setTemplate();
                function setTemplate() {
                    if (object[key] instanceof Function) object[key](template.map(item => item instanceof $State ? item.value : item).join(''))
                    else object[key] = template.map(item => item instanceof $State ? item.value : item).join('') as any
                }
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
    export function pass(...args: any) { return true }/**
    * UUIDv7 features a time-ordered value field derived from the widely implemented and well-known Unix Epoch timestamp source,
    * the number of milliseconds since midnight 1 Jan 1970 UTC, leap seconds excluded. 
    * ElexisJS UUIDv7 use the format as below:
    * ```txt
    *   0                   1                   2                   3
        0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |                           unix_ts_ms                          |
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |          unix_ts_ms           |  ver  |       worker_id       |
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |var|                        counter                            |
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |                             rand                              |
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       ```
    * Which:
       1. unix_ts_ms: 48-bit big-endian unsigned number of the Unix Epoch timestamp in milliseconds.
       2. ver: 4-bit UUID version number, set to 0b0111 (7).
       3. worker_id: 12-bit machine ID, which can defined by developer.
       4. var: 2-bit variant field defined by [RFC 9562](https://www.rfc-editor.org/rfc/rfc9562#variant_field), set to 0b10.
       5. counter: 30-bit counter that ensures the increasing order of IDs generated within a milisecond.
       6. rand: 32-bit random number.
    */
   export function uuidv7(options: { workerId?: number } = { workerId: 0 }) { return $Util.uuidv7(options) }
}

globalThis.$ = $;