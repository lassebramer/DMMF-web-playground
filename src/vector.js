"use strict";
exports.__esModule = true;
var utils_1 = require("./utils");
var Vec = /** @class */ (function () {
    function Vec(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    ;
    Vec.prototype.trim = function (min_value, max_value) {
        return new Vec(utils_1.trim(this.x, min_value, max_value), utils_1.trim(this.y, min_value, max_value));
    };
    ;
    Vec.prototype.div = function (a) {
        if (typeof a === 'number') {
            return new Vec(this.x / a, this.y / a);
        }
        else {
            return new Vec(this.x / a.x, this.y / a.y);
        }
    };
    ;
    Vec.prototype.invert = function () {
        this.x = -1 * this.x;
        this.y = -1 * this.y;
    };
    ;
    Vec.prototype.add = function (right) {
        return new Vec(this.x + right.x, this.y + right.y);
    };
    ;
    Vec.prototype.add_to = function (right) {
        this.x += right.x;
        this.y += right.y;
    };
    ;
    Vec.prototype.sub_to = function (right) {
        this.x -= right.x;
        this.y -= right.y;
    };
    ;
    Vec.prototype.sub = function (right) {
        return new Vec(this.x - right.x, this.y - right.y);
    };
    ;
    Vec.prototype.mult = function (value) {
        if (typeof value === 'number') {
            return new Vec(this.x * value, this.y * value);
        }
        else {
            return new Vec(this.x * value.x, this.y * value.y);
        }
    };
    ;
    Vec.prototype.dot_mult = function (right) {
        return this.x * right.x + this.y * right.y;
    };
    ;
    Vec.prototype.calc_dist = function (p2) {
        var p1 = this;
        return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
    };
    ;
    Vec.prototype.calc_dist_vec = function (p2) {
        var p1 = this;
        var dist = new Vec(p2.x - p1.x, p2.y - p1.y);
        return dist;
    };
    ;
    Vec.prototype.magnitude = function () {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    };
    Vec.prototype.copy = function () {
        return new Vec(this.x, this.y);
    };
    return Vec;
}());
exports.Vec = Vec;
