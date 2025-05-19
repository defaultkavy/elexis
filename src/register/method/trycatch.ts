declare module '../../core' {
    export namespace $ {
        export function trycatch<D>(callback: () => D): Result<D, Error>
    }
}

Object.assign($, {
    trycatch<D>(callback: () => D): Result<D, Error> {
        try {
            const data = callback();
            return [data, null];
        } catch (err) {
            return [null, err instanceof Error ? err : new Error(JSON.stringify(err))];
        }
    }
})