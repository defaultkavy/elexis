import { $EventManager, type $EventMap } from "./$EventManager";
import { type $Node } from "../node/$Node";

export class $PointerManager extends $EventManager<$PointerManagerEventMap> {
    $node: $Node;
    map = new Map<number, $Pointer>();
    constructor($node: $Node) {
        super();
        this.$node = $node;
        this.$node.on('pointerdown', (e) => this.down(e))
        this.$node.on('pointerup', (e) => this.up(e))
        this.$node.on('pointermove', (e) => this.move(e))
        this.$node.on('pointercancel', (e) => this.cancel(e))
    }

    protected down(e: PointerEvent) {
        const pointer = new $Pointer(this, this.toData(e), $(e.target!))
        this.map.set(pointer.id, pointer);
        this.fire('down', pointer, e);
    }

    protected up(e: PointerEvent) {
        const pointer = this.map.get(e.pointerId);
        if (!pointer) return;
        this.map.delete(e.pointerId);
        this.fire('up', pointer, e);
    }

    protected move(e: PointerEvent) {
        const pointer = this.map.get(e.pointerId);
        if (!pointer) return;
        this.map.set(pointer.id, pointer);
        pointer.update(this.toData(e));
        if (!pointer.direction) {
            if (pointer.move_x > 5 || pointer.move_x < -5) pointer.direction = $PointerDirection.Horizontal
            else if (pointer.move_y > 5 || pointer.move_y < -5) pointer.direction = $PointerDirection.Vertical
        }
        this.fire('move', pointer, e);
    }

    protected cancel(e: PointerEvent) {
        const pointer = this.map.get(e.pointerId);
        if (!pointer) return;
        pointer.update(this.toData(e));
        this.map.delete(pointer.id);
        this.fire('cancel', pointer, e);
    }

    protected toData(e: PointerEvent): $PointerData {
        return {
            id: e.pointerId,
            type: e.pointerType as PointerType,
            width: e.width,
            height: e.height,
            x: e.x,
            y: e.y,
        }
    }
}

export interface $PointerManagerEventMap extends $EventMap {
    up: [$Pointer, PointerEvent];
    down: [$Pointer, PointerEvent];
    move: [$Pointer, PointerEvent];
    cancel: [$Pointer, PointerEvent];
}

export interface $Pointer extends $PointerData {}
export class $Pointer {
    initial_x: number;
    initial_y: number;
    movement_x: number = 0;
    movement_y: number = 0;
    $target: $Node;
    direction: $PointerDirection | null = null;
    protected manager: $PointerManager;
    constructor(manager: $PointerManager, data: $PointerData, target: $Node) {
        Object.assign(this, data);
        this.manager = manager;
        this.$target = target;
        this.initial_x = data.x;
        this.initial_y = data.y;
    }

    get move_x() { return this.x - this.initial_x }
    get move_y() { return this.y - this.initial_y }

    update(data: $PointerData) {
        const prev_move_x = this.move_x;
        const prev_move_y = this.move_y;
        Object.assign(this, data);
        this.movement_x = this.move_x - prev_move_x;
        this.movement_y = this.move_y - prev_move_y;
        return this;
    }

    delete() {
        this.manager.map.delete(this.id);
        return this;
    }
}

export interface $PointerData {
    id: number;
    type: PointerType;
    width: number;
    height: number;
    x: number;
    y: number;
}

export type PointerType = 'mouse' | 'pen' | 'touch'
export enum $PointerDirection { Horizontal, Vertical }