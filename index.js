"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DefaultForm", {
  enumerable: true,
  get: function get() {
    return _DefaultForm["default"];
  }
});
Object.defineProperty(exports, "CustomForm", {
  enumerable: true,
  get: function get() {
    return _CustomForm["default"];
  }
});
Object.defineProperty(exports, "DefaultAndRadioButtonsForm", {
  enumerable: true,
  get: function get() {
    return _DefaultAndRadioButtonsForm["default"];
  }
});
Object.defineProperty(exports, "ExternalForm", {
  enumerable: true,
  get: function get() {
    return _ExternalForm["default"];
  }
});
Object.defineProperty(exports, "setBPMconfig", {
  enumerable: true,
  get: function get() {
    return _configBpmServer["default"];
  }
});

var _DefaultForm = _interopRequireDefault(require("./forms/DefaultForm"));

var _CustomForm = _interopRequireDefault(require("./forms/CustomForm"));

var _DefaultAndRadioButtonsForm = _interopRequireDefault(require("./forms/DefaultAndRadioButtonsForm"));

var _ExternalForm = _interopRequireDefault(require("./forms/ExternalForm"));

var _configBpmServer = _interopRequireDefault(require("./service/configBpmServer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }