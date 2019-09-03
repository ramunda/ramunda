"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProcessInstance = createProcessInstance;
exports.completeTask = completeTask;
exports.cancelProcess = cancelProcess;

require("cross-fetch/polyfill");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function myfetch(url, reqInit) {
  var request = new Request(url, reqInit);
  return fetch(request).then(function (response) {
    return response.json();
  });
}

function fetchGet(url) {
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  var RequestInit = {
    method: 'GET',
    headers: headers,
    mode: 'cors'
  };
  return myfetch(url, RequestInit);
}

function fetchPost(url, body) {
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  var RequestInit = {
    method: 'POST',
    headers: headers,
    mode: 'cors',
    body: JSON.stringify(body)
  };
  return myfetch(url, RequestInit);
}

function createProcessInstance(_x) {
  return _createProcessInstance.apply(this, arguments);
}

function _createProcessInstance() {
  _createProcessInstance = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(body) {
    var url;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = getConfig().createProcessInstance;
            return _context.abrupt("return", fetchPost(url, body).then(function (processDTO) {
              return formatProcess(processDTO);
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _createProcessInstance.apply(this, arguments);
}

function completeTask(procInst, advance, task) {
  var url = getConfig().completeTask.replace(':procInst', procInst);
  url = url.replace(':advance', advance);
  var body = {
    id: task.id,
    user: task.user,
    inParameters: formatParamsToRequest(task.parameters, 'w'),
    outParameters: formatParamsToRequest(task.parameters, 'r'),
    inOutParameters: formatParamsToRequest(task.parameters, 'rw')
  };
  return fetchPost(url, body).then(function (taskDTO) {
    return formatTask(taskDTO);
  });
}

function cancelProcess(procInst) {
  return fetchGet(getConfig().cancelProcess.replace(':procInst', procInst));
}

function formatProcess(processDTO) {
  var process = {
    processId: processDTO.procInstId,
    task: {}
  };
  process.task = formatTask(processDTO.activeTask);
  process.milestones = processDTO.milestones;
  return process;
}

function formatTask(taskDTO) {
  var task = {
    id: taskDTO.id,
    parameters: {}
  };
  if (taskDTO.inParameters) paramsParser(taskDTO.inParameters, task, false, 'w');
  if (taskDTO.outParameters) paramsParser(taskDTO.outParameters, task, true, 'r');
  if (taskDTO.inOutParameters) paramsParser(taskDTO.inOutParameters, task, false, 'rw');
  task.user = taskDTO.user;
  task.milestone = taskDTO.milestone;
  return task;
}

function paramsParser(params, task, readOnly, type) {
  params.forEach(function (element) {
    task.parameters[element.key] = {};
    task.parameters[element.key].value = element.value ? element.value : '';
    task.parameters[element.key].readOnly = readOnly;
    task.parameters[element.key].type = type;
  });
}

function formatParamsToRequest(parameters, type) {
  return Object.keys(parameters).filter(function (elem) {
    return parameters[elem].type === type;
  }).map(function (elem) {
    return {
      key: elem,
      value: parameters[elem].value
    };
  });
}

function getConfig() {
  return JSON.parse(localStorage.getItem('bpmConfig'));
}