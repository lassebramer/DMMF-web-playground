import { Vec } from "./vector";
import { DMMF } from '@prisma/generator-helper';
export declare class Model {
    pos: Vec;
    velocity: Vec;
    model: DMMF.Model;
    height: number;
    width: number;
    ctx: CanvasRenderingContext2D;
    constructor(ctx: CanvasRenderingContext2D, model: DMMF.Model, pos?: Vec);
    center(): Vec;
    cx(): number;
    cy(): number;
    render(ctx: CanvasRenderingContext2D, hovering: boolean, dragging: boolean): void;
}
