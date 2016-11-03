import React, {Component, PropTypes} from "react";
import {Col, Row} from "react-bootstrap";
import {createContainer} from "meteor/react-meteor-data";


class LoginContainer extends Component {

    render() {

        return (
            <div>
                <Row>
                    <Col lg={8} lgOffset={2} md={8} mdOffset={2}>
                        {this.props.mainView}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default LoginContainer = createContainer(() => {
    return {}
}, LoginContainer)