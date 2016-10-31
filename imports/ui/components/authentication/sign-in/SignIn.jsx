import React, {Component, PropTypes} from "react";
import {FormGroup, Form, Col, Button} from "react-bootstrap";

class SingIn extends Component {

    loginIn() {
        let email = this.refs.email.value.trim(),
            password = this.refs.password.value.trim();

        Meteor.loginWithPassword(email, password, (error)=> {
            if (error) {
                console.log(error.reason)
            }
            else {
                FlowRouter.go("/all-dictionaries")
            }
        });
    }

    render() {
        return (
            <div id="sing-up">
                <Col lg={10}>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalEmail" bsSize="large">
                            <input className="form-control" type="email" ref="email" placeholder="Email"/>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalPassword" bsSize="large">
                            <input className="form-control" type="password" ref="password" placeholder="Password"/>
                        </FormGroup>
                    </Form>
                </Col>
                <Col lg={1}>
                    <Button bsSize="large" bsStyle="warning" className="btn-sq" onClick={this.loginIn.bind(this)}>
                        <img src="images/arrow-point-to-right.png"/>
                    </Button>
                </Col>
            </div>
        )
    }
}

export default SingIn;