"use strict";
exports.__esModule = true;
var constants_1 = require("./constants");
function drawSpline(ctx, start, end) {
    var dist = start.calc_dist(end);
    ctx.beginPath();
    ctx.moveTo(start.x || 0, start.y || 0);
    ctx.bezierCurveTo(start.x + dist * 0.4 || 0, // cp1 x
    start.y || 0, // cp1 y
    end.x - dist * 0.4 || 0, // cp2 x
    end.y || 0, // cp2 y
    end.x || 0, // end x
    end.y || 0), //
        ctx.stroke();
}
exports.drawSpline = drawSpline;
var Spring = /** @class */ (function () {
    function Spring(from_model_idx, to_model_idx, from_field_idx, to_field_idx) {
        this.from_model_idx = from_model_idx;
        this.to_model_idx = to_model_idx;
        this.from_field_idx = from_field_idx;
        this.to_field_idx = to_field_idx;
        this.length = length || constants_1.STRING_LEN;
    }
    Spring.prototype.render = function (ctx, models) {
        var a = models[this.from_model_idx];
        var b = models[this.to_model_idx];
        var start = a.pos.copy();
        var end = b.pos.copy();
        end.y = end.y + (constants_1.FIELD_HEIGHT * (2 + this.to_field_idx));
        start.y = start.y + (constants_1.FIELD_HEIGHT * (2 + this.from_field_idx));
        start.x = start.x + a.width;
        drawSpline(ctx, start, end);
    };
    return Spring;
}());
exports.Spring = Spring;
