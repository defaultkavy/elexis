import { $EventTarget } from "./$EventTarget";
import { $Util } from "./$Util";

export class $KeyboardManager {
    keyMap = new Map<string, $KeyboardEventMap>();
    protected conditional?: ((event: KeyboardEvent) => boolean | undefined);
    constructor($element: $EventTarget) {
        $element.on('keydown', e => { if (this.conditional && !this.conditional(e)) return; this.keyMap.get(e.key)?.keydown.forEach(fn => fn(e)) })
        $element.on('keyup', e => { if (this.conditional && !this.conditional(e)) return; this.keyMap.get(e.key)?.keyup.forEach(fn => fn(e)) })
        $element.on('keypress', e => { if (this.conditional && !this.conditional(e)) return; this.keyMap.get(e.key)?.keypress.forEach(fn => fn(e)) })
    }

    if(callback: (event: KeyboardEvent) => boolean | undefined) {
        this.conditional = callback;
        return this;
    }

    assigns(keys: OrArray<string>, on: OrArray<$KeyboardEventType>, callback: $KeyboardEventHandler) {
        keys = $Util.orArrayResolve(keys);
        on = $Util.orArrayResolve(on);
        for (const key of keys) {
            const eventData: $KeyboardEventMap = this.keyMap.get(key) ?? {keydown: new Set(), keypress: new Set(), keyup: new Set()};
            for (const event of on) {
                eventData[event].add(callback);
            }
            this.keyMap.set(key, eventData);
        }
        return this;
    }

    unassign(keys: OrArray<string>, on?: OrArray<$KeyboardEventType>, callback?: (event: KeyboardEvent) => void) {
        keys = $Util.orArrayResolve(keys);
        on = on ? $Util.orArrayResolve(on) : ['keydown', 'keypress', 'keyup'];
        for (const key of keys) {
            const eventData: $KeyboardEventMap = this.keyMap.get(key) ?? {keydown: new Set(), keypress: new Set(), keyup: new Set()};
            for (const event of on) {
                if (callback) eventData[event].delete(callback);
                else eventData[event].clear();
            }
            this.keyMap.set(key, eventData);
        }
        return this;
    }

    keydown(keys: OrArray<string>, callback: $KeyboardEventHandler) { this.assigns(keys, 'keydown', callback); return this; }
    keyup(keys: OrArray<string>, callback: $KeyboardEventHandler) { this.assigns(keys, 'keyup', callback); return this; }
    keypress(keys: OrArray<string>, callback: $KeyboardEventHandler) { this.assigns(keys, 'keypress', callback); return this; }
}

export type $KeyboardEventType = 'keydown' | 'keyup' | 'keypress';
export type $KeyboardEventHandler = (event: KeyboardEvent) => void;
type $KeyboardEventMap = {[key in $KeyboardEventType]: Set<$KeyboardEventHandler>};