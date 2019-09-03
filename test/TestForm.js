import React from 'react';
import { Form, Container } from 'semantic-ui-react'

export default class TestForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            process: this.props.process
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.state.process &&
                    <Container>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input fluid
                                    id="n1"
                                    name="n1"
                                />
                                <Form.Input fluid
                                    id="n2"
                                    name="n2"
                                />
                                <Form.Input fluid
                                    id="toSum"
                                    name="toSum"
                                />
                            </Form.Group>
                        </Form>
                    </Container>
                }
            </React.Fragment>
        )
    }
}