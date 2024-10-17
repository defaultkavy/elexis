import { $Element } from "..";

export class $FocusManager {
    layerMap = new Map<number, $FocusLayer>();
    currentLayer?: $FocusLayer;
    historyList: $FocusLayer[] = [];
    constructor() {}
    
    layer(id: number) {
        const layer = this.layerMap.get(id) ?? new $FocusLayer(id);
        this.layerMap.set(layer.id, layer);
        return layer;
    }
    next() { return this.select($FocusNavigation.Next) }
    prev() { return this.select($FocusNavigation.Prev) }
    up() { return this.select($FocusNavigation.Up) }
    down() { return this.select($FocusNavigation.Down) }
    right() { return this.select($FocusNavigation.Right) }
    left() { return this.select($FocusNavigation.Left) }

    blur() {
        this.currentLayer?.blur();
        return this;
    }

    select(navigation: $FocusNavigation) {
        this.currentLayer = this.currentLayer ?? [...this.layerMap.values()].at(0);
        if (!this.currentLayer) return this;
        const $focused = this.currentLayer.currentFocus;
        const eleList = this.currentLayer.elementSet.array;
        if (!$focused) { this.currentLayer.focus(this.currentLayer.beforeBlur ?? eleList.at(0)); return this; }
        const eleIndex = eleList.indexOf($focused)
        switch (navigation) {
            case $FocusNavigation.Next:
            case $FocusNavigation.Prev: {
                let targetIndex = navigation === 0 ? eleIndex + 1 : eleIndex - 1;
                if (targetIndex === eleList.length && this.currentLayer.loop()) targetIndex = 0;
                else if (targetIndex === -1 && !this.currentLayer.loop()) targetIndex = 0;
                this.currentLayer.focus(eleList.at(targetIndex));
                break;
            }
            case $FocusNavigation.Down:
            case $FocusNavigation.Left:
            case $FocusNavigation.Right:
            case $FocusNavigation.Up: {
                const focusedPosition = $focused.coordinate();
                if (!focusedPosition) break;
                const focusedCoordinate = $.call(() => {
                    switch (navigation) {
                        case $FocusNavigation.Up: return {y: focusedPosition.y, x: focusedPosition.x / 2}
                        case $FocusNavigation.Down: return {y: focusedPosition.y + focusedPosition.height, x: focusedPosition.x / 2}
                        case $FocusNavigation.Left: return {y: focusedPosition.y / 2, x: focusedPosition.x}
                        case $FocusNavigation.Right: return {y: focusedPosition.y / 2, x: focusedPosition.x + focusedPosition.width}
                    }
                })
                const eleInfoList = eleList.map($ele => {
                    if ($ele === $focused) return;
                    const elePosition = $ele.coordinate();
                    if (!elePosition) return;
                    const eleCoordinate = $.call(() => {
                        switch (navigation) {
                            case $FocusNavigation.Up: return {y: elePosition.y + elePosition.height, x: elePosition.x / 2};
                            case $FocusNavigation.Down: return {y: elePosition.y, x: elePosition.x / 2};
                            case $FocusNavigation.Left: return {y: elePosition.y / 2, x: elePosition.x + elePosition.width};
                            case $FocusNavigation.Right: return {y: elePosition.y / 2, x: elePosition.x};
                        }
                    })
                    return {
                        $ele, elePosition,
                        distance: Math.sqrt((eleCoordinate.x - focusedCoordinate.x) ** 2 + (eleCoordinate.y - focusedCoordinate.y) ** 2)
                    }
                }).detype(undefined).filter(({elePosition}) => {
                    switch (navigation) {
                        case $FocusNavigation.Up: if (elePosition.y + elePosition.height >= focusedPosition.y) return false; break;
                        case $FocusNavigation.Down: if (elePosition.y <= focusedPosition.y + focusedPosition.height) return false; break;
                        case $FocusNavigation.Left: if (elePosition.x + elePosition.width >= focusedPosition.x) return false; break;
                        case $FocusNavigation.Right: if (elePosition.x <= focusedPosition.x + focusedPosition.width) return false; break;
                    }
                    return true;
                })
                const $target = eleInfoList.sort((a, b) => a.distance - b.distance).at(0)?.$ele;
                this.currentLayer.focus($target);
            }
        }
        return this;
    }
}

export enum $FocusNavigation { Next, Prev, Up, Down, Right, Left }

export class $FocusLayer {
    id: number;
    elementSet = new Set<$Element>();
    entrySet = new Set<$Element>();
    beforeBlur?: $Element;
    currentFocus?: $Element;
    private __$property__ = {
        loop: true,
        scrollThreshold: 0
    }
    constructor(id: number) {
        this.id = id
        this.add = this.add.bind(this);
        this.entry = this.entry.bind(this);
    }

    add($elements: OrArray<$Element>) {
        $.orArrayResolve($elements).forEach($element => {
            this.elementSet.add($element);
            $element.tabIndex(0);
        });
        return this;
    }

    remove($element: $Element) {
        this.elementSet.delete($element);
        return this;
    }

    entry($elements: OrArray<$Element>) {
        $.orArrayResolve($elements).forEach(this.entrySet.add.bind(this.entrySet))
        return this;
    }

    focus($element: $Element | undefined) {
        if (!$element) return this;
        $element.hide(false);
        const {scrollTop, scrollLeft} = document.documentElement;
        const position = $.call(() => {
            const rect = $element.domRect()
            return {
                left: rect.left + scrollLeft,
                top: rect.top + scrollTop,
                right: rect.right + scrollLeft,
                bottom: rect.bottom + scrollTop,
                height: rect.height,
                width: rect.width
            }
        })
        const {scrollThreshold} = this.__$property__;
        this.blur();
        this.currentFocus = $element;
        if (scrollTop > position.top - scrollThreshold // scroll after item threshold
            || scrollTop > position.bottom + scrollThreshold
        ) document.documentElement.scrollTo({left: position.left - scrollThreshold, top: position.top - scrollThreshold});
        if (scrollTop + innerHeight < position.top + scrollThreshold // scroll before item
            || scrollTop + innerHeight < position.bottom + scrollThreshold
        ) document.documentElement.scrollTo({left: position.left - scrollThreshold, top: (position.bottom - innerHeight) + scrollThreshold});
        $element.attribute('focus', '')
        $element.focus({preventScroll: true});
        return this;
    }

    blur() {
        if (!this.currentFocus) return this;
        this.beforeBlur = this.currentFocus;
        this.currentFocus.attribute('focus', null);
        this.currentFocus?.blur();
        this.currentFocus = undefined;
        return this;
    }

    removeAll() {
        this.elementSet.clear();
        return this;
    }

    loop(): boolean;
    loop(boolean: boolean): this;
    loop(boolean?: boolean) { return $.fluent(this, arguments, () => this.__$property__.loop, () => $.set(this.__$property__, 'loop', boolean)) }

    scrollThreshold(): number;
    scrollThreshold(number: number): this;
    scrollThreshold(number?: number) { return $.fluent(this, arguments, () => this.__$property__.scrollThreshold, () => $.set(this.__$property__, 'scrollThreshold', number)) }
}