import React from 'react'
import { shallow, mount } from 'enzyme'
import nock from 'nock'
import {mockCreateRequestSucess, mockNextRequest, mocBackRequest, mockCancelRequest} from '../mockFuntions'
import mockInfo from '../mockInfo.json'
import mockOptions from '../mockOptions.json'
import testConfig from '../testConfig.json'
import setBPMconfig from '../../src/service/configBpmServer'
import '@babel/polyfill'

import CustomForm from '../../src/forms/CustomForm'
import { Dropdown, Checkbox } from 'semantic-ui-react'


function init() {
  setBPMconfig(testConfig)
  mockCreateRequestSucess(nock, 2)
  mockNextRequest(nock)
  mocBackRequest(nock)
  mockCancelRequest(nock)
}

describe('Testing Custom Form', () => {

  beforeAll(function () { init() })

  afterAll(function () { nock.cleanAll() })


  it('Testing creating a process instance',async function () {
    const component = mount(<CustomForm  creatInstance='true' procDefKey='Process_05r67sz'/>)
    await component.instance().componentDidMount()
    expect(component.state().process).toBeDefined()
  })

  it('Testing if it renders all the camps decribe in the options',async function () {
    const component = mount(<CustomForm  process={mockInfo.processModelMock} options={mockOptions.firstTask}/>)

    expect(component.find(Checkbox).length).toEqual(2) // Because in options we describe two radio buttons
    expect(component.find('input#n1')).toBeDefined() //As describe in options object n1 param is a defualtParam 
    expect(component.find('input#n2')).toBeDefined() //As describe in options object n2 param is a defualtParam 
  })

  it('Testing if it renders all the camps decribe with a dropdown',async function () {
    const component = mount(<CustomForm  process={mockInfo.processModelMock} options={mockOptions.SecondCustomTask}/>)

    expect(component.find(Checkbox).length).toEqual(2) // Because in options we describe two radio buttons
    expect(component.find('input#n1')).toBeDefined()  
    expect(component.find(Dropdown)).toBeDefined() //See if dropdonw is defined 
  })

  it('Testing if it renders all the camps decribe with a checkbox',async function () {
    const component = mount(<CustomForm  process={mockInfo.processModelMock} options={mockOptions.ThridCustomTask}/>)

    expect(component.find('input#n2')).toBeDefined() 
    expect(component.find('input#n1')).toBeDefined() 
    expect(component.find(Checkbox)).toBeDefined() //See if checkbox is defined 
  })

  it('Testing changing a form input', function () {
    const component = mount(<CustomForm process={mockInfo.processModelMock} />)
    const input = component.find('input#n1')
    input.instance().value = "1"
    input.simulate('change')
    expect(component.state().process.task.parameters.n1.value).toEqual("1")
  })

  it('Testing complete a task and advance',async function () {
    const onNext = jest.fn()
    const component = mount(<CustomForm process={mockInfo.processModelMock} onNext={onNext} />)

    await component.instance().handleSubmit(true)
    expect(onNext).toHaveBeenCalled()

  })

  it('Testing complete a task and back',async function () {
    const onBack = jest.fn()
    const component = mount(<CustomForm process={mockInfo.processModelMock} onBack={onBack} />)

    await component.instance().handleSubmit(false)
    expect(onBack).toHaveBeenCalled()

  })

  it('Testing cancel a process',async function () {
    const onCancel = jest.fn()
    const component = mount(<CustomForm process={mockInfo.processModelMock} onCancel={onCancel} />)
    await component.instance().handleCancel()
    expect(onCancel).toHaveBeenCalled()
  })

})