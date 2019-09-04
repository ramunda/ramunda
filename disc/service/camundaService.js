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

/**
 * Http request for a specific url
 * @param {*} url for the request
 * @param {*} reqInit options for the request
 */
function myfetch(url, reqInit) {
  var request = new Request(url, reqInit);
  return fetch(request).then(function (response) {
    return response.json();
  });
}
/**
 * Makes a get request for a specific url
 * @param {*} url for the request
 */


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
/**
 * Makes a post for a specific url
 * @param {*} url for the specific post
 * @param {*} body containing the information for the post
 */


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
/**
 * Function responsible for communicating with BPM server to create a process instance
 * @param {*} body constains the information necessary to create a process instance
 */


function createProcessInstance(_x) {
  return _createProcessInstance.apply(this, arguments);
}
/**
 * Function responsible for communicating with BPM server to complete a task
 * @param {*} procInst id representing the process instance
 * @param {*} advance depending on the value requests the next task or the previous task
 * @param {*} task object containing the information of the task
 */


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
    outParameters: formatParamsToRequest(task.parameters, 'r')
  };
  return fetchPost(url, body).then(function (taskDTO) {
    return formatTask(taskDTO);
  });
}
/**
 * Function responsible for communicating with BPM server to cancel a process
 * @param {*} procInst id of the process instance to cancel
 */


function cancelProcess(procInst) {
  return fetchGet(getConfig().cancelProcess.replace(':procInst', procInst));
}
/**
 * Transforms a process object from the response of the server to a domain object
 * @param {*} processDTO domain object that is going to contain the information of the process
 */


function formatProcess(processDTO) {
  var process = {
    processId: processDTO.procInstId,
    task: {}
  };
  process.task = formatTask(processDTO.activeTask);
  process.milestones = processDTO.milestones;
  return process;
}
/**
 * Transforms a task object from the response of the server to a domain object
 * @param {*} taskDTO domain object that is going to contain the information of the task
 */


function formatTask(taskDTO) {
  var task = {
    id: taskDTO.id,
    parameters: {}
  };
  if (taskDTO.inParameters) paramsParser(taskDTO.inParameters, task, false, 'w');
  if (taskDTO.outParameters) paramsParser(taskDTO.outParameters, task, true, 'r');
  task.user = taskDTO.user;
  task.milestone = taskDTO.milestone;
  return task;
}
/**
 * Parses parameters from the response object to domain object
 * @param {*} params parameter from response object
 * @param {*} task domain object task
 * @param {*} readOnly defines if the variable is supposed to be changed or not
 * @param {*} type of the parameters: W -> inputs, R -> outputs, RW -> inouts
 */


function paramsParser(params, task, readOnly, type) {
  params.forEach(function (element) {
    task.parameters[element.key] = {};
    task.parameters[element.key].value = element.value != null ? element.value : '';
    task.parameters[element.key].readOnly = readOnly;
    task.parameters[element.key].type = type;
  });
}
/**
 * Formats the parameters to make a request
 * @param {*} parameters object containing the parameters
 * @param {*} type defines the type of parameter
 */


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
/**
 * Gets the configuration of the BPM server from the localStorage
 */


function getConfig() {
  return JSON.parse(localStorage.getItem('bpmConfig'));
}