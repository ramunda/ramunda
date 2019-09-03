import React from 'react'
import { shallow, mount } from 'enzyme'
import nock from 'nock'
import { mockCreateRequestWithError,mockNextRequest,mockBackRequestWithError, mockCancelRequestWithError } from '../mockFuntions'
import mockInfo from '../mockInfo.json'
import testConfig from '../testConfig.json'
import setBPMconfig from '../../src/service/configBpmServer'
import '@babel/polyfill'

import ExternalForm from '../../src/forms/ExternalForm'
import TestForm from '../TestForm'


function init() {
    setBPMconfig(testConfig)
    mockCreateRequestWithError(nock, 2)
    mockNextRequest(nock)
}

describe('Testing External Form with errors', () => {

    beforeAll(function () { init() })

    afterAll(function () { nock.cleanAll() })


    it('Testing throwing a showing a error when failed to create a porcess instance', async function () {
        const component = mount(<ExternalForm creatInstance='true' procDefKey='Process_05r67sz' externalForm={<TestForm />} />)
        
        try {
            await component.instance().componentDidMount()
        } catch (error) {
            expect(error).toBeDefined()
        }
    })

    it('Testing throwing a showing a error when failed to complete task', async function () {
        const onNext = jest.fn()
        const component = mount(<ExternalForm process={mockInfo.processModelMock} externalForm={<TestForm />} onNext={onNext} />)

        try {
            await component.instance().handleSubmit(true)
        } catch (error) {
            expect(error).toBeDefined()
        }
    })

    it('Testing throwing a showing a error when failed to complete task because no onNext function is provided', async function () {
        const component = mount(<ExternalForm process={mockInfo.processModelMock} externalForm={<TestForm />} />)

        try {
            await component.instance().handleSubmit(true)
        } catch (error) {
            expect(error.message).toEquals('No function next provided')
        }
    })

    it('Testing throwing a showing a error when failed to cancel a process', async function () {
        const component = mount(<ExternalForm process={mockInfo.processModelMock} externalForm={<TestForm />} />)

        try {
            await component.instance().handleCancel()
        } catch (error) {
            expect(error).toBeDefined()
        }

    })
})