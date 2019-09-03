import React from 'react'
import { mount } from 'enzyme'
import nock from 'nock'
import {mockCreateRequestSucess, mockNextRequest, mocBackRequest, mockCancelRequest} from '../mockFuntions'
import testConfig from '../testConfig.json'
import mockInfo from '../mockInfo.json'
import setBPMconfig from '../../src/service/configBpmServer'
import '@babel/polyfill'

import ExternalForm from '../../src/forms/ExternalForm'
import TestForm from '../TestForm'

function init() {
  setBPMconfig(testConfig)
  mockCreateRequestSucess(nock, 2)
  mockNextRequest(nock)
  mocBackRequest(nock)
  mockCancelRequest(nock)
}

describe('Testing Default Form', () => {

  beforeAll(function () { init() })

  afterAll(function () { nock.cleanAll() })


  it('Testing creating a process instance',async function () {
    const component = mount(<ExternalForm  creatInstance='true' procDefKey='Process_05r67sz' externalForm={<TestForm />}/>)
    await component.instance().componentDidMount()
    expect(component.state().process).toBeDefined()
  })

  it('Testing if it renders the external form',async function () {
    const component = mount(<ExternalForm  process={mockInfo.processModelMock} externalForm={<TestForm />}/>)

    expect(component.find(TestForm)).toBeDefined()
    expect(component.find('input#toSum')).toBeDefined() // Because in options we describe two radio buttons
    expect(component.find('input#n1')).toBeDefined() //Not describe in options object so it takes the default value of DefaultInput 
    expect(component.find('input#n2')).toBeDefined() //Not describe in options object so it takes the default value of DefaultInput
  })


  it('Testing complete a task and advance',async function () {
    const onNext = jest.fn()
    const component = mount(<ExternalForm process={mockInfo.processModelMock} onNext={onNext}  externalForm={<TestForm />}/>)

    await component.instance().handleSubmit(mockInfo.processModelMock,true)
    expect(onNext).toHaveBeenCalled()

  })

  it('Testing complete a task and back',async function () {
    const onBack = jest.fn()
    const component = mount(<ExternalForm process={mockInfo.processModelMock} onBack={onBack}  externalForm={<TestForm />}/>)

    await component.instance().handleSubmit(mockInfo.processModelMock,false)
    expect(onBack).toHaveBeenCalled()

  })

  it('Testing cancel a process',async function () {
    const onCancel = jest.fn()
    const component = mount(<ExternalForm process={mockInfo.processModelMock} onCancel={onCancel}  externalForm={<TestForm />}/>)
    await component.instance().handleCancel(mockInfo.processModelMock)
    expect(onCancel).toHaveBeenCalled()
  })

})