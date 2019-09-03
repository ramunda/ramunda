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
        try {
            const task = await completeTaskService(process, advance)
            process.task = task
            if (this.props.onNext || this.props.onBack) {
                return advance ?  this.props.onNext(process) : this.props.onBack(process)
            } else {
                throw new Error(`No function ${advance ? 'next' : 'back'} provided`)
            }
        } catch (error) {
            this.setState({ error: error })
        }
    }

    async handleCancel(process) {
        try {
            const ret = await cancelProcessSercive(process)
            if (this.props.onCancel) {
                return this.props.onCancel()
            }
        } catch (error) {
            this.setState({ error: error })
        }
    }

    render() {
        return (
            <React.Fragment>
                { this.state.process &&  !this.state.error &&
                    React.cloneElement(this.props.externalForm,
                        {process: this.state.process, onSubmit: this.onSubmit, onCancel: this.onCancel})
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