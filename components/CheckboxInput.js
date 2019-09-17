"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

require("semantic-ui-css/semantic.min.css");

var _semanticUiReact = require("semantic-ui-react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Component for a input of type check box
 */
var CheckboxInput =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CheckboxInput, _React$Component);

  function CheckboxInput(props) {
    var _this;

    _classCallCheck(this, CheckboxInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CheckboxInput).call(this, props));
    _this.state = {
      value: _this.props.initValue ? _this.props.initValue : false
    };
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CheckboxInput, [{
    key: "handleChange",
    value: function handleChange(e, _ref) {
      var name = _ref.name;
      var newValue = !this.state.value;
      this.setState({
        value: newValue
      });
      this.props.handleChange(name, newValue);
    }
  }, {
    key: "render",
    value: function render() {
      var value = this.state.value;
      return _react["default"].createElement(_semanticUiReact.Form.Checkbox, {
        label: this.props.label,
        id: this.props.name,
        name: this.props.name,
        checked: value,
        onChange: this.handleChange
      });
    }
  }]);

  return CheckboxInput;
}(_react["default"].Component);

exports["default"] = CheckboxInput;