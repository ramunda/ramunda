import React from 'react'
import { mount } from 'enzyme'
import nock from 'nock'
import {mockCreateRequestSucess, mockNextRequest, mocBackRequest, mockCancelRequest} from '../mockFuntions'
import mockInfo from '../mockInfo.json'
import mockOptions from '../mockOptions.json'
import testConfig from '../testConfig.json'
import setBPMconfig from '../../src/service/configBpmServer'
import '@babel/polyfill'

import DefaultAndRadioButtonsForm from '../../src/forms/DefaultAndRadioButtonsForm'


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
    const component = mount(<DefaultAndRadioButtonsForm  creatInstance='true' procDefKey='Process_05r67sz'/>)
    await component.instance().componentDidMount()
    expect(component.state().process).toBeDefined()
  })

  it('Testing if it renders all the camps decribe in the options',async function () {
    const component = mount(<DefaultAndRadioButtonsForm  process={mockInfo.processModelMock} options={mockOptions.firstTask}/>)

    expect(component.find('input#toSum').length).toEqual(2) // Because in options we describe two radio buttons
    expect(component.find('input#n1')).toBeDefined() //Not describe in options object so it takes the default value of DefaultInput 
    expect(component.find('input#n2')).toBeDefined() //Not describe in options object so it takes the default value of DefaultInput
  })

  it('Testing if it renders no camps because we describe then as invisible in options',async function () {
    const component = mount(<DefaultAndRadioButtonsForm  process={mockInfo.processModelMock} options={mockOptions.InvisibleCustomTask}/>)

    expect(component.find('input#toSum').length).toEqual(0) // Because in options we describe two radio buttons
    expect(component.find('input#n1').length).toEqual(0) //Not describe in options object so it takes the default value of DefaultInput 
    expect(component.find('input#n2').length).toEqual(0) //See if dropdonw is defined 
  })

  it('Testing changing a form input', function () {
    const component = mount(<DefaultAndRadioButtonsForm process={mockInfo.processModelMock} />)
    const input = component.find('input#n1')
    input.instance().value = "1"
    input.simulate('change')
    expect(component.state().process.task.parameters.n1.value).toEqual("1")
  })

  it('Testing complete a task and advance',async function () {
    const onNext = jest.fn()
    const component = mount(<DefaultAndRadioButtonsForm process={mockInfo.processModelMock} onNext={onNext} />)

    await component.instance().handleSubmit(true)
    expect(onNext).toHaveBeenCalled()

  })

  it('Testing complete a task and back',async function () {
    const onBack = jest.fn()
    const component = mount(<DefaultAndRadioButtonsForm process={mockInfo.processModelMock} onBack={onBack} />)

    await component.instance().handleSubmit(false)
    expect(onBack).toHaveBeenCalled()

  })

  it('Testing cancel a process',async function () {
    const onCancel = jest.fn()
    const component = mount(<DefaultAndRadioButtonsForm process={mockInfo.processModelMock} onCancel={onCancel} />)
    await component.instance().handleCancel()
    expect(onCancel).toHaveBeenCalled()
  })

})
