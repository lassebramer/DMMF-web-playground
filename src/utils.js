"use strict";
exports.__esModule = true;
var constants_1 = require("./constants");
function trim(x, min_value, max_value) {
    return Math.min(Math.max(x, min_value), max_value);
}
exports.trim = trim;
function dist(a, b) {
    return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}
exports.dist = dist;
function system_time() {
    return new Date().getTime() / 1000;
}
exports.system_time = system_time;
function my_rand(min, max) {
    var r = Math.random();
    //r=r%1000;
    return r * (max - min) + min;
}
exports.my_rand = my_rand;
function getFieldY(modelPos, field_idx) {
    return modelPos.y + (constants_1.FIELD_HEIGHT * (field_idx + 1));
}
exports.getFieldY = getFieldY;
