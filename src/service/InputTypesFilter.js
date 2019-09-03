/**
 * Function responsible for filtering the task´s parameteres for default type
 * @param {*} params object containing the parameters
 * @param {*} options object defined by the user specifying the structure of the form
 */
export function filterDefaultInputs(params, options) {
    
    var auxDefaultInputs = filterInvisebleInputs(params, options)

    if(options && options.radioButtonsInfo) auxDefaultInputs = excludeOtherTypesThanDefault(auxDefaultInputs, options.radioButtonsInfo)
    if(options && options.dropdownInfo) auxDefaultInputs = excludeOtherTypesThanDefault(auxDefaultInputs, options.dropdownInfo)
    if(options && options.checkboxInfo) auxDefaultInputs = excludeOtherTypesThanDefault(auxDefaultInputs, options.checkboxInfo)

    return dividePerRows(options && options.defaultInputInfo
        ? options.defaultInputInfo
            .filter(elem => auxDefaultInputs.includes(elem.bpmParamName))
            .map(elem => mapper(params, elem,
                (defaultInput, inputOptions) => { defaultInput.HtmlType = inputOptions.type ? inputOptions.type : 'text' }
            ))
        : auxDefaultInputs
            .map(elem =>{ 
                var ret = params[elem]; ret.label = elem; ret.bpmParamName = elem; ret.HtmlType = 'text'; return ret 
            })
    )
}

/**
 * Function responsible for filtering the task´s parameteres for radio button type
 * @param {*} params object containing the parameters
 * @param {*} options object defined by the user specifying the structure of the form
 */
export function filterRadioButtons(params, options) {
    return genericFilter(params, options.radioButtonsInfo, options,
        (radioBut, inputOptions) => { 
            if (!inputOptions.buttonsInfo) throw new Error(`No buttons info suplied for ${inputOptions.bpmParamName}`) 
            radioBut.buttonsInfo = inputOptions.buttonsInfo
            radioBut.value = params[inputOptions.bpmParamName].value 
        }
    )
}

/**
 * Function responsible for filtering the task´s parameteres for dropdown type
 * @param {*} params object containing the parameters
 * @param {*} options object defined by the user specifying the structure of the form
 */
export function filterDropdowns(params, options) {
    return genericFilter(params, options.dropdownInfo, options,
        (dropdwon, inputOptions) => {
            if (!inputOptions.options) throw new Error(`No options suplied for ${inputOptions.bpmParamName}`)
            dropdwon.options = inputOptions.options
        }
    )
}

/**
 * Function responsible for filtering the task´s parameteres for check box type
 * @param {*} params object containing the parameters
 * @param {*} options object defined by the user specifying which parameters are check box type
 */
export function filterCheckBox(params, options) {
    return genericFilter(params, options.checkboxInfo, options)
}

/**
 * Utilitary function used to filter the parameters depending on the type of input
 * @param {*} params object containing the parameters
 * @param {*} optionsInput object specifying the parameters to be filtered
 * @param {*} options object defined by the user specifying the structure of the form
 * @param {*} specificMapperFunction mapper responsible for adding special fields according to the parameter type
 */
function genericFilter(params, optionsInput, options, specificMapperFunction) {
    const visibleInputs = filterInvisebleInputs(params, options)
    return dividePerRows(optionsInput
        ? optionsInput
            .filter(elem => visibleInputs.includes(elem.bpmParamName))
            .map(elem => mapper(params, elem, specificMapperFunction))
        : []
    )
}

/**
 * Function responsible for filtering inputs that are supposed to be invisible
 * @param {*} params object containing the parameters
 * @param {*} options object defined by the user specifying the structure of the form
 */
function filterInvisebleInputs(params, options) {
    return options && options.invisibleParams
        ? Object.keys(params).filter(param => !options.invisibleParams.includes(param))
        : Object.keys(params)
}

/**
 * Mapper that unifies the information received from the server with the option´s information
 * @param {*} taskparams task parameters information recieved from the server
 * @param {*} inputOptions information received from options
 * @param {*} specificMapperFunction mapper responsible for adding special fields according to the parameter type
 */
function mapper(taskparams, inputOptions, specificMapperFunction) {
    var ret = taskparams[inputOptions.bpmParamName]
    ret.label = inputOptions.label ? inputOptions.label : inputOptions.bpmParamName
    ret.bpmParamName = inputOptions.bpmParamName
    if (specificMapperFunction) specificMapperFunction(ret, inputOptions)
    return ret
}

/**
 * Utilitary function that separates the inputs that have a special type definied from the ones that
 * dont have their type definied and therefore are considered default type
 * @param {*} paramNames parameters name
 * @param {*} optionsInput object specifying the parameters type
 */
function excludeOtherTypesThanDefault(paramNames, optionsInput) {
    return paramNames
        .filter(paramName => !optionsInput.filter(option => option.bpmParamName === paramName).pop())
}

/**
 * When all the inputs are gathered they are divided in groups of three
 * @param {*} arrayInputs object containg all the inputs allready formatted
 */
function dividePerRows(arrayInputs){
    var retArray = []
    var auxArr = []
    for (let i = 0; i < arrayInputs.length; i++) {
        auxArr.push(arrayInputs[i])
        if( (i + 1) % 3 === 0){
            retArray.push(auxArr)
            auxArr = []
        }
    }
    retArray.push(auxArr)
    return retArray
}