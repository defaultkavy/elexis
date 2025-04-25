let uuidv7_counter = Math.trunc(Math.random() * Math.pow(2, 30)), uuidv7_ts_ms = '0';
export function _uuidv7(options: { workerId?: number } = { workerId: 0 }) {
    const unix_ts_ms = `${Date.now().toString(2)}`.padStart(48, '0') // 48 bits
    const ver = `0111`; // 4 bits
    uuidv7_ts_ms = unix_ts_ms;
    const worker_id = options.workerId ? options.workerId.toString().padStart(12, '0') : '0'.padStart(12, '0') // 12-bit
    const _var = '10' // 2 bits
    const counter = (uuidv7_ts_ms === unix_ts_ms ? uuidv7_counter = uuidv7_counter + 1 : uuidv7_counter = Math.trunc(Math.random() * Math.pow(2, 30)) ).toString(2).padStart(30, '0'); // 30 bits
    const rand = Array.from({length: 32}).map(() => [`0`, `1`][Math.round(Math.random() * 1)]).join(''); // 32 bits
    const bits = `${unix_ts_ms}${ver}${worker_id}${_var}${counter}${rand}`;
    const hex = `${binaryToHex(unix_ts_ms)}${binaryToHex(ver)}${binaryToHex(worker_id)}${binaryToHex(`${_var}${counter}`)}${binaryToHex(rand)}`;
    return { 
        bits, hex, ts: Number(`0b${unix_ts_ms}`).toString(10), 
        counter: parseInt(counter, 2), 
        rand: parseInt(rand, 2),
        str: `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`,
        toString() { return this.str }
    }
}

function binaryToHex(bit: string) { return parseInt(bit, 2).toString(16).padStart(bit.length / 4, '0') }