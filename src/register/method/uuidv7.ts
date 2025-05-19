import { uuidv7, type UUIDV7 } from "#lib/uuidv7"

declare module '../../core' {
    /**
    * UUIDv7 features a time-ordered value field derived from the widely implemented and well-known Unix Epoch timestamp source,
    * the number of milliseconds since midnight 1 Jan 1970 UTC, leap seconds excluded. 
    * ElexisJS UUIDv7 use the format as below:
    * ```txt
    *   0                   1                   2                   3
        0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
        +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
        |                           unix_ts_ms                          |
        +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
        |          unix_ts_ms           |  ver  |       worker_id       |
        +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
        |var|                        counter                            |
        +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
        |                             rand                              |
        +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
        ```
    * Which:
        1. unix_ts_ms: 48-bit big-endian unsigned number of the Unix Epoch timestamp in milliseconds.
        2. ver: 4-bit UUID version number, set to 0b0111 (7).
        3. worker_id: 12-bit machine ID, which can defined by developer.
        4. var: 2-bit variant field defined by [RFC 9562](https://www.rfc-editor.org/rfc/rfc9562#variant_field), set to 0b10.
        5. counter: 30-bit counter that ensures the increasing order of IDs generated within a milisecond.
        6. rand: 32-bit random number.
    */
    export function uuidv7(options?: { workerId?: number }): UUIDV7
}

Object.assign($, {
    uuidv7(options: { workerId?: number } = { workerId: 0 }) { return uuidv7(options) },
})