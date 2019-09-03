import React from 'react'
import { mount } from 'enzyme'

import DropdownInput from '../../src/components/DropdownInput'
import { Dropdown } from 'semantic-ui-react';

describe('Testing Dropdown Input', () => {

    it('Testing changing a value of dropdown input', function () {
        const onChange = jest.fn()
        const component = mount(<DropdownInput name="toSum" label="test"
            initValue={true} handleChange={onChange} options={[1]} />)

        const input = component.find(Dropdown)
        const lastState = component.instance().state
        input.simulate('change')
        expect(component.instance().state.value).not.toEqual(lastState)
        expect(onChange).toHaveBeenCalled()
    })

})