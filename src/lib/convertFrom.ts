import { $Container } from "#node/$Container";
import { $Document } from "#node/$Document";
import { $Node } from "#node/$Node";
import { $SVGElement } from "#node/$SVGElement";
import { $Text } from "#node/$Text";

export function _convertFrom(element: Node): $Node {
    if (element.$) return element.$;
    const nodename = element.nodeName.toLowerCase();
    switch (nodename) {
        case 'body':
        case 'head':
            return new $Container(nodename, {dom: element as HTMLElement});
        case '#document': 
            return $Document.from(element as Document);
        default: 
            if (element instanceof Element) {
                const instance = $.TagNameElementMap[element.tagName.toLowerCase() as keyof typeof $.TagNameElementMap];
                const $node = !instance 
                    ? new $Container(element.tagName, {dom: element}) 
                    : instance === $Container 
                        ? new instance(element.tagName, {dom: element})
                        //@ts-expect-error
                        : new instance({dom: element} as any);
                if ($node instanceof $Container) for (const childnode of Array.from($node.dom.childNodes)) $node.children.add($(childnode as any));
                return $node as $Node;
            }
            else if (element instanceof Text) return new $Text(element.textContent ?? '', element);
            else if (element instanceof SVGElement) return new $SVGElement(nodename, {dom: element});
            throw `$NODE.FROM: NOT SUPPORT TARGET ELEMENT TYPE (${nodename})`
    }
}