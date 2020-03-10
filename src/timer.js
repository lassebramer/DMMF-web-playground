"use strict";
exports.__esModule = true;
var utils_1 = require("./utils");
var Timer = /** @class */ (function () {
    function Timer() {
        this.cur_time = 0;
        this.time_diff = 0;
        this.mark_time();
        this.epoch_time = utils_1.system_time();
    }
    Timer.prototype.mark_time = function () {
        var time = utils_1.system_time() - this.epoch_time;
        this.time_diff = Math.min(time - this.cur_time, 0.05);
        this.cur_time = time;
    };
    ;
    return Timer;
}());
exports.Timer = Timer;
