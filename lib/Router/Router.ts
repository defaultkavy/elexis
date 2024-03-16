import { $Container } from "../$Container";
import { $EventManager, $EventMethod, EventMethod } from "../$EventManager";
import { $Text } from "../$Text";
import { PathResolverFn, Route, RouteRecord } from "./Route";
export interface Router extends $EventMethod<RouterEventMap> {};
@EventMethod
export class Router {
    routeMap = new Map<string | PathResolverFn, Route<any>>();
    recordMap = new Map<string, RouteRecord>();
    view: $Container;
    index: number = 0;
    events = new $EventManager<RouterEventMap>().register('pathchange', 'notfound', 'load');
    basePath: string;
    constructor(basePath: string, view: $Container) {
        this.basePath = basePath;
        this.view = view
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
            const routeData: RouteData = {index: this.index, data: {}}
            history.replaceState(routeData, '')
        } else {
            this.index = history.state.index
        }
        addEventListener('popstate', this.popstate)
        $.routers.add(this);
        this.resolvePath();
        this.events.fire('pathchange', location.href, 'Forward');
        return this;
    }

    /**Open path */
    open(path: string | undefined) {
        if (path === undefined) return;
        if (path === location.href) return this;
        this.index += 1;
        const routeData: RouteData = { index: this.index, data: {} };
        history.pushState(routeData, '', path);
        $.routers.forEach(router => router.resolvePath())
        this.events.fire('pathchange', path, 'Forward');
        return this;
    }

    /**Back to previous page */
    back() { history.back(); return this }

    replace(path: string) {
        history.replaceState({index: this.index}, '', path)
        $.routers.forEach(router => router.resolvePath(path));
        this.events.fire('pathchange', path, 'Forward');
        return this;
    }

    setStateData(key: string, value: any) {
        if (history.state.data === undefined) history.state.data = {};
        history.state.data[key] = value;
        return this;
    }

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
        const openCached = (pathId: string) => {
            const record = this.recordMap.get(pathId);
            if (record) {
                found = true;
                if (record.content && !this.view.contains(record.content)) this.view.content(record.content);
                record.events.fire('open', path, record);
                return true;
            }
            return false;
        }
        const create = (pathId: string, route: Route<any>, data: any) => {
            const record = new RouteRecord(pathId);
            let content = route.builder({
                params: data, 
                record: record, 
                loaded: () => {
                    record.events.fire('load', pathId, record);
                    this.events.fire('load', pathId);
                }
            });
            if (typeof content === 'string') content = new $Text(content);
            (record as Mutable<RouteRecord>).content = content;
            this.recordMap.set(pathId, record);
            this.view.content(content);
            record.events.fire('open', path, record);
            found = true;
        }
        for (const [pathResolver, route] of this.routeMap.entries()) {
            // PathResolverFn
            if (pathResolver instanceof Function) {
                const routeId = pathResolver(path)
                if (routeId) { if (!openCached(routeId)) create(routeId, route, undefined) }
                continue;
            }
            // string
            const [_routeParts, _pathParts] = [pathResolver.split('/').map(p => `/${p}`), path.split('/').map(p => `/${p}`)];
            _routeParts.shift(); _pathParts.shift();
            const data = {};
            let pathString = '';
            for (let i = 0; i < _pathParts.length; i++) {
                const [routePart, pathPart] = [_routeParts.at(i), _pathParts.at(i)];
                if (!routePart || !pathPart) continue;
                if (routePart === pathPart) {
                    pathString += pathPart;
                    if (routePart === _routeParts.at(-1)) {
                        if (!openCached(pathString)) create(pathString, route, data);
                        return;
                    }
                }
                else if (routePart.includes(':')) {
                    const [prefix, param] = routePart.split(':');
                    if (!pathPart.startsWith(prefix)) continue;
                    Object.assign(data, {[param]: pathPart.replace(prefix, '')})
                    pathString += pathPart;
                    if (routePart === _routeParts.at(-1)) {
                        if (!openCached(pathString)) create(pathString, route, data);
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
    notfound: [path: string];
    load: [path: string];
}

type RouteData = {
    index: number;
    data: {[key: string]: any};
}