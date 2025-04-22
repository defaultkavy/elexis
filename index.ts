import type { $ } from "./lib/$index";

declare global {
    /**
     * {@link $} is basic API interface to calling function, All major tools can be found in `$` properties.
     * This is also a feature-rich function to help you create and select elements.
     */
    var $: $
    interface Array<T> {
        detype<F extends any, O>(...types: F[]): Array<Exclude<T, F | undefined | void>>
    }
    interface Set<T> {
        get array(): T[]
        sort(handler: ((a: T, b: T) => number) | undefined): T[];
    }
    type Ok<D> = [D, null]
    type Err<E> = [null, E]
    type Result<D, E> = Ok<D> | Err<E>
    type OrMatrix<T> = T | OrMatrix<T>[];
    type OrArray<T> = T | T[];
    type OrPromise<T> = T | Promise<T>;
    type Mutable<T> = {
        -readonly [k in keyof T]: T[k];
     };
    type Types = 'string' | 'number' | 'boolean' | 'object' | 'symbol' | 'bigint' | 'function' | 'undefined'
    type Autocapitalize = 'none' | 'off' | 'sentences' | 'on' | 'words' | 'characters';
    type SelectionDirection = "forward" | "backward" | "none";
    type InputType = "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week";
    type InputMode = "" | "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";
    type ButtonType = "submit" | "reset" | "button" | "menu";
    type TextDirection = 'ltr' | 'rtl' | 'auto' | '';
    type ImageDecoding = "async" | "sync" | "auto";
    type ImageLoading = "eager" | "lazy";
    type ConstructorType<T> = { new (...args: any[]): T }
    interface Node {
        $: import('./lib/node/$Node').$Node;
    }
}
Array.prototype.detype = function <T extends any, O>(this: O[], ...types: T[]) {
    return this.filter(item => {
        if (!types.length) return item !== undefined;
        else for (const type of types) if (typeof item !== typeof type) return true;  else return false;
    }) as Exclude<O, T | undefined | void>[];
}
Object.defineProperties(Set.prototype, {
    array: { configurable: true, get: function <T>(this: Set<T>) { return Array.from(this)} }
})
Set.prototype.sort = function <T>(this: Set<T>, handler: ((a: T, b: T) => number) | undefined) { return this.array.sort(handler)}
export * from "./lib/$index";
export * from "./lib/structure/$NodeManager";
export * from "./lib/structure/$EventManager";
export * from "./lib/structure/$EventTarget";
export * from "./lib/structure/$KeyboardManager";
export * from "./lib/structure/$FocusManager";
export * from "./lib/structure/$PointerManager";
export * from "./lib/structure/$Window";
export * from "./lib/structure/$State";
export * from "./lib/node/$Node";
export * from "./lib/node/$Anchor";
export * from "./lib/node/$Element";
export * from "./lib/node/$HTMLElement";
export * from "./lib/node/$Text";
export * from "./lib/node/$Container";
export * from "./lib/node/$Button";
export * from "./lib/node/$Form";
export * from "./lib/node/$Select";
export * from "./lib/node/$Option";
export * from "./lib/node/$OptGroup";
export * from "./lib/node/$Textarea";
export * from "./lib/node/$Image";
export * from "./lib/node/$Async";
export * from "./lib/node/$Document";
export * from "./lib/node/$Media";
export * from "./lib/node/$Video";