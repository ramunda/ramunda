import 'cross-fetch/polyfill'

/**
 * Http request for a specific url
 * @param {*} url for the request
 * @param {*} reqInit options for the request
 */
function myfetch(url, reqInit) {
    const request = new Request(url, reqInit)
    return fetch(request)
        .then(response => response.json())
}

/**
 * Makes a get request for a specific url
 * @param {*} url for the request
 */
function fetchGet(url) {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    const RequestInit = {
        method: 'GET',
        headers: headers,
        mode: 'cors'
    }

    return myfetch(url, RequestInit)
}

/**
 * Makes a post for a specific url
 * @param {*} url for the specific post
 * @param {*} body containing the information for the post
 */
function fetchPost(url, body) {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    const RequestInit = {
        method: 'POST',
        headers: headers,
        mode: 'cors',
        body: JSON.stringify(body)
    }

    return myfetch(url, RequestInit)
}

/**
 * Function responsible for communicating with BPM server to create a process instance
 * @param {*} body constains the information necessary to create a process instance
 */
export async function createProcessInstance(body) {
    var url = getConfig().createProcessInstance
    return fetchPost(url, body).then(processDTO => formatProcess(processDTO))
}

/**
 * Function responsible for communicating with BPM server to complete a task
 * @param {*} procInst id representing the process instance
 * @param {*} advance depending on the value requests the next task or the previous task
 * @param {*} task object containing the information of the task
 */
export function completeTask(procInst, advance, task) {
    let url = getConfig().completeTask.replace(':procInst', procInst)
    url = url.replace(':advance', advance)
    
    let body = {
        id: task.id,
        user: task.user,
        inParameters: formatParamsToRequest(task.parameters, 'w'),
        outParameters:  formatParamsToRequest(task.parameters, 'r')
    };

    return fetchPost(url, body).then(taskDTO => formatTask(taskDTO))
}

/**
 * Function responsible for communicating with BPM server to cancel a process
 * @param {*} procInst id of the process instance to cancel
 */
export function cancelProcess(procInst) {
    return fetchGet(getConfig().cancelProcess.replace(':procInst', procInst))
}

/**
 * Transforms a process object from the response of the server to a domain object
 * @param {*} processDTO domain object that is going to contain the information of the process
 */
function formatProcess(processDTO) {
    var process = { processId: processDTO.procInstId, task: {} }
    process.task = formatTask(processDTO.activeTask)
    process.milestones = processDTO.milestones
    return process
}

/**
 * Transforms a task object from the response of the server to a domain object
 * @param {*} taskDTO domain object that is going to contain the information of the task
 */
function formatTask(taskDTO) {
    var task = {id: taskDTO.id, parameters: {}}
    if (taskDTO.inParameters) paramsParser(taskDTO.inParameters, task, false, 'w')
    if (taskDTO.outParameters) paramsParser(taskDTO.outParameters, task, true, 'r')
    task.user = taskDTO.user
    task.milestone = taskDTO.milestone
    return task
}

/**
 * Parses parameters from the response object to domain object
 * @param {*} params parameter from response object
 * @param {*} task domain object task
 * @param {*} readOnly defines if the variable is supposed to be changed or not
 * @param {*} type of the parameters: W -> inputs, R -> outputs, RW -> inouts
 */
function paramsParser(params, task, readOnly, type){    
    params
        .forEach(element => { 
            task.parameters[element.key] = {};
            task.parameters[element.key].value = element.value != null ? element.value : ''; 
            task.parameters[element.key].readOnly = readOnly; 
            task.parameters[element.key].type = type 
        }) 
}

/**
 * Formats the parameters to make a request
 * @param {*} parameters object containing the parameters
 * @param {*} type defines the type of parameter
 */
function formatParamsToRequest(parameters, type){
    return Object.keys(parameters).filter(elem => parameters[elem].type === type)
            .map(elem => {
                return {key: elem, value: parameters[elem].value};
            });
}

/**
 * Gets the configuration of the BPM server from the localStorage
 */
function getConfig(){
    return JSON.parse(localStorage.getItem('bpmConfig'))
}