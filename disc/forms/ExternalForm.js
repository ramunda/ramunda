"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _semanticUiReact = require("semantic-ui-react");

var _ServiceLayer = require("../service/ServiceLayer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Component that renders a external form
 */
var ExternalForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ExternalForm, _React$Component);

  function ExternalForm(props) {
    var _this;

    _classCallCheck(this, ExternalForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ExternalForm).call(this, props));
    _this.state = {
      process: _this.props.process
    };
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    _this.handleCancel = _this.handleCancel.bind(_assertThisInitialized(_this));
    return _this;
  }
  /**
  * In case the props.createInstance is present a process instance is created
  */


  _createClass(ExternalForm, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var process;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.props.creatInstance) {
                  _context.next = 11;
                  break;
                }

                _context.prev = 1;
                _context.next = 4;
                return (0, _ServiceLayer.createProcInstService)(this.props.procDefKey, this.props.variables);

              case 4:
                process = _context.sent;
                this.setState({
                  process: process
                });
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);
                this.setState({
                  error: _context.t0
                });

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 8]]);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
    /**
     * Function called from rendered external React component.
     * If customServer is true, handleSubmit only calls a function passed by the webapp, else its 
     * also requested a complete task from the BPM server
     * @param {*} process domain object representing the process instance
     * @param {*} advance value defines if it is requested the next or the previous task
     */

  }, {
    key: "handleSubmit",
    value: function () {
      var _handleSubmit = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(process, advance) {
        var task;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!this.props.onNext && !this.props.onBack)) {
                  _context2.next = 2;
                  break;
                }

                throw new Error("No function ".concat(advance ? 'next' : 'back', " provided"));

              case 2:
                if (!this.props.customServer) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return", advance ? this.props.onNext(process) : this.props.onBack(process));

              case 4:
                _context2.prev = 4;
                _context2.next = 7;
                return (0, _ServiceLayer.completeTaskService)(process, advance);

              case 7:
                task = _context2.sent;
                process.task = task;
                return _context2.abrupt("return", advance ? this.props.onNext(process) : this.props.onBack(process));

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](4);
                this.setState({
                  error: _context2.t0
                });

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 12]]);
      }));

      function handleSubmit(_x, _x2) {
        return _handleSubmit.apply(this, arguments);
      }

      return handleSubmit;
    }()
    /**
     * Function called from rendered external React component.
     * If customServer is true, handleCancel only calls a function passed by the webapp, else its 
     * also requested a cancel task from the BPM server
     * @param {*} process domain object representing the process instance
     */

  }, {
    key: "handleCancel",
    value: function () {
      var _handleCancel = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(process) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.props.onCancel) {
                  _context3.next = 2;
                  break;
                }

                throw new Error("No function cancel provided");

              case 2:
                if (!this.props.customServer) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt("return", this.props.onCancel());

              case 4:
                _context3.prev = 4;
                _context3.next = 7;
                return (0, _ServiceLayer.cancelProcessSercive)(process);

              case 7:
                return _context3.abrupt("return", this.props.onCancel());

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](4);
                this.setState({
                  error: _context3.t0
                });

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[4, 10]]);
      }));

      function handleCancel(_x3) {
        return _handleCancel.apply(this, arguments);
      }

      return handleCancel;
    }()
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement(_react["default"].Fragment, null, this.state.process && !this.state.error && _react["default"].cloneElement(this.props.externalForm, {
        process: this.state.process,
        onSubmit: this.handleSubmit,
        onCancel: this.handleCancel
      }), this.state.error && _react["default"].createElement(_semanticUiReact.Container, null, _react["default"].createElement(_semanticUiReact.Message, {
        negative: true
      }, _react["default"].createElement(_semanticUiReact.Message.Header, null, this.state.error.message))));
    }
  }]);

  return ExternalForm;
}(_react["default"].Component);

exports["default"] = ExternalForm;