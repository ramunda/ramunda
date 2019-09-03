import React from 'react'
import { mount } from 'enzyme'

import CheckboxInput from '../../src/components/CheckboxInput'
import { Checkbox } from 'semantic-ui-react';

describe('Testing Checkbox Input', () => {

    it('Testing changing a value of checkbox input', function () {
        const onChange = jest.fn()
        const component = mount(<CheckboxInput name="toSum" label="test" initValue={true} handleChange={onChange} />)

        const input = component.find(Checkbox)
        input.simulate('change')
        expect(component.instance().state.value).toEqual(false)
        expect(onChange).toHaveBeenCalled()
    })

})