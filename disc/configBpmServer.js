"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setBPMconfig;

//import fs from 'browserify-fs';
function setBPMconfig(configData) {
  try {
    localStorage.setItem('bpmConfig', JSON.stringify(configData));
  } catch (e) {
    throw new Error('Error saving BPM server configurations');
  }
}