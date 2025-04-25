import type { $ } from "./src/$index";

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
        $: import('./src/node/$Node').$Node;
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
export * from "./src/$index";
export * from "./src/structure/$NodeManager";
export * from "./src/structure/$EventManager";
export * from "./src/structure/$EventTarget";
export * from "./src/structure/$KeyboardManager";
export * from "./src/structure/$FocusManager";
export * from "./src/structure/$PointerManager";
export * from "./src/structure/$Window";
export * from "./src/structure/$State";
export * from "./src/node/$Node";
export * from "./src/node/$Anchor";
export * from "./src/node/$Element";
export * from "./src/node/$HTMLElement";
export * from "./src/node/$Text";
export * from "./src/node/$Container";
export * from "./src/node/$Button";
export * from "./src/node/$Form";
export * from "./src/node/$Select";
export * from "./src/node/$Option";
export * from "./src/node/$OptGroup";
export * from "./src/node/$Textarea";
export * from "./src/node/$Image";
export * from "./src/node/$Async";
export * from "./src/node/$Document";
export * from "./src/node/$Media";
export * from "./src/node/$Video";