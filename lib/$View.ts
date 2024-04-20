import { $Container, $ContainerOptions } from "./$Container";
import { $EventManager } from "./$EventManager";
import { $Node } from "./$Node";

export interface $ViewOptions extends $ContainerOptions {}
export class $View extends $Container {
    protected view_cache = new Map<string, $Node>();
    event = new $EventManager<$ViewEventMap>().register('switch')
    content_id: string | null = null;
    constructor(options?: $ViewOptions) {
        super('view', options);
    }

    setView(id: string, $node: $Node) {
        this.view_cache.set(id, $node);
        return this;
    }

    deleteView(id: string) {
        this.view_cache.delete(id);
        return this;
    }

    deleteAllView() {
        this.view_cache.clear();
        return this;
    }

    switchView(id: string) {
        const target_content = this.view_cache.get(id);
        if (target_content === undefined) throw '$View.switch(): target content is undefined';
        this.content(target_content);
        this.content_id = id;
        this.event.fire('switch', id);
        return this;
    }
}

export interface $ViewEventMap {
    'switch': [id: string]
}