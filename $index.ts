import { $Node } from "./index";
import { $Anchor } from "./lib/$Anchor";
import { $Container } from "./lib/$Container";
import { $Element } from "./lib/$Element";
import { $Input } from "./lib/$Input";
import { $Label } from "./lib/$Label";
import { Router } from "./lib/Router/Router";

export function $<K extends keyof $.TagNameTypeMap>(resolver: K): $.TagNameTypeMap[K];
export function $<K extends string>(resolver: K): $Container;
export function $<H extends HTMLElement>(htmlElement: H): $.HTMLElementTo$ElementMap<H>
export function $(resolver: any) {
    if (typeof resolver === 'string') {
        if (resolver in $.TagNameElementMap) {
            const instance = $.TagNameElementMap[resolver as keyof typeof $.TagNameElementMap]
            switch (instance) {
                case $Element: return new $Element(resolver);
                case $Anchor: return new $Anchor();
                case $Container: return new $Container(resolver);
            }
        } else return new $Container(resolver);
    }
    if (resolver instanceof HTMLElement) {
        if (resolver.$) return resolver.$;
        else throw new Error('HTMLElement PROPERTY $ MISSING');
    }
}

export namespace $ {
    export let anchorHandler: null | ((url: URL, e: Event) => void) = null;
    export let anchorPreventDefault: boolean = false;
    export const routers = new Set<Router>;
    export const TagNameElementMap = {
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
        'input': $Input
    }
    export type TagNameTypeMap = {
        [key in keyof typeof $.TagNameElementMap]: InstanceType<typeof $.TagNameElementMap[key]>;
    };
    export type ContainerTypeTagName = Exclude<keyof TagNameTypeMap, 'input'>;
    export type SelfTypeTagName = 'input';

    export type HTMLElementTo$ElementMap<H extends HTMLElement> = 
    H extends HTMLLabelElement ? $Label 
    : H extends HTMLInputElement ? $Input
    : H extends HTMLAnchorElement ? $Anchor
    : $Element<H>;
    
    export function fluent<T, A, V>(instance: T, args: IArguments, value: () => V, action: (...args: any[]) => void) {
        if (!args.length) return value();
        action();
        return instance;
    }

    export function multableResolve<T>(multable: OrArray<T>) {
        if (multable instanceof Array) return multable;
        else return [multable];
    }

    export function mixin(target: any, constructors: OrArray<any>) {
        $.multableResolve(constructors).forEach(constructor => {
          Object.getOwnPropertyNames(constructor.prototype).forEach(name => {
            if (name === 'constructor') return;
            Object.defineProperty(
              target.prototype,
              name,
              Object.getOwnPropertyDescriptor(constructor.prototype, name) || Object.create(null)
            )
          })
        })
        return target;
    }

    export function set<O, K extends keyof O>(object: O, key: K, value: any) {
        if (value !== undefined) object[key] = value;
    }
}
$.builder = builder

/**Build multiple element in once. */
function builder<F extends BuildNodeFunction, R extends ReturnType<F>>(bulder: F, params: [...Parameters<F>][], callback?: BuilderSelfFunction<R>): R[]
function builder<F extends BuildNodeFunction, R extends ReturnType<F>>(bulder: [F, ...Parameters<F>], size: number, callback?: BuilderSelfFunction<R>): R[]
function builder<F extends BuildNodeFunction, R extends ReturnType<F>>(bulder: [F, ...Parameters<F>], options: ($Node | string | BuilderSelfFunction<R>)[]): R[]
function builder<K extends $.SelfTypeTagName>(tagname: K, size: number, callback?: BuilderSelfFunction<$.TagNameTypeMap[K]>): $.TagNameTypeMap[K][]
function builder<K extends $.SelfTypeTagName>(tagname: K, callback: BuilderSelfFunction<$.TagNameTypeMap[K]>[]): $.TagNameTypeMap[K][]
function builder<K extends $.ContainerTypeTagName>(tagname: K, size: number, callback?: BuilderSelfFunction<$.TagNameTypeMap[K]>): $.TagNameTypeMap[K][]
function builder<K extends $.ContainerTypeTagName>(tagname: K, options: ($Node | string | BuilderSelfFunction<$.TagNameTypeMap[K]>)[]): $.TagNameTypeMap[K][]
function builder(tagname: any, resolver: any, callback?: BuilderSelfFunction<any>) {
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
type BuildNodeFunction = (...args: any[]) => $Node;
type BuilderSelfFunction<K extends $Node> = (self: K) => void

//@ts-expect-error
globalThis.$ = $;