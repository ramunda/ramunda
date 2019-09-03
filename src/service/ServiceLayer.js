import { createProcessInstance, completeTask, cancelProcess } from './camundaService'

/**
 * Function responsible for creating a process instance 
 * @param {*} procDefKey definition key that represent the process to be instantiated
 * @param {*} variables needed to be processed to instantiate a process
 */
export async function createProcInstService(procDefKey, variables) {
    try {
        return await createProcessInstance({ procDefKey: procDefKey, variables: variables })
    }
    catch (error) {
        throw new Error('Error communicating with the BPM server when creating a process instance')
    }
}

/**
 * Function resposible fro completing a task
 * @param {*} process object containing the information of the process
 * @param {*} advance value defines if the operation is next task or previous task
 */
export async function completeTaskService(process, advance) {
    if (!process.task.id) throw new Error('No active task to complete')
    try {
        return await completeTask(process.processId, advance, process.task)
    }
    catch (error) {
        throw new Error('Error communicating with the BPM server when completing a task')
    }
}

/**
 * Function responsible for canceling a specific process
 * @param {*} process object containing the information of the process
 */
export async function cancelProcessSercive(process){
    try {
        return await cancelProcess(process.processId)
    }
    catch (error) {
        throw new Error('Error communicating with the BPM server when canceling a process')
    }
}