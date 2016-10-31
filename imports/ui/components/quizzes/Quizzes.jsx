import {Meteor} from "meteor/meteor";
import React, {Component, PropTypes} from "react";
import {Col, Panel} from "react-bootstrap";
import {createContainer} from "meteor/react-meteor-data";
import {Dictionaries} from "../../../api/models";


class Quizzes extends Component {

    renderQuizCards() {
        let dictionaries = this.props.dictionaries;
        return dictionaries.map((dictionary) => {
            return(
                <Col lg={5} key={dictionary._id}>
                    <div className="card">
                        <Col lg={10}>
                            <h4>
                                <a href={"/quiz/" + dictionary._id}>{`Quiz of "${dictionary.title}"`}</a>
                            </h4>
                        </Col>
                    </div>
                </Col>
            )
        })
    }

    render() {
        return (
            <Panel header="Quizzes based on your dictionaries">
                {this.renderQuizCards()}
            </Panel>
        )
    }
}

export default createContainer(() => {
    Meteor.subscribe('dictionariesWithWords');
    return{
        dictionaries: Dictionaries.find().fetch(),
    }
}, Quizzes)