import '@babel/polyfill'
import nock from 'nock'
import testConfig from './testConfig.json'
import setBPMconfig from '../src/service/configBpmServer'
import {mockCreateRequestSucess, mockNextRequest, mocBackRequest, mockCancelRequest} from './mockFuntions'
import mockInfo from './mockInfo.json'
import { createProcInstService, completeTaskService, cancelProcessSercive } from '../src/service/ServiceLayer'


function init() {
    setBPMconfig(testConfig)
    mockCreateRequestSucess(nock, 2)
    mockNextRequest(nock)
    mocBackRequest(nock)
    mockCancelRequest(nock)
}

describe('Testing service to:', () => {

    beforeAll(function () { init() })

    afterAll(function () { nock.cleanAll() })

    it('Error on inserting config of BPM server', async function () {
        expect(() => setBPMconfig({})).toThrow()
    })

    it('create a process instance', async function () {
        const process = await createProcInstService('Process_05r67sz', [{ key: 'user', value: 'test' }])
        expect(process).toBeDefined()
    })

    it('complete a task and advance', async function () {
        const task = await completeTaskService(mockInfo.processModelMock, true)
        expect(task).toBeDefined()
    })

    it('complete a task and go back', async function () {
        const task = await completeTaskService(mockInfo.processModelMock, false)
        expect(task).toBeDefined()
    })

    it('cancel a process instance', async function () {
        const process = await cancelProcessSercive(mockInfo.processModelMock)
        expect(process).toBeTruthy()
    })

})