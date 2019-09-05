import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Form, Checkbox } from 'semantic-ui-react'

/**
 * Component for a input of type radio button
 */
export default class RadioButtonsInput extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            value: this.props.initValue ? this.props.initValue : ''
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(name , value) {
        this.setState({value: value})
        this.props.handleChange(name , value)
    }

    render() {
        const value = this.state.value
        return (
            <Form.Group inline>
                <label>{this.props.label}</label>
                {this.props.buttonsInfo.map(elem =>
                    <Form.Field key={elem.label}>
                        <Checkbox
                            radio
                            label={elem.label}
                            id={elem.label}
                            name={elem.label}
                            checked={value === elem.value}
                            onChange={() => this.handleChange(this.props.bpmParamName,elem.value)}
                        />
                    </Form.Field>
                )}

            </Form.Group>
        )
    }
}