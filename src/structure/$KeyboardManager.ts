import { _orArrayResolve } from "#lib/orArrayResolve";
import { $EventTarget } from "./$EventTarget";

/**
 * Keyboard event helper, manage event handler function of assigned keys.
 */
export class $KeyboardManager {
    keyMap = new Map<string, $KeyboardEventMap>();
    protected conditional?: ((event: KeyboardEvent) => boolean | undefined);
    constructor($element: $EventTarget) {
        $element.on('keydown', e => { if (this.conditional && !this.conditional(e)) return; this.keyMap.get(e.key)?.keydown.forEach(fn => fn(e)) })
        $element.on('keyup', e => { if (this.conditional && !this.conditional(e)) return; this.keyMap.get(e.key)?.keyup.forEach(fn => fn(e)) })
        $element.on('keypress', e => { if (this.conditional && !this.conditional(e)) return; this.keyMap.get(e.key)?.keypress.forEach(fn => fn(e)) })
    }

    /**
     * ### Event Handlers Conditional Function
     * Every time key event triggered, parameter function `callback` will execute and check the result. 
     * If function return `true` value, then all the assigned event handler function will be executed.
     * If `false`, no assigned event handler function will execute.
     * This function is more efficiently when there are multiple event handler have the same conditional.
     * @param callback - The conditional callback function.
     */
    if(callback: (event: KeyboardEvent) => boolean | undefined): $KeyboardManager {
        this.conditional = callback;
        return this;
    }

    /**
     * Assign event handler function with keys.
     * @param keys - Single or array of key string
     * @param on - event type of keyboard. see: {@link $KeyboardEventType}
     * @param callback - event handler function
     */
    assigns(keys: OrArray<string>, on: OrArray<$KeyboardEventType>, callback: $KeyboardEventHandler): $KeyboardManager {
        keys = _orArrayResolve(keys);
        on = _orArrayResolve(on);
        for (const key of keys) {
            const eventData: $KeyboardEventMap = this.keyMap.get(key) ?? {keydown: new Set(), keypress: new Set(), keyup: new Set()};
            for (const event of on) {
                eventData[event].add(callback);
            }
            this.keyMap.set(key, eventData);
        }
        return this;
    }

    /**
     * Remove event handler function from keys.
     * @param keys - Single or array of key string
     * @param on - event type of keyboard. see: {@link $KeyboardEventType}
     * @param callback - event handler function
     */
    unassign(keys: OrArray<string>, on?: OrArray<$KeyboardEventType>, callback?: (event: KeyboardEvent) => void): $KeyboardManager {
        keys = _orArrayResolve(keys);
        on = on ? _orArrayResolve(on) : ['keydown', 'keypress', 'keyup'];
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

    /**
     * Shortform of {@link $KeyboardManager.assigns()} method. Trigger event on `keydown`.
     * @param keys - Single or array of key string
     * @param callback - event handler function
     */
    keydown(keys: OrArray<string>, callback: $KeyboardEventHandler): $KeyboardManager { this.assigns(keys, 'keydown', callback); return this; }
    /**
     * Shortform of {@link $KeyboardManager.assigns()} method. Trigger event on `keyup`.
     * @param keys - Single or array of key string
     * @param callback - event handler function
     */
    keyup(keys: OrArray<string>, callback: $KeyboardEventHandler): $KeyboardManager { this.assigns(keys, 'keyup', callback); return this; }
    /**
     * Shortform of {@link $KeyboardManager.assigns()} method. Trigger event on `keypress`.
     * @param keys - Single or array of key string
     * @param callback - event handler function
     */
    keypress(keys: OrArray<string>, callback: $KeyboardEventHandler): $KeyboardManager { this.assigns(keys, 'keypress', callback); return this; }
    self(callback: ($self: this) => void): $KeyboardManager { callback(this); return this }
}

export type $KeyboardEventType = 'keydown' | 'keyup' | 'keypress';
export type $KeyboardEventHandler = (event: KeyboardEvent) => void;
type $KeyboardEventMap = {[key in $KeyboardEventType]: Set<$KeyboardEventHandler>};