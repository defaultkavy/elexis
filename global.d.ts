import { $ as fluent } from "./$index";
import { $Element } from "./lib/$Element";

declare global {
    const $ = fluent;
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
    type TextDirection = 'ltr' | 'rtl' | 'auto' | '';

    interface HTMLElement {
        $: $Element;
    }
}
