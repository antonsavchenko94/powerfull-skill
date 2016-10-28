import {Meteor} from "meteor/meteor";
import React, {Component, PropTypes} from "react";
import {Col, Panel, Row} from "react-bootstrap";
import {createContainer} from "meteor/react-meteor-data";
import {Dictionaries} from "../../api/models";
import NewDictionaryModalContainer from "./NewDictionaryModal";
let moment = require('moment');

class Card extends Component {

    componentDidMount() {
        document.title = "Our dictionaries"
    }

    removeCard(id) {
        Meteor.call("delete.dictionary", id)
    }

    renderDictionariesCard() {
        let dictionaries = this.props.dictionaries;

        return dictionaries.map(dictionary => {
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
        if (this.props.isLoading) {
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
        else {
            return (<div><h1>Loading...</h1></div>)
        }
    }

}

export default CardConteiner = createContainer(() => {
    const subscribe = Meteor.subscribe('dictionaries');
    return {
        isLoading: subscribe.ready(),
        dictionaries: Dictionaries.find({owner: Meteor.userId()}).fetch(),
    }

}, Card)