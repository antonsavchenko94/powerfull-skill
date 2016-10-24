import { Meteor } from 'meteor/meteor'
import React, {Component, PropTypes} from "react";
import {FormControl, Col, Button, Panel} from "react-bootstrap";
import {createContainer} from "meteor/react-meteor-data";
import ReactDOM from 'react-dom';

import {Dictionaries} from '../../api/models'

// import NewDictionaryModalContainer from './NewDictionaryModal'

class Card extends Component {

    renderDictionariesCard() {
        console.log(this.props.dictionaries);
        let dictionaries = this.props.dictionaries;
         return dictionaries.map((dictionary) => {
            return (
                <Col lg={4} key={dictionary._id}>
                    <div className="card">
                        <h2><a href={"view/" + dictionary._id}>{dictionary.title}</a></h2>
                    </div>
                </Col>
            )
        })
    }

    addNewCard() {
        let title = ReactDOM.findDOMNode(this.refs.title).value.trim()
        if(title){
            console.log(title)
            Meteor.call('dictionary.create', title);
        }
    }

    render() {
        return (
            <Panel header="Our dictionaries">
                {this.renderDictionariesCard()}
                <Col lg={4}>
                    <div className="card">
                        <input type="text" ref="title" placeholder="Title"/>
                        <Button bsStyle="primary" onClick={this.addNewCard.bind(this)}>
                            <img src="images/plus.png"/>
                        </Button>
                    </div>
                </Col>
            </Panel>
        )
    }

}

export default DictionariesConteiner = createContainer(() => {
    Meteor.subscribe('dictionaries');
    console.log(Dictionaries.find({}).count());
    return {
        dictionaries: Dictionaries.find({}).fetch(),
    }
}, Card)