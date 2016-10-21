import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Grid, Col, Row, ButtonToolbar, Button} from 'react-bootstrap';
// import { Meteor } from 'meteor/meteor';
// import { createContainer } from 'meteor/react-meteor-data';
// import AccountsUIWrapper from  './sing-up/AccountsUIWrapper';
import SingInUp from './sing-up/SingInUp'


class App extends Component {
    render() {
        return(
                <Grid>
                    <Row className="row-centered">
                        <Col lg={4} lgOffset={1} md={4} mdOffset={1} xs={4} xsOffset={1}>
                            <div id="logo">
                                <img src="images/logo.png"/>
                                <h1>POWERFULL SKILLS</h1>
                                <span>make your English strong<br/> like a HULK</span>
                            </div>
                        </Col>
                        <Col lg={7} md={8} xs={8}>
                            <SingInUp/>
                        </Col>
                    </Row>
                </Grid>
        )

    }
}

export default App