"use strict";
exports.__esModule = true;
var dagre = require("dagre");
var vector_1 = require("./vector");
var type = ["LR", "RL", "TB", "BT"];
var selection = 0;
function autolayout(models, connections) {
    var g = new dagre.graphlib.Graph();
    // Set an object for the graph label
    g.setGraph({
        rankdir: type[selection]
    });
    // Default to assigning a new object as a label for each new edge.
    g.setDefaultEdgeLabel(function () { return {}; });
    models.forEach(function (model, i) {
        g.setNode(i.toString(), { label: model.model.name, width: model.width, height: model.height });
    });
    connections.forEach(function (conn, i) {
        g.setEdge(conn.from_model_idx.toString(), conn.to_model_idx.toString());
    });
    dagre.layout(g);
    g.nodes().forEach(function (v) {
        var node = g.node(v);
        var pos = new vector_1.Vec(node.x, node.y);
        models[parseInt(v)].pos = pos;
    });
    var graph = g.graph();
    if (selection === 4) {
        selection = 0;
    }
    else {
        selection += 1;
    }
    return { width: graph.width, height: graph.height };
}
exports.autolayout = autolayout;
