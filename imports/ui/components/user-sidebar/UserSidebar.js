import React, {Component, PropTypes} from "react";
import {Meteor} from "meteor/meteor";
import {Row} from "react-bootstrap";
import {createContainer} from "meteor/react-meteor-data";

class UserSidebar extends Component {


    render() {
        if(this.props.isLoading){
            return (
                <Row>
                    <div className="profile-sidebar">
                        <div className="profile-userpic">
                            <img src={this.props.user.avatarUrl ? this.props.user.avatarUrl : "/images/man.png" } />
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
                                        Public dictionaries</a>
                                </li>
                                <li>
                                    <a href="/dictionaries">
                                        <i className="glyphicon glyphicon-book"></i>
                                        Your dictionaries </a>
                                </li>
                                <li>
                                    <a href="/settings">
                                        <i className="glyphicon glyphicon-user"></i>
                                        Account Settings </a>
                                </li>
                                <li>
                                    <a href="/quizzes">
                                        <i className="glyphicon glyphicon-check"></i>
                                        Quizzes </a>
                                </li>
                                <li>
                                    <a href="/faq">
                                        <i className="glyphicon glyphicon-warning-sign"></i>
                                        FAQ</a>
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
        else {
            return(<div><h1>Loading...</h1></div>)
        }

    }
}

export default createContainer(() => {
    const subscribe =  Meteor.subscribe("currentUser");
    return {
        isLoading: subscribe.ready(),
        user: Meteor.user()
    };
}, UserSidebar)