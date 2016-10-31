import React, {Component, PropTypes} from "react";
import {Tabs, Tab, Panel} from "react-bootstrap";
import {createContainer} from "meteor/react-meteor-data";
import ChangeInfo from "./ChangeInfo";
import ChangePassword from "./ChangePassword";
import UserAvatarUpload from "./UserAvatarUpload";

class UserSettings extends Component {
    render() {
        return (
            <Panel header="Settings">
                <Tabs defaultActiveKey={2} id="settings">
                    <Tab eventKey={1} title="Info">
                        <ChangeInfo/>
                    </Tab>
                    <Tab eventKey={2} title="Password">
                        <ChangePassword/>
                    </Tab>
                    <Tab eventKey={3} title="Avatar">
                        <UserAvatarUpload/>
                    </Tab>
                </Tabs>
            </Panel>
        )
    }
}

export default createContainer(() => {
    return {}
}, UserSettings)