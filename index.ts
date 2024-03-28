declare global {
    var $: import('./$index').$;
    interface Array<T> {
        detype<F extends undefined | null, O>(...types: F[]): Array<Exclude<T, F>>
    }
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
    type ContructorType<T> = { new (...args: any[]): T }
    interface Node {
        $: import('./lib/$Node').$Node;
    }
}
Array.prototype.detype = function <T extends undefined | null, O>(this: O[], ...types: T[]) {
    return this.filter(item => {
        if (!types.length) return item !== undefined;
        else for (const type of types) if (typeof item !== typeof type) return false;  else return true
    }) as Exclude<O, T>[];
}
export * from "./$index";
export * from "./lib/Router/Route";
export * from "./lib/Router/Router";
export * from "./lib/$Node";
export * from "./lib/$Anchor";
export * from "./lib/$Element";
export * from "./lib/$NodeManager";
export * from "./lib/$Text";
export * from "./lib/$Container";
export * from "./lib/$Button";
export * from "./lib/$Form";
export * from "./lib/$EventManager";
export * from "./lib/$State";