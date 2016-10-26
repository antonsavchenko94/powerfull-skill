import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Grid, Col, Row, ButtonToolbar, Button} from 'react-bootstrap';
import SignUp from '../authentication/sign-in/SignIn'
import SignIn  from '../authentication/sign-up/SignUp'


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {whichForm: false}
    }

    renderLoginForm() {
        if (this.props.singIn)
            return (<SignUp/>);
        else
            return (<SignIn/>);
    }
    render() {
        return (
            <Grid>
                <Row className="row-centered">
                    <Col lg={4}  md={4} xs={4}>
                        <div id="logo">
                            <img src="images/logo.png"/>
                            <h1>POWERFULL SKILLS</h1>
                            <span>make your English strong<br/> like a HULK</span>
                        </div>
                    </Col>
                    <Col lg={6} md={6} xs={6}>
                        <Row>
                            <Col lg={6} lgOffset={2}>
                                <h1><a href="/">Sing In</a>/
                                    <a href="/sign-up">Sing Up</a></h1>
                            </Col>
                        </Row>
                        {this.renderLoginForm()}
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Home;