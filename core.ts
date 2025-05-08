import './global';
// core structure
import { type $EventMap, $EventManager } from "./src/structure/$EventManager";
import { type $StateArgument, $State, type $StateOption, type $StateObject, type $StateParameter } from "./src/structure/$State";
import type { $EventTarget } from "./src/structure/$EventTarget";
// core dom
import { $Node } from "./src/node/$Node"
import { $Element } from "./src/node/$Element";
import { $HTMLElement } from "./src/node/$HTMLElement";
import { $Container } from "./src/node/$Container";
import { $Document } from "./src/node/$Document"
import { $Async } from "./src/node/$Async";
import { $Window } from "./src/node/$Window";
// core lib
import { _convertFrom } from "./src/lib/convertFrom";
import { _classList } from "./src/lib/classList";
// types
import type { $Anchor } from './src/node/$Anchor';
import type { $Button } from './src/node/$Button';
import type { $Canvas } from './src/node/$Canvas';
import type { $Dialog } from './src/node/$Dialog';
import type { $Form } from './src/node/$Form';
import type { $Image } from './src/node/$Image';
import type { $Input } from './src/node/$Input';
import type { $Label } from './src/node/$Label';
import type { $OptionGroup } from './src/node/$OptGroup';
import type { $Option } from './src/node/$Option';
import type { $Select } from './src/node/$Select';
import type { $Textarea } from './src/node/$Textarea';
import type { $Video } from './src/node/$Video';

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
            //@ts-expect-error
            const instance = $.TagNameElementMap[resolver as any]
            if (instance === $HTMLElement) return new $HTMLElement(resolver);
            if (instance === $Container) return new $Container(resolver);
            return new instance();
        } else return new $Container(resolver);
    }
    // is Node
    if (resolver instanceof Node) {
        if (resolver.$) return resolver.$;
        else return _convertFrom(resolver);
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
    export const TagNameElementMap = {
        'html': $Container,
        'head': $Container,
        'document': $Document,
        'body': $Container,
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
        'async': $Async
    }
    export type TagNameElementMapType = typeof TagNameElementMap;
    export interface TagNameElementMap extends TagNameElementMapType {} 
    export type TagNameTypeMap = {
        [key in keyof TagNameElementMap]: InstanceType<$.TagNameElementMap[key]>;
    };
    export type ContainerTypeTagName = Exclude<keyof $.TagNameTypeMap, 'input'>;
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
    : H extends HTMLOptGroupElement ? $OptionGroup
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
     * @param callback callback when param `value` is $State object.
     * @returns 
     */
    export function set<O extends Object, K extends keyof O>(
        object: O, 
        key: K, 
        value: O[K] extends (...args: any) => any 
            ? (undefined | $StateParameter<Parameters<O[K]>>) 
            : (undefined | $StateArgument<O[K]>), 
        options?: {
            callback?: (value: O[K]) => void,
            stateHandler?: ($state: $State<O[K]>) => void
        }
    ) { return $State.set(object, key, value, options); }
    
    export function state<T extends number>(value: T, options?: $StateOption<T>): $State<number>;
    export function state<T extends string>(value: T, options?: $StateOption<T>): $State<string>;
    export function state<T extends boolean>(value: T, options?: $StateOption<boolean>): $State<boolean>;
    export function state<T extends $State<any>, K extends T extends $State<infer A> ? A : never>(value: T, options?: $StateOption<K>): $State<K>;
    export function state<T extends Object>(value: T, options?: $StateOption<T>): $StateObject<T>;
    export function state<T>(value: T, options?: $StateOption<T>): $State<T>;
    export function state<T>(value: T, options?: $StateOption<T extends $State<infer K> ? K : T>) {
        return $State.create<T>(value, options as $StateOption<T>)
    }

    export function registerTagName(string: string, node: {new(...args: undefined[]): $Node}) {
        Object.assign($.TagNameElementMap, {[string]: node});
        return $.TagNameElementMap;
    }
    
    export function orArrayResolve<T>(multable: OrArray<T>) { if (multable instanceof Array) return multable; else return [multable]; }
    export function rem(amount: number = 1) { return parseInt(getComputedStyle(document.documentElement).fontSize) * amount }
    export function call<T>(fn: () => T): T { return fn() }
    export function classList(...name: (string | undefined)[]) { return _classList(name) }
    export function events<EM extends $EventMap>() { return new $EventManager<EM> }
}