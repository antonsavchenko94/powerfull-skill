import { Meteor } from 'meteor/meteor'
import React, {Component, PropTypes} from "react";
import {FormControl, Col, Button, Panel, Row} from "react-bootstrap";
import {createContainer} from "meteor/react-meteor-data";
let moment  = require('moment')

import {Dictionaries} from '../../api/models'
import NewDictionaryModalContainer from './NewDictionaryModal'

class Card extends Component {

    componentDidMount() {
        document.title = "Our dictionaries"
    }
    removeCard(id) {
        Meteor.call("delete.dictionary", id)
    }

    renderDictionariesCard() {
        let dictionaries = this.props.dictionaries;
         return dictionaries.map((dictionary) => {
            return (
                <Col lg={5} key={dictionary._id}>
                    <div className="card">
                           <Col lg={10}>
                               <h4><a href={"view/" + dictionary._id}>{dictionary.title}</a></h4>
                               <span>{moment(dictionary.createdAt).format('l')}</span>
                           </Col>
                            <Col lg={2}>
                                <a onClick={this.removeCard.bind(this, dictionary._id)}>
                                    <img className="delete-button" src="/images/delete.png"/>
                                </a>
                            </Col>
                    </div>
                </Col>
            )
        })
    }
    render() {
        return (
            <Panel header="Our dictionaries">
                <Row>
                    <Col lg={6} className="panel-of-action">
                        <NewDictionaryModalContainer/>
                    </Col>
                </Row>
                {this.renderDictionariesCard()}
            </Panel>
        )
    }

}

export default CardConteiner = createContainer(() => {
    Meteor.subscribe('dictionaries');
    console.log(Meteor.userId());
    return {
        dictionaries: Dictionaries.find({owner: Meteor.userId()}).fetch(),
    }
}, Card)