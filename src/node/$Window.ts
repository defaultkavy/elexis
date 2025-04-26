import type { $EventMap } from "../structure/$EventManager";
import { $EventTarget } from "../structure/$EventTarget";

export class $Window<EM extends $WindowEventMap = $WindowEventMap> extends $EventTarget<EM, WindowEventMap> {
    static $ = new $Window();
    readonly dom = window;
}

export interface $WindowEventMap extends $EventMap {}