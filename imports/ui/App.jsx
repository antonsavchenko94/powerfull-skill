import React, {Component, PropTypes} from "react";
import {Col, Row} from "react-bootstrap";
import {createContainer} from "meteor/react-meteor-data";


class App extends Component {

    render() {

        return (
            <div>
                <Row>
                    <Col lg={2} md={2}>
                        {this.props.userSidebar}
                    </Col>
                    <Col lg={8} md={8}>
                        {this.props.mainView}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default AppContainer = createContainer(() => {
    return {}
}, App)