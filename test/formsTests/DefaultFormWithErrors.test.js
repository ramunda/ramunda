import React from 'react'
import { shallow, mount } from 'enzyme'
import nock from 'nock'
import mockInfo from '../mockInfo.json'
import testConfig from '../testConfig.json'
import setBPMconfig from '../../src/service/configBpmServer'
import '@babel/polyfill'

import DefaultForm from '../../src/forms/DefaultForm'


function init() {
    setBPMconfig(testConfig)
}

describe('Testing Default Form with errors', () => {

    beforeAll(function () { init() })

    afterAll(function () { nock.cleanAll() })


    it('Testing throwing a error when failed to create a porcess instance', async function () {
        const component = mount(<DefaultForm creatInstance='true' procDefKey='Process_05r67sz' />)
        
        try {
            await component.instance().componentDidMount()
        } catch (error) {
            expect(error).toBeDefined()
        }
    })

    it('Testing throwing a error when failed to complete task', async function () {
        const onNext = jest.fn()
        const component = mount(<DefaultForm process={mockInfo.processModelMock} onNext={onNext} />)

        try {
            await component.instance().handleSubmit(true)
        } catch (error) {
            expect(error).toBeDefined()
        }
    })

    it('Testing throwing a error when failed to complete task because no onNext function is provided', async function () {
        const component = mount(<DefaultForm process={mockInfo.processModelMock} />)

        try {
            await component.instance().handleSubmit(true)
        } catch (error) {
            expect(error.message).toEqual('No function next provided')
        }
    })

    it('Testing throwing a error when failed to complete task because no active task present', async function () {
        const component = mount(<DefaultForm process={{task:{}}} onNext={()=>'test'}/>)

        try {
            await component.instance().handleSubmit(true)
        } catch (error) {
            expect(error.message).toEqual('No active task to complete')
        }
    })

    it('Testing throwing a error when failed to cancel a process', async function () {
        const component = mount(<DefaultForm process={mockInfo.processModelMock} onCancel={() => 'Test'}/>)

        try {
            await component.instance().handleCancel()
        } catch (error) {
            expect(error).toBeDefined()
        }
    })

    it('Testing throwing a error when failed to cancel a process because no onCancel function provided', async function () {
        const component = mount(<DefaultForm process={mockInfo.processModelMock} />)

        try {
            await component.instance().handleCancel()
        } catch (error) {
            expect(error).toBeDefined()
        }
    })
})