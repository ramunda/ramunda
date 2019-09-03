import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Form } from 'semantic-ui-react'

export default class DefaultInput extends React.Component {

    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e, { name, value }) {
        this.props.handleChange(name, value)
    }

    render() {
        return (
            <Form.Input fluid
                label={this.props.label}
                type={this.props.type}
                required={this.props.required}
                id={this.props.name}
                name={this.props.name}
                onChange={this.handleChange}
                value={this.props.value}
            />
        )
    }
}