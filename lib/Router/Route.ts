import { $Node } from "../$Node";

export class Route<Path extends string = string> {
    path: string;
    builder: (path: PathParams<Path>) => string | $Node;
    constructor(path: Path, builder: (params: PathParams<Path>) => $Node | string) {
        if (!path.startsWith('/')) throw new Error('PATH SHOULD START WITH /')
        this.path = path;
        this.builder = builder;
    }
}

type PathParams<Path> = Path extends `${infer Segment}/${infer Rest}`
    ? Segment extends `:${infer Param}` ? Record<Param, string> & PathParams<Rest> : PathParams<Rest>
    : Path extends `:${infer Param}` ? Record<Param,string> : {}

type A = PathParams<'/:userId/post/:postId'>