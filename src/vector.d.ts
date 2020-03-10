export declare class Vec {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    trim(min_value: number, max_value: number): Vec;
    div(a: number | Vec): Vec;
    invert(): void;
    add(right: Vec): Vec;
    add_to(right: Vec): void;
    sub_to(right: Vec): void;
    sub(right: Vec): Vec;
    mult(value: number | Vec): Vec;
    dot_mult(right: Vec): number;
    calc_dist(p2: Vec): number;
    calc_dist_vec(p2: Vec): Vec;
    magnitude(): number;
    copy(): Vec;
}
