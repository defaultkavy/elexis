export function _orArrayResolve<T>(multable: OrArray<T>) {
    if (multable instanceof Array) return multable;
    else return [multable];
}