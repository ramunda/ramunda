import { createProcessInstance, completeTask, cancelProcess } from './camundaService'

export async function createProcInstService(procDefKey, variables) {
    try {
        return await createProcessInstance({ procDefKey: procDefKey, variables: variables })
    }
    catch (error) {
        throw new Error(error.message)
    }
}

export async function completeTaskService(process, advance) {
    if (!process.task.id) throw new Error('No active task to complete')
    try {
        return await completeTask(process.processId, advance, process.task)
    }
    catch (error) {
        throw new Error(error.message)
    }
}

export async function cancelProcessSercive(process){
    try {
        return await cancelProcess(process.processId)
    }
    catch (error) {
        throw new Error(error.message)
    }
}