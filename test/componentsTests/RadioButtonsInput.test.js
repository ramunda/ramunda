import React from 'react'
import { mount } from 'enzyme'

import RadioButtonsInput from '../../src/components/RadioButtonsInput'
import { Checkbox } from 'semantic-ui-react';

describe('Testing RadioButtons Input', () => {

    it('Testing changing a value of radioButtons input', function () {
        const onChange = jest.fn()
        const component = mount(<RadioButtonsInput bpmParamName="toSum"
            initValue={true} handleChange={onChange} buttonsInfo={[{ label: "n1", value: false }]} />)

        const input = component.find(Checkbox)
        input.simulate('change')
        expect(component.instance().state.value).toEqual(false)
        expect(onChange).toHaveBeenCalled()
    })

})