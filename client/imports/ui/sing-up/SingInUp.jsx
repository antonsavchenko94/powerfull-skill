import React, {Component, PropTypes} from "react";
import {FormControl, FormGroup, Form, Col, Row, Button} from "react-bootstrap";
import "./singInUp.less";


class SingInUp extends Component {

    render() {
        return (
            <div id="sing-up">
                <Row>
                <Col lg={6} lgOffset={2}>
                    <h1><a href="#">Sing In</a>/<a>Sing Up</a></h1>
                </Col>
                    </Row>
                <Col lg={10}>
                <Form horizontal>
                        <FormGroup controlId="formHorizontalEmail" bsSize="large">
                            <FormControl type="email" placeholder="Email"/>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalPassword" bsSize="large">
                            <FormControl type="password" placeholder="Password"/>
                        </FormGroup>
                </Form>
                </Col>
                <Col lg={1}>
                    <Button bsSize="large" bsStyle="warning" className="btn-sq">
                        <img src="images/arrow-point-to-right.png"/>
                    </Button>
                </Col>
            </div>
        )
    }
}

export default SingInUp;