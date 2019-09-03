import 'cross-fetch/polyfill'

function myfetch(url, reqInit) {
    const request = new Request(url, reqInit)
    return fetch(request)
        .then(response => response.json())
}

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

export async function createProcessInstance(body) {
    var url = getConfig().createProcessInstance
    
    return fetchPost(url, body).then(processDTO => formatProcess(processDTO))
}

export function completeTask(procInst, advance, task) {
    let url = getConfig().completeTask.replace(':procInst', procInst)
    url = url.replace(':advance', advance)
    
    let body = {
        id: task.id,
        user: task.user,
        inParameters: formatParamsToRequest(task.parameters, 'w'),
        outParameters:  formatParamsToRequest(task.parameters, 'r'),
        inOutParameters: formatParamsToRequest(task.parameters, 'rw')
    };

    return fetchPost(url, body).then(taskDTO => formatTask(taskDTO))
}

export function cancelProcess(procInst) {
    return fetchGet(getConfig().cancelProcess.replace(':procInst', procInst))
}


function formatProcess(processDTO) {
    var process = { processId: processDTO.procInstId, task: {} }
    process.task = formatTask(processDTO.activeTask)
    process.milestones = processDTO.milestones
    return process
}

function formatTask(taskDTO) {
    var task = {id: taskDTO.id, parameters: {}}
    if (taskDTO.inParameters) paramsParser(taskDTO.inParameters, task, false, 'w')
    if (taskDTO.outParameters) paramsParser(taskDTO.outParameters, task, true, 'r')
    if (taskDTO.inOutParameters) paramsParser(taskDTO.inOutParameters, task, false, 'rw')
    task.user = taskDTO.user
    task.milestone = taskDTO.milestone
    return task
}

function paramsParser(params, task, readOnly, type){    
    params
        .forEach(element => { 
            task.parameters[element.key] = {};
            task.parameters[element.key].value = element.value ? element.value : ''; 
            task.parameters[element.key].readOnly = readOnly; 
            task.parameters[element.key].type = type 
        }) 
}

function formatParamsToRequest(parameters, type){
    return Object.keys(parameters).filter(elem => parameters[elem].type === type)
            .map(elem => {
                return {key: elem, value: parameters[elem].value};
            });
}

function getConfig(){
    return JSON.parse(localStorage.getItem('bpmConfig'))
}