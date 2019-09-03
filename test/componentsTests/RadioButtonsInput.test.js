import React from 'react'
import { mount } from 'enzyme'

import RadioButtonsInput from '../../src/components/RadioButtonsInput'

describe('Testing RadioButtons Input', () => {

    it('Testing changing a value of radioButtons input', function () {
        const onChange = jest.fn()
        const component = mount(<RadioButtonsInput bpmParamName="toSum"
            initValue={true} handleChange={onChange} buttonsInfo={[{ label: "n1", value: false }]} />)

        const input = component.find('input#toSum')
        input.simulate('change')
        expect(component.instance().state.value).toEqual(false)
        expect(onChange).toHaveBeenCalled()
    })

})