import { Meteor } from 'meteor/meteor'
import React, {Component, PropTypes} from "react";
import {FormControl, Col, Button, Panel} from "react-bootstrap";
import {createContainer} from "meteor/react-meteor-data";

import {Dictionaries} from '../../api/models'

import NewDictionaryModalContainer from './NewDictionaryModal'

class Card extends Component {

    componentDidMount() {
        document.title = "Our dictionaries"
    }

    renderDictionariesCard() {
        let dictionaries = this.props.dictionaries;
         return dictionaries.map((dictionary) => {
            return (
                <Col lg={3} key={dictionary._id}>
                    <div className="card">
                        <h4><a href={"view/" + dictionary._id}>{dictionary.title}</a></h4>
                    </div>
                </Col>
            )
        })
    }

    render() {
        return (
            <Panel header="Our dictionaries">
                    <NewDictionaryModalContainer/>
                {this.renderDictionariesCard()}
            </Panel>
        )
    }

}

export default CardConteiner = createContainer(() => {
    Meteor.subscribe('dictionaries');
    return {
        dictionaries: Dictionaries.find({owner: Meteor.userId()}).fetch(),
    }
}, Card)