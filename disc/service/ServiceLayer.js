"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProcInstService = createProcInstService;
exports.completeTaskService = completeTaskService;
exports.cancelProcessSercive = cancelProcessSercive;

var _camundaService = require("./camundaService");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function createProcInstService(_x, _x2) {
  return _createProcInstService.apply(this, arguments);
}

function _createProcInstService() {
  _createProcInstService = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(procDefKey, variables) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _camundaService.createProcessInstance)({
              procDefKey: procDefKey,
              variables: variables
            });

          case 3:
            return _context.abrupt("return", _context.sent);

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            throw new Error(_context.t0.message);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));
  return _createProcInstService.apply(this, arguments);
}

function completeTaskService(_x3, _x4) {
  return _completeTaskService.apply(this, arguments);
}

function _completeTaskService() {
  _completeTaskService = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(process, advance) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (process.task.id) {
              _context2.next = 2;
              break;
            }

            throw new Error('No active task to complete');

          case 2:
            _context2.prev = 2;
            _context2.next = 5;
            return (0, _camundaService.completeTask)(process.processId, advance, process.task);

          case 5:
            return _context2.abrupt("return", _context2.sent);

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](2);
            throw new Error(_context2.t0.message);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 8]]);
  }));
  return _completeTaskService.apply(this, arguments);
}

function cancelProcessSercive(_x5) {
  return _cancelProcessSercive.apply(this, arguments);
}

function _cancelProcessSercive() {
  _cancelProcessSercive = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(process) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _camundaService.cancelProcess)(process.processId);

          case 3:
            return _context3.abrupt("return", _context3.sent);

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);
            throw new Error(_context3.t0.message);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 6]]);
  }));
  return _cancelProcessSercive.apply(this, arguments);
}