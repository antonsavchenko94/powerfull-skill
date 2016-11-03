import React, {Component, PropTypes} from "react";
import {Col, FormGroup, input, Button} from "react-bootstrap";
// import './registration.less'

class RegistrationForm extends Component {

    handleSubmit(event) {
        event.preventDefault();
        let newUser = {
            username: this.refs.username.value.trim(),
            email: this.refs.email.value.trim(),
            password: this.refs.password.value.trim(),
        };
        Meteor.call('user.create', newUser, ()=> {
            Meteor.loginWithPassword(newUser.email, newUser.password, (error)=> {
                if (error) {
                    console.log(error.reason)
                } else {
                    FlowRouter.go("/all-dictionaries")
                }
            })
        });
    }

    render() {
        return (
            <div id="sing-up">
                <Col lg={9}>
                    <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                        <FormGroup controlId="username" bsSize="large">
                            <input className="form-control" type="text" ref="username" placeholder="User name"/>
                        </FormGroup>
                        <FormGroup controlId="email" bsSize="large">
                            <input className="form-control" type="email" ref="email" placeholder="Email"/>
                        </FormGroup>
                        <FormGroup controlId="password" bsSize="large">
                            <input className="form-control" type="password" ref="password" placeholder="Password"/>
                        </FormGroup>
                        <FormGroup controlId="password" bsSize="large">
                            <input className="form-control" type="password" placeholder="Confirm password"/>
                        </FormGroup>
                    </form>
                </Col>
                <Col lg={2}>
                    <Button bsSize="large" bsStyle="warning" className="btn-sq" onClick={this.handleSubmit.bind(this)}>
                        <img src="images/arrow-point-to-right.png"/>
                    </Button>
                </Col>
            </div>
        )
    }
}

export default RegistrationForm;