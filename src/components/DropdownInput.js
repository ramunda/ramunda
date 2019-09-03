import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Form, Dropdown } from 'semantic-ui-react'

export default class DropdownInput extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            value: this.props.initValue ? this.props.initValue : ''
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e, { value }) {
        this.setState({value: value})
        this.props.handleChange(this.props.name , value)
    }


    render() {
        const  value = this.state.value

        return (
            <Form.Field>
                <Dropdown
                    placeholder={this.props.label}
                    id={this.props.name}
                    name={this.props.name}
                    scrolling
                    selection
                    value={value}
                    onChange={this.handleChange}
                    options={this.props.options.map(elem => {
                        return {
                            key: elem,
                            value: elem
                        }
                    })}
                />
            </Form.Field>
        )
    }
}