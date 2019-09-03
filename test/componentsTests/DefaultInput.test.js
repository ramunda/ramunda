import React from 'react'
import { mount } from 'enzyme'

import DefaultInput from '../../src/components/DefaultInput'

describe('Testing Default Input', () => {

    it('Testing changing a value of default input', function () {
        const onChange = jest.fn()
        const component = mount(<DefaultInput label="n1" type="text" required={true} name="n1" handleChange={onChange} />)
        const input = component.find('input#n1')
        input.instance().value = "1"
        input.simulate('change')
        expect(onChange).toHaveBeenCalled()
    })

})