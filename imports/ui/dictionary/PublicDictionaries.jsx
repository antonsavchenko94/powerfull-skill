import { Meteor } from 'meteor/meteor'
import React, {Component, PropTypes} from "react";
import {FormControl, Col, Button, Panel} from "react-bootstrap";
import {createContainer} from "meteor/react-meteor-data";

import {Dictionaries} from '../../api/models'

class PublicDictionaries extends Component {

    componentDidMount() {
        document.title = "Public dictionaries"
    }

    renderPublicDictionaries() {
        let dictionaries = this.props.dictionaries;
        return dictionaries.map((dictionary) => {
            return (
                <Col lg={4} key={dictionary._id}>
                    <div className="card">
                        <h4><a href={"view/" + dictionary._id}>{dictionary.title}</a></h4>
                        <span>
                            <i>by </i>
                            <strong>{dictionary.owner.username}</strong>
                        </span>
                    </div>
                </Col>
            )
        })
    }

    render() {
        return (
            <Panel header="Public dictionaries">
                {this.renderPublicDictionaries()}
            </Panel>
        )
    }
}

export default PublicDictionariesConteiner = createContainer(() => {
    Meteor.subscribe('publicDictionaries')
    Meteor.subscribe('users')
    return{
        dictionaries: Dictionaries.find().map((dictionary) => {
            let user = Meteor.users.findOne({_id:dictionary.owner});
            dictionary.owner = user||{};
            return dictionary;
        } ),
    }
}, PublicDictionaries)