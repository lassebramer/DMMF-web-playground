/*globals _:false */
"use strict";
exports.__esModule = true;
var vector_1 = require("./vector");
var lodash_1 = require("lodash");
var timer_1 = require("./timer");
var utils_1 = require("./utils");
var spring_1 = require("./spring");
// import { STRING_LEN, NUM_STEPS } from "./constants";
var model_1 = require("./model");
var darge_1 = require("./darge");
var WIDTH = 100;
var HEIGHT = 120;
var World = /** @class */ (function () {
    function World(canvasid, datamodel) {
        var _this = this;
        this.init_rand = function (model) {
            console.log('world.ts');
            model.pos.x = utils_1.my_rand(WIDTH, _this.canvas.width - model.width);
            model.pos.y = utils_1.my_rand(HEIGHT, _this.canvas.height - model.height);
            model.velocity.x = utils_1.my_rand(-1, 1);
            model.velocity.y = utils_1.my_rand(1, 2);
        };
        this.init_world = function () {
            _this.springs = _this.loadSprings();
            for (var i = 0; i < _this.datamodel.models.length; i++) {
                var prismaModel = _this.datamodel.models[i];
                var ctx = _this.canvas.getContext("2d");
                var p = new model_1.Model(ctx, prismaModel);
                _this.init_rand(p);
                _this.models.push(p);
            }
            _this.auto();
        };
        this.get_dragged_indexes = function () {
            return lodash_1.chain(_this.ongoingTouches)
                .map("dragged_model")
                .push(_this.dragged_model)
                .without(-1)
                .value();
        };
        this.find_model = function (point) {
            return _this.models.findIndex(function (x) {
                var d = utils_1.dist(point, x.center());
                return d < x.width / 2 || d < x.height / 2;
            });
        };
        this.point_from_event = function (event) {
            var rect = _this.canvas.getBoundingClientRect();
            return new vector_1.Vec(event.clientX - rect.left, event.clientY - rect.top);
        };
        this.mouseup = function () {
            _this.dragged_model = -1;
            _this.select_start = null;
        };
        this.mousedown = function (event) {
            var mousedown_point = _this.point_from_event(event);
            _this.dragged_model = _this.find_model(mousedown_point);
            if (_this.dragged_model == -1) {
                _this.select_start = mousedown_point;
            }
            else {
                _this.dragged_model_offset = _this.models[_this.dragged_model].pos.sub(mousedown_point);
            }
        };
        this.mousemove = function (event) {
            var mouse_point = _this.point_from_event(event);
            if (_this.dragged_model != -1) {
                var mouse_speed = new vector_1.Vec(event.movementX, event.movementY);
                var newpoint = _this.point_from_event(event);
                _this.models[_this.dragged_model].pos = newpoint.add(_this.dragged_model_offset);
                _this.models[_this.dragged_model].velocity = mouse_speed.mult(20);
                _this.draw();
                return;
            }
            else if (_this.select_start && _this.ctx) {
                // This Only Renders when the mouse is being moved
                _this.ctx.strokeStyle = "black";
                _this.ctx.lineWidth = 1;
                _this.ctx.strokeRect(_this.select_start.x, _this.select_start.y, mouse_point.x - _this.select_start.x, mouse_point.y - _this.select_start.y);
                _this.ctx.lineWidth = 1;
            }
            _this.hover_model = _this.find_model(mouse_point);
        };
        this.draw = function () {
            _this.timer.mark_time();
            _this.origin += 10;
            if (_this.origin > 500)
                _this.origin = 10;
            var ctx = _this.ctx;
            if (ctx) {
                // ctx.canvas.width = window.innerWidth;
                // ctx.canvas.height = window.innerHeight;
                ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
                ctx.fillStyle = "rgb(244, 248, 250)";
                ctx.fillRect(0, 0, _this.canvas.width, _this.canvas.height);
                // Render Spring Connections
                ctx.strokeStyle = "#808080";
                // ctx.setLineDash([4, 4]);
                _this.springs.forEach(function (spring, i) {
                    spring.render(ctx, _this.models);
                });
                // Render Models
                _this.models.forEach(function (model, i) {
                    model.render(ctx, _this.hover_model === i, _this.dragged_model === i);
                });
            }
            else {
                console.error("Canvas Context Not Found");
            }
        };
        this.toggleLayout = function (ev) {
            if (ev.key === "a") {
                console.log("AutoLayout");
                _this.auto();
            }
        };
        this.attach_handlers = function () {
            _this.canvas.addEventListener("mouseup", _this.mouseup, false);
            _this.canvas.addEventListener("mousemove", _this.mousemove, false);
            _this.canvas.addEventListener("mousedown", _this.mousedown, false);
            window.addEventListener("keydown", _this.toggleLayout, false);
            setInterval(_this.draw, 30);
        };
        this.origin = 0;
        this.timer = new timer_1.Timer();
        this.timer.mark_time();
        this.models = [];
        this.radius = 40;
        this.springs = [];
        this.datamodel = datamodel;
        this.canvas = document.getElementById(canvasid);
        this.ctx = this.canvas.getContext("2d");
        this.simulate = true;
        this.hover_model = -1;
        this.dragged_model = -1;
        this.dragged_model_offset = new vector_1.Vec();
        this.ongoingTouches = [];
        this.select_start = null;
        this.selection = [];
        this.num_touch_start = 0;
        this.init_world();
        this.attach_handlers();
    }
    World.prototype.loadSprings = function () {
        var _this = this;
        var loadedRelations = [];
        var connections = [];
        this.datamodel.models.forEach(function (model, i) {
            model.fields.forEach(function (field, fieldIdx) {
                if (field.kind === 'object' && field.relationName && !loadedRelations.includes(field.relationName)) {
                    loadedRelations.push(field.relationName);
                    var from_model_idx = i;
                    var from_field_idx = fieldIdx;
                    var to_model_idx = _this.datamodel.models.findIndex(function (m) { return m.name === field.type; });
                    var to_model = _this.datamodel.models[to_model_idx];
                    var to_field_idx = to_model.fields.findIndex(function (f) { return field.relationName === f.relationName && f.name !== field.name; });
                    if (to_model_idx !== -1)
                        connections.push(new spring_1.Spring(from_model_idx, to_model_idx, from_field_idx, to_field_idx));
                }
            });
        });
        return connections;
    };
    World.prototype.auto = function () {
        var dims = darge_1.autolayout(this.models, this.springs);
        console.log("dim", dims);
        if (dims.width && dims.height) {
            console.log("Setting");
            this.canvas.height = dims.height + 300;
            this.canvas.width = window.innerWidth > dims.width + 300 ? window.innerWidth : dims.width + 300;
        }
    };
    return World;
}());
exports.World = World;
