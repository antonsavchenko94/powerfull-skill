import {Meteor} from "meteor/meteor";
import React, {Component} from "react";
import {Col, Button, Panel, Form, FormGroup, ControlLabel} from "react-bootstrap";
import {createContainer} from "meteor/react-meteor-data";
import {Dictionaries} from "../../api/models";

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
        let answer = this.refs.answer.value.trim().toLowerCase();

        if (answer === words[index].word) {
            this.setState({
                msg: "Correct answer",
                correctAnswers: this.state.correctAnswers + 1,
            });
        } else if (words) {
            this.setState({
                msg: "Wrong answer",
                wrongAnswers: this.state.wrongAnswers + 1,
            });
        }
    }

    nextWord() {
        this.setState({
            questionIndex: this.state.questionIndex + 1,
            msg: ''
        });
    }

    renderQuizWords() {
        let index = this.state.questionIndex,
            words = this.props.dictionary.words;

        if (index <= words.length - 1) {
            return (
                <Form inline>
                    <FormGroup controlId="formInlineEmail">
                        <ControlLabel>{words[index].translation}</ControlLabel>
                        {' - '}
                        <input className="form-control" type="text" ref="answer" placeholder="Write translation"/>
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
        } else {
            return (
                <Col lg={6}>
                    <h1>You have {this.state.correctAnswers} correct answers and {this.state.wrongAnswers} wrong</h1>
                </Col>
            )
        }

    }

    render() {
        if (this.props.isLoading) {
            return (
                <Panel header="Quiz">
                    {this.renderQuizWords()}
                </Panel>
            )
        } else {
            return (<div><h1>Loading...</h1></div>)
        }

    }
}

export default QuizContainer = createContainer(({id}) => {
    const subscribe = Meteor.subscribe("wordsOfDictionary", id);
    return {
        isLoading: subscribe.ready(),
        dictionary: Dictionaries.findOne()
    }

}, Quiz)