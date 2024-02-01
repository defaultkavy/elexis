import { $Container } from "../$Container";
import { $EventManager, $EventMethod, EventMethod } from "../$EventManager";
import { $Node } from "../$Node";
import { $Text } from "../$Text";
import { Route } from "./Route";
export interface Router extends $EventMethod<RouterEventMap> {};
@EventMethod
export class Router {
    routeMap = new Map<string, Route<any>>();
    contentMap = new Map<string, $Node>();
    view: $Container;
    index: number = 0;
    events = new $EventManager<RouterEventMap>().register('pathchange', 'notfound');
    basePath: string;
    constructor(basePath: string, view: $Container) {
        this.basePath = basePath;
        this.view = view
        $.routers.add(this);
    }

    /**Add route to Router. @example Router.addRoute(new Route('/', 'Hello World')) */
    addRoute(routes: OrArray<Route<any>>) {
        routes = $.multableResolve(routes);
        for (const route of routes) this.routeMap.set(route.path, route);
        return this;
    }

    /**Start listen to the path change */
    listen() {
        if (!history.state || 'index' in history.state === false) {
            const routeData: RouteData = {index: this.index}
            history.replaceState(routeData, '')
        } else {
            this.index = history.state.index
        }
        addEventListener('popstate', this.popstate)
        this.resolvePath();
        return this;
    }

    /**Open path */
    open(path: string | URL) {
        if (path instanceof URL) path = path.pathname;
        if (path === location.pathname) return this;
        this.index += 1;
        const routeData: RouteData = { index: this.index };
        history.pushState(routeData, '', path);
        $.routers.forEach(router => router.resolvePath())
        this.events.fire('pathchange', path, 'Forward');
        return this;
    }

    /**Back to previous page */
    back() { history.back(); }

    private popstate = (() => {
        // Forward
        if (history.state.index > this.index) { }
        // Back
        else if (history.state.index < this.index) {  }
        this.index = history.state.index;
        this.resolvePath();
        this.events.fire('pathchange', location.pathname, 'Forward');
    }).bind(this)

    private resolvePath(path = location.pathname) {
        if (!path.startsWith(this.basePath)) return;
        path = path.replace(this.basePath, '/').replace('//', '/')
        let found = false;
        const openCached = () => {
            const cacheContent = this.contentMap.get(path);
            if (cacheContent) {
                this.view.content(cacheContent);
                found = true;
                return true;
            }
            return false;
        }
        const create = (content: $Node | string) => {
            if (typeof content === 'string') content = new $Text(content);
            this.contentMap.set(path, content)
            this.view.content(content);
            found = true;
        }
        for (const route of this.routeMap.values()) {
            const [_routeParts, _pathParts] = [route.path.split('/').map(p => `/${p}`), path.split('/').map(p => `/${p}`)];
            _routeParts.shift(); _pathParts.shift();
            const data = {};
            for (let i = 0; i < _pathParts.length; i++) {
                const [routePart, pathPart] = [_routeParts.at(i), _pathParts.at(i)];
                if (!routePart || !pathPart) continue;
                if (routePart === pathPart) {
                    if (routePart === _routeParts.at(-1)) {
                        if (!openCached()) create(route.builder(data));
                        return;
                    }
                }
                else if (routePart.includes(':')) {
                    Object.assign(data, {[routePart.split(':')[1]]: pathPart.replace('/', '')})
                    if (routePart === _routeParts.at(-1)) {
                        if (!openCached()) create(route.builder(data));
                        return;
                    }
                }
            }
        }

        if (!found) this.events.fire('notfound', path);
    }
}
interface RouterEventMap {
    pathchange: [path: string, navigation: 'Back' | 'Forward'];
    notfound: [path: string]
}

type RouteData = {
    index: number;
    data?: any;
}