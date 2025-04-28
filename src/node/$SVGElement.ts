import { $Element, type $ElementOptions } from "./$Element"

export interface $SVGOptions extends $ElementOptions {}
export class $SVGElement<S extends SVGElement> extends $Element<S> {
    constructor(tagname: string, options?: Partial<$SVGOptions>) {
        super(tagname, options);
    }
}