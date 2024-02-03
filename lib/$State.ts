import { $Node } from "./$Node";
import { $Text } from "./$Text";

export class $State<T> {
    readonly value: T;
    readonly contents = new Set<$Node>();
    constructor(value: T) {
        this.value = value;
    }
    set(value: T) {
        (this as Mutable<$State<T>>).value = value;
        for (const content of this.contents.values()) {
            if (content instanceof $Text) {
                content.content(`${value}`);
            }
        }
    }

    toString(): string {
        return `${this.value}`
    }
};