import React from 'react';
import { Container, Message } from 'semantic-ui-react'
import { createProcInstService, completeTaskService, cancelProcessSercive } from '../service/ServiceLayer'

export default class DefaultAndRadioButtonsForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            process: this.props.process
        }

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

    async handleSubmit(process, advance) {
        if (!this.props.onNext && !this.props.onBack) throw new Error(`No function ${advance ? 'next' : 'back'} provided`)
        if (this.props.customServer) return advance ? this.props.onNext(process) : this.props.onBack(process)
        try {
            const task = await completeTaskService(process, advance)
            process.task = task
            return advance ? this.props.onNext(process) : this.props.onBack(process)

        } catch (error) {
            this.setState({ error: error })
        }
    }

    async handleCancel(process) {
        if (!this.props.onCancel) throw new Error(`No function cancel provided`)
        if (this.props.customServer) return this.props.onCancel()
        try {
            await cancelProcessSercive(process)
            return this.props.onCancel()
        } catch (error) {
            this.setState({ error: error })
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.state.process && !this.state.error &&
                    React.cloneElement(this.props.externalForm,
                        { process: this.state.process, onSubmit: this.onSubmit, onCancel: this.onCancel })
                }
                {this.state.error &&
                    <Container>
                        <Message negative>
                            <Message.Header>{this.state.error.message}</Message.Header>
                        </Message>
                    </Container>
                }
            </React.Fragment>
        )
    }
}