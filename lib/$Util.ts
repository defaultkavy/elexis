import { $State } from "./$State";
import { $Container } from "./node/$Container";
import { $Node } from "./node/$Node";
import { $SVGElement } from "./node/$SVGElement";
import { $Text } from "./node/$Text";

export namespace $Util {
    export function fluent<T, A, V>(instance: T, args: IArguments, value: () => V, action: (...args: any[]) => void) {
        if (!args.length) return value();
        action();
        return instance;
    }
    
    export function orArrayResolve<T>(multable: OrArray<T>) {
        if (multable instanceof Array) return multable;
        else return [multable];
    }
    
    export function mixin(target: any, constructors: OrArray<any>) {
        orArrayResolve(constructors).forEach(constructor => {
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
    
    export function state<T>(value: T) {
        return new $State<T>(value)
    }

    export function from(element: HTMLElement | Text | Node): $Node {
        if (element.$) return element.$;
        if (element.nodeName.toLowerCase() === 'body') return new $Container('body', {dom: element as HTMLBodyElement});
        else if (element instanceof HTMLElement) {
            const instance = $.TagNameElementMap[element.tagName.toLowerCase() as keyof typeof $.TagNameElementMap];
            const $node = instance === $Container ? new instance(element.tagName, {dom: element}) : new instance({dom: element} as any);
            if ($node instanceof $Container) for (const childnode of Array.from($node.dom.childNodes)) {
                $node.children.add($(childnode));
            }
            return $node as $Node;
        }
        else if (element instanceof Text) {
            const node = new $Text(element.textContent ?? '') as Mutable<$Node>;
            node.dom = element;
            return node as $Node;
        }
        else if (element instanceof SVGElement) {
            if (element.tagName.toLowerCase() === 'svg') {return new $SVGElement('svg', {dom: element}) };
        }
        throw `$NODE.FROM: NOT SUPPORT TARGET ELEMENT TYPE (${element.nodeName})`
    }
}