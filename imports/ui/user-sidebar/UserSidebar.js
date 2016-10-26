import React, {Component, PropTypes} from "react";
import { Meteor } from 'meteor/meteor'
import {Row} from "react-bootstrap";
import {createContainer} from "meteor/react-meteor-data";

class UserSidebar extends Component {


    render() {

        return (
            <Row>
                <div className="profile-sidebar">
                    <div className="profile-userpic">
                        <img src="/images/man.png" />
                    </div>
                    <div className="profile-usertitle">
                        <div className="profile-usertitle-nam">
                            {this.props.user.username}
                        </div>
                    </div>
                    <div className="profile-userbuttons">
                    </div>
                    <div className="profile-usermenu">
                        <ul className="nav">
                            <li>
                                <a href="/all-dictionaries">
                                    <i className="glyphicon glyphicon-th"></i>
                                    All dictionaries</a>
                            </li>
                            <li>
                                <a href="/dictionaries">
                                    <i className="glyphicon glyphicon-book"></i>
                                    Our dictionaries </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="glyphicon glyphicon-user"></i>
                                    Account Settings </a>
                            </li>
                            <li>
                                <a href="/logout">
                                    <i className="glyphicon glyphicon-flag"></i>
                                    Logout </a>
                            </li>
                        </ul>
                    </div>

                </div>
            </Row>
        )
    }
}

export default UserSidebarContainer = createContainer(() => {
    return {
        user: Meteor.user() || {}
    };
}, UserSidebar)