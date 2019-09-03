import React from 'react';
import { Form, Container, Message, Button } from 'semantic-ui-react'
import DefaultInput from '../components/DefaultInput'
import { createProcInstService, completeTaskService, cancelProcessSercive } from '../service/ServiceLayer'
import { filterDefaultInputs } from '../service/InputTypesFilter'

export default class DefaultForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            process: this.props.process
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    async componentDidMount() {
        if (this.props.creatInstance) {
            try {
                const process = await createProcInstService(this.props.procDefKey, this.props.variables)
                this.setState({ process: process })
            } catch (error) {
                this.setState({ error: error })
            }
        }
    }

    handleChange(name, value) {
        var process = this.state.process
        process.task.parameters[name].value = value
        this.setState({ process: process })
    }

    async handleSubmit(advance) {
        const process = this.state.process
        try {
            const task = await completeTaskService(process, advance)
            process.task = task
            if (this.props.onNext || this.props.onBack) {
                return advance ? this.props.onNext(process) : this.props.onBack(process)
            } else {
                throw new Error(`No function ${advance ? 'next' : 'back'} provided`)
            }
        } catch (error) {
            this.setState({ error: error })
        }
    }

    async handleCancel() {
        try {
            await cancelProcessSercive(this.state.process)
            if (this.props.onCancel) {
                return this.props.onCancel()
            }
        } catch (error) {
            this.setState({ error: error })
        }
    }


    render() {
        var error = this.state.error
        var defaultInputs = []
        try {
            defaultInputs = this.state.process && !error
                ? filterDefaultInputs(this.state.process.task.parameters, this.props.options) : []
        } catch (err) {
            error = err
        }

        return (
            <React.Fragment>
                {this.state.process && !error &&
                    <Container>
                        <Form>
                            {defaultInputs.map((elem, idx )=>
                                <Form.Group widths='equal' key={idx}>
                                    {elem.map(param => <DefaultInput 
                                        label={param.label} 
                                        type={param.HtmlType} 
                                        required={true} 
                                        key={param.bpmParamName}
                                        name={param.bpmParamName}
                                        handleChange={this.handleChange}
                                    value={param.value} />)}
                                </Form.Group>)}
                        </Form>
                        {!this.props.creatInstance &&
                            <Button name="Back" floated="left" onClick={() => this.handleSubmit(false)}>Back</Button>
                        }
                        {this.state.process.task.id &&
                            <Button name="Cancel" floated="left" onClick={this.handleCancel}>Cancel</Button>
                        }
                        {this.state.process.task.id &&
                            <Button id="Next" floated="right" onClick={() => this.handleSubmit(true)}>Next</Button>
                        }
                    </Container>
                }
                {error &&
                    <Container>
                        <Message negative>
                            <Message.Header>{error.message}</Message.Header>
                        </Message>
                    </Container>
                }
            </React.Fragment>
        )
    }
}