"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setBPMconfig;

/**
 * Storages the configuration information of the BPM server
 * @param {*} configData 
 */
function setBPMconfig(configData) {
  if (!configData.createProcessInstance || !configData.completeTask || !configData.cancelProcess) {
    throw new Error('No config provided for BPM server');
  }

  localStorage.setItem('bpmConfig', JSON.stringify(configData));
}