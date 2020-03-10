import { Vec } from "./vector";
export declare function trim(x: number, min_value: number, max_value: number): number;
interface Postion {
    x: number;
    y: number;
}
export declare function dist<T extends Postion>(a: T, b: T): number;
export declare function system_time(): number;
export declare function my_rand(min: number, max: number): number;
export declare function getFieldY(modelPos: Vec, field_idx: number): number;
export {};
