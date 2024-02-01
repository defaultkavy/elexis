declare global {
    interface Array<T> {
        detype<F extends undefined | null, O>(...types: F[]): Array<Exclude<T, F>>
    }
}
Array.prototype.detype = function <T extends undefined | null, O>(this: O[], ...types: T[]) {
    return this.filter(item => {
        for (const type of types) typeof item !== typeof type
    }) as Exclude<O, T>[];
}
export * from "./$index";
export * from "./lib/Router/Route";
export * from "./lib/Router/Router";
export * from "./lib/$Node";
export * from "./lib/$Anchor";
export * from "./lib/$Element";
export * from "./lib/$ElementManager";
export * from "./lib/$Text";
export * from "./lib/$Container";
export * from "./lib/$EventManager";