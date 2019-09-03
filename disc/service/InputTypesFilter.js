"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterDefaultInputs = filterDefaultInputs;
exports.filterRadioButtons = filterRadioButtons;
exports.filterDropdowns = filterDropdowns;
exports.filterCheckBox = filterCheckBox;

function filterDefaultInputs(params, options) {
  var auxDefaultInputs = filterInvisebleInputs(params, options);
  if (options && options.radioButtonsInfo) auxDefaultInputs = excludeOtherTypesThanDefault(auxDefaultInputs, options.radioButtonsInfo);
  if (options && options.dropdownInfo) auxDefaultInputs = excludeOtherTypesThanDefault(auxDefaultInputs, options.dropdownInfo);
  if (options && options.checkboxInfo) auxDefaultInputs = excludeOtherTypesThanDefault(auxDefaultInputs, options.checkboxInfo);
  return dividePerRows(options && options.defaultInputInfo ? options.defaultInputInfo.filter(function (elem) {
    return auxDefaultInputs.includes(elem.bpmParamName);
  }).map(function (elem) {
    return mapper(params, elem, function (defaultInput, inputOptions) {
      defaultInput.HtmlType = inputOptions.type ? inputOptions.type : 'text';
    });
  }) : auxDefaultInputs.map(function (elem) {
    var ret = params[elem];
    ret.label = elem;
    ret.bpmParamName = elem;
    ret.HtmlType = 'text';
    return ret;
  }));
}

function filterRadioButtons(params, options) {
  return genericFilter(params, options.radioButtonsInfo, options, function (radioBut, inputOptions) {
    if (!inputOptions.buttonsInfo) throw new Error("No buttons info suplied for ".concat(inputOptions.bpmParamName));
    radioBut.buttonsInfo = inputOptions.buttonsInfo;
    radioBut.value = params[inputOptions.bpmParamName].value;
  });
}

function filterDropdowns(params, options) {
  return genericFilter(params, options.dropdownInfo, options, function (dropdwon, inputOptions) {
    if (!inputOptions.options) throw new Error("No options suplied for ".concat(inputOptions.bpmParamName));
    dropdwon.options = inputOptions.options;
  });
}

function filterCheckBox(params, options) {
  return genericFilter(params, options.checkboxInfo, options);
}

function genericFilter(params, optionsInput, options, specificMapperFunction) {
  var visibleInputs = filterInvisebleInputs(params, options);
  return dividePerRows(optionsInput ? optionsInput.filter(function (elem) {
    return visibleInputs.includes(elem.bpmParamName);
  }).map(function (elem) {
    return mapper(params, elem, specificMapperFunction);
  }) : []);
}

function filterInvisebleInputs(params, options) {
  return options && options.invisibleParams ? Object.keys(params).filter(function (param) {
    return !options.invisibleParams.includes(param);
  }) : Object.keys(params);
}

function mapper(taskparams, inputOptions, specificMapperFunction) {
  var ret = taskparams[inputOptions.bpmParamName];
  ret.label = inputOptions.label ? inputOptions.label : inputOptions.bpmParamName;
  ret.bpmParamName = inputOptions.bpmParamName;
  if (specificMapperFunction) specificMapperFunction(ret, inputOptions);
  return ret;
}

function excludeOtherTypesThanDefault(paramNames, optionsInput) {
  return paramNames.filter(function (paramName) {
    return !optionsInput.filter(function (option) {
      return option.bpmParamName === paramName;
    }).pop();
  });
}

function dividePerRows(arrayInputs) {
  var retArray = [];
  var auxArr = [];

  for (var i = 0; i < arrayInputs.length; i++) {
    auxArr.push(arrayInputs[i]);

    if ((i + 1) % 3 === 0) {
      retArray.push(auxArr);
      auxArr = [];
    }
  }

  retArray.push(auxArr);
  return retArray;
}