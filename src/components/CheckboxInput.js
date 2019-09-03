
import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Form } from 'semantic-ui-react'

export default class CheckboxInput extends React.Component {
    
    constructor(props){
        super(props)

        this.state = {
            value: this.props.initValue ? this.props.initValue : false
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e, { name }) {
        const newValue = !this.state.value
        this.setState({value: newValue})
        this.props.handleChange(name , newValue)
    }

    render(){
        const  value = this.state.value

        return (
            <Form.Checkbox 
                label={this.props.label}
                id={this.props.name} 
                name={this.props.name}
                checked={value ? true : false}
                onChange={this.handleChange}
            />
        )
    }
}