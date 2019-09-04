import React from 'react';
import { Container, Message } from 'semantic-ui-react'
import { createProcInstService, completeTaskService, cancelProcessSercive } from '../service/ServiceLayer'

/**
 * Component that renders a external form
 */
export default class ExternalForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            process: this.props.process
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

     /**
     * In case the props.createInstance is present a process instance is created
     */
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

    /**
     * Function called from rendered external React component.
     * If customServer is true, handleSubmit only calls a function passed by the webapp, else its 
     * also requested a complete task from the BPM server
     * @param {*} process domain object representing the process instance
     * @param {*} advance value defines if it is requested the next or the previous task
     */
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

    /**
     * Function called from rendered external React component.
     * If customServer is true, handleCancel only calls a function passed by the webapp, else its 
     * also requested a cancel task from the BPM server
     * @param {*} process domain object representing the process instance
     */
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
                        { process: this.state.process, onSubmit: this.handleSubmit, onCancel: this.handleCancel })
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