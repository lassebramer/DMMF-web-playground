import { Vec } from "./vector";
import { Model } from './model';
export declare function drawSpline(ctx: CanvasRenderingContext2D, start: Vec, end: Vec): void;
export declare class Spring {
    from_model_idx: number;
    to_model_idx: number;
    from_field_idx: number;
    to_field_idx: number;
    length: number;
    constructor(from_model_idx: number, to_model_idx: number, from_field_idx: number, to_field_idx: number);
    render(ctx: CanvasRenderingContext2D, models: Model[]): void;
}
