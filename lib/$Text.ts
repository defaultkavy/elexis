import { $Node } from "./$Node";

export class $Text extends $Node<Text> {
    dom: Text;
    constructor(data: string) {
        super();
        this.dom = new Text(data);
    }
}