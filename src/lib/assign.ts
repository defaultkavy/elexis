import type { $Element } from "../node/$Element"
import { $State } from "../structure/$State"

export function assign(ele: any, options: {
    set?: string[], 
    get?: string[], 
    fn?: string[],
}) {
    // options.set && options.set.forEach(attr => {
    //     Object.assign(ele.prototype, {
    //         [attr](this: $Element, args: any) {
    //             //@ts-expect-error
    //             if (!arguments.length) return this.dom[attr];
    //             if (args === undefined) return this;
    //             return this.option({[attr]: args});
    //         }
    //     })
    // })

    options.get && options.get.forEach(prop => {
        Object.defineProperty(ele.prototype, prop, {
            get() { return this['dom'][prop as any] },
            enumerable: true
        })
    })

    options.fn && options.fn.forEach(name => {
        Object.assign(ele.prototype, {
            [name](this: $Element, ...args: any[]) {
                //@ts-expect-error
                return this.dom[name](...args) ?? this;
            }
        })
    })

    options.set && options.set.forEach(attr => {
        Object.assign(ele.prototype, {
            [attr](this: $Element, args: any) {
                if (!arguments.length) return this.dom[attr as keyof typeof this.dom];
                $State.set(this.dom, attr as any, args);
                return this;
            }
        })
    })
}