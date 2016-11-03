import {Meteor} from "meteor/meteor";
import React, {Component, PropTypes} from "react";
import {Col, Panel, Row} from "react-bootstrap";
import {createContainer} from "meteor/react-meteor-data";
import {Dictionaries} from "../../../api/models";
let moment = require('moment');

class UserCards extends Component {
    renderDictionariesCard() {
        let dictionaries = this.props.dictionaries;
        let user = this.props.user;
        return dictionaries.map((dictionary) => {
            return (
                <Col lg={5} key={dictionary._id}>
                    <div className="card">
                        <Col lg={10}>
                            <h4><a href={"/user/" + user._id + "/view/" + dictionary._id}>{dictionary.title}</a></h4>
                            <span>{moment(dictionary.createdAt).format('l')}</span>
                        </Col>
                    </div>
                </Col>
            )
        })
    }

    render() {
        if(this.props.isLoading){
            return (
                <Panel header={this.props.user.username + " dictionaries"}>
                    <Row>
                        {this.renderDictionariesCard()}
                    </Row>
                </Panel>
            )
        }
        else {
            return (<div><h1>Loading...</h1></div>)
        }
    }
}

export default createContainer(({id}) => {
    let dictionarySub = Meteor.subscribe('dictionariesOfAnotherUser', id).ready(),
        userSub = Meteor.subscribe('user', id).ready();
    return {
        dictionaries: Dictionaries.find().fetch(),
        user: Meteor.users.findOne(),
        isLoading: dictionarySub && userSub
    }
}, UserCards);