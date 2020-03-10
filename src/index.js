/*globals _:false */
'use strict';
exports.__esModule = true;
var world_1 = require("./world");
// import datamodel from '../public/datamodel.json';
console.log('index.ts');
var button = document.getElementById("getTree");
if (button)
    button.onclick = sendData;
function sendData() {
    var _a;
    console.log("clicked button");
    var str = (_a = document.getElementById("preParse")) === null || _a === void 0 ? void 0 : _a.textContent;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/getDMMF", true);
    xhr.onload = function () {
        if (this.status == 200) {
            console.log(this.responseText);
            var dmmf = JSON.parse(this.responseText);
            var world = new world_1.World("canvas", dmmf);
        }
    };
    xhr.send(str);
    console.log(str);
}
