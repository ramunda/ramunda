import React from 'react'
import { mount } from 'enzyme'
import nock from 'nock'
import { mockCreateRequestSucess, mockNextRequest, mocBackRequest, mockCancelRequest, mockCreateRequestWithError } from '../mockFuntions'
import mockInfo from '../mockInfo.json'
import testConfig from '../testConfig.json'
import setBPMconfig from '../../src/service/configBpmServer'
import '@babel/polyfill'

import DefaultForm from '../../src/forms/DefaultForm'


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


  it('Testing creating a process instance', async function () {
    const component = mount(<DefaultForm creatInstance='true' procDefKey='Process_05r67sz' variables={mockInfo.initProcessVars} />)
    await component.instance().componentDidMount()
    expect(component.state().process).toBeDefined()
  })

  it('Testing changing a form input', function () {
    const component = mount(<DefaultForm process={mockInfo.processModelMock} />)
    const input = component.find('input#n1')
    input.instance().value = "1"
    input.simulate('change')
    expect(component.state().process.task.parameters.n1.value).toEqual("1")
  })

  it('Testing complete a task and advance', async function () {
    const onNext = jest.fn()
    const component = mount(<DefaultForm process={mockInfo.processModelMock} onNext={onNext} />)

    await component.instance().handleSubmit(true)
    expect(onNext).toHaveBeenCalled()

  })

  it('Testing complete a task and back', async function () {
    const onBack = jest.fn()
    const component = mount(<DefaultForm process={mockInfo.processModelMock} onBack={onBack} />)

    await component.instance().handleSubmit(false)
    expect(onBack).toHaveBeenCalled()

  })

  it('Testing cancel a process', async function () {
    const onCancel = jest.fn()
    const component = mount(<DefaultForm process={mockInfo.processModelMock} onCancel={onCancel} />)

    await component.instance().handleCancel()
    expect(onCancel).toHaveBeenCalled()
  })

})