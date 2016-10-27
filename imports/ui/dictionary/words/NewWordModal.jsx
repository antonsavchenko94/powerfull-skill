import React, {Component, PropTypes} from "react";
import {Modal, Button, Form, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import ReactDOM from 'react-dom';
import {createContainer} from "meteor/react-meteor-data";

class NewWordModal extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false
        }
    }

    close() {
        this.setState({showModal: false});
    }

    open() {
        this.setState({showModal: true});
    }

    addWord() {
        let newWord = {
            word: ReactDOM.findDOMNode(this.refs.word).value.trim(),
            transcription: ReactDOM.findDOMNode(this.refs.transcription).value.trim(),
            translation: ReactDOM.findDOMNode(this.refs.translation).value.trim(),
            dictionaryId: FlowRouter.current().route.getParam('dictionaryId'),
            checked: false
        };

        Meteor.call('save.word', newWord);
        this.close();
    }

    render() {
        return (
            <div>
                <a onClick={this.open.bind(this)}>
                    <img src="/images/compose.png"/>
                </a>

                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create new card</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form >
                            <FormGroup controlId="formInlineWord">
                                <ControlLabel>Word</ControlLabel>
                                {' '}
                                <FormControl type="text" ref="word" placeholder="Word" />
                            </FormGroup>
                            <FormGroup controlId="formInlineTranscription">
                                <ControlLabel>Word</ControlLabel>
                                {' '}
                                <FormControl type="text" ref="transcription" placeholder="Transcription" />
                            </FormGroup>
                            <FormGroup controlId="formInlineTranslation">
                                <ControlLabel>Translation</ControlLabel>
                                {' '}
                                <FormControl type="text" ref="translation" placeholder="Translation" />
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                        <Button onClick={this.addWord.bind(this)}>Add</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}

export default NewWordModalContainer = createContainer(()=> {
    return{}
}, NewWordModal)