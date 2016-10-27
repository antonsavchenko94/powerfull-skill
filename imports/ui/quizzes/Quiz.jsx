import { Meteor } from 'meteor/meteor'
import React, {Component, PropTypes} from "react";
import {FormControl, Col, Button, Panel, Form, FormGroup, ControlLabel} from "react-bootstrap";
import {createContainer} from "meteor/react-meteor-data";
import ReactDOM from 'react-dom';

import {Words} from '../../api/models'

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionIndex: 0,
            msg: '',
            correctAnswers: 0,
            wrongAnswers: 0,
        }
    }

    checkAnswer() {
        let index = this.state.questionIndex;
        let answer = ReactDOM.findDOMNode(this.refs.answer).value.trim().toLowerCase();

        if(answer === this.props.words[index].word){
            this.setState ({
                msg: "Correct answer",
                correctAnswers: this.state.correctAnswers + 1,
            });
        }else if(this.props.words) {
            this.setState({
                msg: "Wrong answer",
                wrongAnswers: this.state.wrongAnswers + 1,
            });
        }
    }

    nextWord() {
        this.setState ({
            questionIndex: this.state.questionIndex + 1,
            msg: ''
        });
    }

    renderQuizWords() {
        let index = this.state.questionIndex;
        console.log(index);
        console.log(this.props.words.length);
        if(index <= this.props.words.length - 1) {
            return (
                <Form inline>
                    <FormGroup controlId="formInlineEmail">
                        <ControlLabel>{this.props.words[index].translation}</ControlLabel>
                        {' - '}
                        <FormControl type="text" ref="answer" placeholder="Write translation" />
                    </FormGroup>
                    <Button onClick={this.checkAnswer.bind(this)}>
                        Check
                    </Button>
                    <Button onClick={this.nextWord.bind(this)}>
                        Next
                    </Button>
                    <span>{this.state.msg}</span>
                </Form>
            )
        }else {
            return(
                <Col lg={6}>
                    <h1>You have {this.state.correctAnswers} correct answers and {this.state.wrongAnswers} wrong</h1>
                </Col>
            )
        }

    }

    render() {
        return(
            <Panel header="Quiz">
                {this.renderQuizWords()}
            </Panel>
        )
    }
}

export default QuizContainer = createContainer(({id}) => {
    Meteor.subscribe("words", id);
    return{
        words: Words.find().fetch()
    }

}, Quiz)