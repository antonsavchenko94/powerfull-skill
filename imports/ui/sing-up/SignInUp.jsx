import React, {Component, PropTypes} from "react";
import {FormControl, FormGroup, Form, Col, Row, Button} from "react-bootstrap";
import ReactDOM from 'react-dom';

// import "./singInUp.less";


class SingInUp extends Component {

    loginIn(){
        let email = ReactDOM.findDOMNode(this.refs.email).value.trim();
        let password = ReactDOM.findDOMNode(this.refs.password).value.trim();
        Meteor.loginWithPassword(email, password, (error)=> {
            if(error){
                console.log(error.reason)
            }else {
                FlowRouter.go("/dictionary")
            }
        })
    }

    render() {
        return (
            <div id="sing-up">
                <Col lg={10}>
                <Form horizontal>
                        <FormGroup controlId="formHorizontalEmail" bsSize="large">
                            <FormControl type="email" ref="email" placeholder="Email"/>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalPassword" bsSize="large">
                            <FormControl type="password" ref="password" placeholder="Password"/>
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

export default SingInUp;