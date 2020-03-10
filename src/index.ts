/*globals _:false */
"use strict";
// import { getDMMF } from '@prisma/sdk';

import "babel-polyfill";
import _ from "lodash";
import { getDMMF } from "@prisma/sdk";
import { World } from "./world";
import { DMMF } from "@prisma/generator-helper";

// import datamodel from '../public/datamodel.json';

var created = false;
var world: World;
var button = document.getElementById("getTree");
if (button) button.onclick = sendData;

function sendData() {
  var textBox = <HTMLInputElement>document.getElementById("preParse");
  var str = textBox.value;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/getDMMF", true);

  xhr.onload = async function() {
    if (this.status == 200) {
      let dmmf = JSON.parse(this.responseText);
      if (!created) {
        world = new World("canvas", dmmf.datamodel as DMMF.Datamodel);
      } else {
        world.newModel(dmmf.datamodel as DMMF.Datamodel);
      }
      created = true;
    } else {
      console.log(this.status);
    }
  };
  xhr.send(str);
}
