import { Vec } from "./vector";
import { Timer } from "./timer";
import { Spring } from "./spring";
import { Model } from './model';
import { DMMF } from '@prisma/generator-helper';
interface MyTouch {
    identifier: number;
    pageX: number;
    pageY: number;
    dragged_model: number;
    dragged_model_offset: Vec;
    timer: Timer;
    last_pos: Vec;
}
export declare class World {
    origin: number;
    models: Model[];
    radius: number;
    springs: Spring[];
    canvas: HTMLCanvasElement;
    timer: Timer;
    hover_model: number;
    dragged_model: number;
    dragged_model_offset: Vec;
    ongoingTouches: MyTouch[];
    num_touch_start: number;
    datamodel: DMMF.Datamodel;
    ctx: CanvasRenderingContext2D | null;
    simulate: boolean;
    select_start: Vec | null;
    selection: Model[];
    constructor(canvasid: string, datamodel: DMMF.Datamodel);
    init_rand: (model: Model) => void;
    loadSprings(): Spring[];
    init_world: () => void;
    get_dragged_indexes: () => number[];
    find_model: (point: Vec) => number;
    point_from_event: (event: MouseEvent) => Vec;
    mouseup: () => void;
    mousedown: (event: MouseEvent) => void;
    mousemove: (event: MouseEvent) => void;
    auto(): void;
    draw: () => void;
    toggleLayout: (ev: KeyboardEvent) => void;
    attach_handlers: () => void;
}
export {};
