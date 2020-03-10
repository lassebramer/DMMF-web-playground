"use strict";
exports.__esModule = true;
var vector_1 = require("./vector");
var constants_1 = require("./constants");
var ModelField = /** @class */ (function () {
    function ModelField(parent, index, field) {
        this.parent = parent;
        this.index = index;
        this.field = field;
    }
    ModelField.prototype.getFieldType = function () {
        var typename = this.field.type;
        var isList = this.field.isList ? '[ ]' : '';
        var isRequired = this.field.isRequired ? '' : '?';
        return typename + isRequired + isList;
    };
    ModelField.prototype.render = function (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(this.parent.pos.x, this.parent.pos.y + constants_1.FIELD_HEIGHT * (this.index + 1), this.parent.width, constants_1.FIELD_HEIGHT);
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        var textY = this.parent.pos.y + (constants_1.FIELD_HEIGHT * (this.index + 1));
        ctx.beginPath();
        ctx.fillStyle = "gray";
        ctx.arc(this.parent.pos.x + 10, textY - 2.5, 3, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.fillText(this.field.name, this.parent.pos.x + 20, textY);
        ctx.textAlign = "right";
        ctx.fillText(this.getFieldType(), this.parent.pos.x + this.parent.width - 10, textY);
    };
    return ModelField;
}());
function getMaxTextWidth(model, ctx) {
    var padding = 20;
    var max = padding + ctx.measureText(model.name).width + padding;
    model.fields.forEach(function (field) {
        var width = padding + ctx.measureText(field.name).width + padding + ctx.measureText(field.type).width + padding;
        if (width > max) {
            max = width;
        }
    });
    return max;
}
var ModelHeader = /** @class */ (function () {
    function ModelHeader(parent, model) {
        this.parent = parent;
        this.height = 20;
        this.model = model;
    }
    ModelHeader.prototype.render = function (ctx) {
        ctx.fillStyle = "white";
        // console.log(this.parent.pos.x, this.parent.pos.y, this.parent.width, this.parent.height);
        ctx.fillRect(this.parent.pos.x, this.parent.pos.y, this.parent.width, this.parent.height);
        ctx.fillStyle = "#15BD76";
        ctx.fillRect(this.parent.pos.x, this.parent.pos.y, this.parent.width, this.height);
        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.fillText(this.model.name, this.parent.pos.x + this.height / 2, this.parent.pos.y + 13);
    };
    return ModelHeader;
}());
var Model = /** @class */ (function () {
    function Model(ctx, model, pos) {
        this.pos = pos || new vector_1.Vec();
        this.velocity = new vector_1.Vec();
        this.model = model;
        this.ctx = ctx;
        this.height = 20 + model.fields.length * 20;
        this.width = getMaxTextWidth(model, ctx);
    }
    Model.prototype.center = function () {
        return new vector_1.Vec(this.pos.x + (this.width / 2), this.pos.y + (this.height / 2));
    };
    Model.prototype.cx = function () {
        return this.pos.x + (this.width / 2);
    };
    Model.prototype.cy = function () {
        return this.pos.y + (this.height / 2);
    };
    Model.prototype.render = function (ctx, hovering, dragging) {
        var _this = this;
        var header = new ModelHeader(this, this.model);
        header.render(ctx);
        ctx.fillStyle = "white";
        ctx.rect(this.pos.x, this.pos.y + 20, this.width, this.height - 20);
        this.model.fields.forEach(function (field, i) {
            var f = new ModelField(_this, i + 1, field);
            f.render(ctx);
        });
    };
    return Model;
}());
exports.Model = Model;
