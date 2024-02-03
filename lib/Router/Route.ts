import { $EventManager, $EventMethod, EventMethod } from "../$EventManager";
import { $Node } from "../$Node";
export class Route<Path extends string | PathResolverFn> {
    path: string | PathResolverFn;
    builder: (params: PathParamResolver<Path>, record: RouteRecord) => $Node | string;
    constructor(path: Path, builder: (params: PathParamResolver<Path>, record: RouteRecord) => $Node | string) {
        this.path = path;
        this.builder = builder;
    }
}

type PathParams<Path> = Path extends `${infer Segment}/${infer Rest}`
    ? Segment extends `${string}:${infer Param}` ? Record<Param, string> & PathParams<Rest> : PathParams<Rest>
    : Path extends `${string}:${infer Param}` ? Record<Param,string> : {}

export type PathResolverFn = (path: string) => undefined | string;

type PathParamResolver<P extends PathResolverFn | string> = P extends PathResolverFn
? undefined : PathParams<P>

// type PathResolverRecord<P extends PathResolverFn> = {
//     [key in keyof ReturnType<P>]: ReturnType<P>[key]
// }


export interface RouteRecord extends $EventMethod<RouteRecordEventMap> {};
@EventMethod
export class RouteRecord {
    id: string;
    readonly content?: $Node;
    events = new $EventManager<RouteRecordEventMap>().register('open')
    constructor(id: string) {
        this.id = id;
    }
}

export interface RouteRecordEventMap {
    'open': [path: string, record: RouteRecord]
}