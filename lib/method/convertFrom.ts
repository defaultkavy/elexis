import { $Container } from "../node/$Container";
import { $Document } from "../node/$Document";
import { $Node } from "../node/$Node";
import { $SVGElement } from "../node/$SVGElement";
import { $Text } from "../node/$Text";

export function convertFrom(element: Node): $Node {
    if (element.$) return element.$;
    if (element.nodeName.toLowerCase() === 'body') return new $Container('body', {dom: element as HTMLBodyElement});
    if (element.nodeName.toLowerCase() === 'head') return new $Container('head', {dom: element as HTMLHeadElement});
    if (element.nodeName.toLowerCase() === '#document') return $Document.from(element as Document);
    else if (element instanceof HTMLElement) {
        const instance = $.TagNameElementMap[element.tagName.toLowerCase() as keyof typeof $.TagNameElementMap];
        const $node = !instance 
            ? new $Container(element.tagName, {dom: element}) 
            : instance === $Container 
                //@ts-expect-error
                ? new instance(element.tagName, {dom: element})
                //@ts-expect-error
                : new instance({dom: element} as any);
        if ($node instanceof $Container) for (const childnode of Array.from($node.dom.childNodes)) {
            $node.children.add($(childnode as any));
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