import { createProcessInstance, completeTask, cancelProcess } from './camundaService'

export async function createProcInstService(procDefKey, variables) {
    try {
        return await createProcessInstance({ procDefKey: procDefKey, variables: variables })
    }
    catch (error) {
        throw new Error('Error communicating with the BPM server when creating a process instance')
    }
}

export async function completeTaskService(process, advance) {
    if (!process.task.id) throw new Error('No active task to complete')
    try {
        return await completeTask(process.processId, advance, process.task)
    }
    catch (error) {
        throw new Error('Error communicating with the BPM server when completing a task')
    }
}

export async function cancelProcessSercive(process){
    try {
        return await cancelProcess(process.processId)
    }
    catch (error) {
        throw new Error('Error communicating with the BPM server when canceling a process')
    }
}