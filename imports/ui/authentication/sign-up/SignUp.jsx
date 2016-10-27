import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Grid, Col, Row, Form, FormGroup, FormControl, Button} from 'react-bootstrap';
// import './registration.less'

class RegistrationForm extends Component {

    handleSubmit(event) {
        let newUser = {
            username: ReactDOM.findDOMNode(this.refs.username).value.trim(),
            email: ReactDOM.findDOMNode(this.refs.email).value.trim(),
            password: ReactDOM.findDOMNode(this.refs.password).value.trim(),
        };
        Meteor.call('user.create', newUser, ()=>{
            Meteor.loginWithPassword(newUser.email, newUser.password, (error)=> {
                if(error){
                    console.log(error.reason)
                }else {
                    FlowRouter.go("/all-dictionaries")
                }
            })
        });
    }

    render() {
        return (
            <div id="sing-up">
                <Col lg={6}>
                    <Form horizontal>
                        <FormGroup controlId="username" bsSize="large">
                            <FormControl type="text" ref="username" placeholder="User name"/>
                        </FormGroup>
                        <FormGroup controlId="email" bsSize="large">
                            <FormControl type="email" ref="email" placeholder="Email"/>
                        </FormGroup>
                        <FormGroup controlId="password" bsSize="large">
                            <FormControl type="password" ref="password" placeholder="Password"/>
                        </FormGroup>
                        <FormGroup controlId="password" bsSize="large">
                            <FormControl type="password" placeholder="Confirm password"/>
                        </FormGroup>
                    </Form>
                </Col>
                <Col lg={1}>
                    <Button bsSize="large" bsStyle="warning" className="btn-sq" onClick={this.handleSubmit.bind(this)}>
                        <img src="images/arrow-point-to-right.png"/>
                    </Button>
                </Col>
            </div>
        )
    }
}

export default RegistrationForm;