import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Grid, Col, Row} from 'react-bootstrap';
import './registration.less'

class RegistrationForm extends Component {
    render() {
        return (
            <div id="registration">
            <form>
                <input type="text" ref="username" placeholder="username"/>
                <input type="text" ref="email" placeholder="email"/>
                <input type="text" ref="password" placeholder="password"/>
                <input type="text" ref="repeatPass" placeholder="Repeat password"/>
                <input type="submit" value={"Go!"}/>
            </form>
            </div>
        )
    }
}

export default RegistrationForm;