import React, {Component, PropTypes} from "react";
import {Col, Row} from "react-bootstrap";
import {createContainer} from "meteor/react-meteor-data";

import UserSidebar from "../components/user-sidebar/UserSidebar"

class MainContainer extends Component {

    render() {

        return (
            <div>
                <Row>
                    <Col lg={2} md={2}>
                        <UserSidebar/>
                    </Col>
                    <Col lg={10} md={10}>
                        {this.props.mainView}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default MainContainer = createContainer(() => {
    return {}
}, MainContainer)