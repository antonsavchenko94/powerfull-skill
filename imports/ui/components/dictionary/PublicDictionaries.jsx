import { Meteor } from 'meteor/meteor'
import React, {Component, PropTypes} from "react";
import {FormControl, Col, Button, Panel} from "react-bootstrap";
import {createContainer} from "meteor/react-meteor-data";

import {Dictionaries} from '../../../api/models'

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
                            <strong><a href={"/user/" + dictionary.owner._id}>{dictionary.owner.username}</a></strong>
                        </span>
                    </div>
                </Col>
            )
        })
    }

    render() {
        if(this.props.isLoading){
            return (
                <Panel header="Public dictionaries">
                    {this.renderPublicDictionaries()}
                </Panel>
            )
        }
        else {
            return (<div><h1>Loading...</h1></div>)
        }
    }
}

export default createContainer(() => {
    let dictionarySub = Meteor.subscribe('publicDictionaries').ready(),
        userSub = Meteor.subscribe('users').ready();
    return{
        dictionaries: Dictionaries.find().map((dictionary) => {
            dictionary.owner = Meteor.users.findOne({_id: dictionary.owner});
            return dictionary;
        } ),
        isLoading: userSub && dictionarySub
    }
}, PublicDictionaries)