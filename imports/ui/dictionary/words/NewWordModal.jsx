import React, {Component, PropTypes} from "react";
import {Modal, Button, Form, FormGroup, ControlLabel} from "react-bootstrap";
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
            spell: this.refs.word.value.trim().toLowerCase(),
            transcription: this.refs.transcription.value.trim(),
            translation: this.refs.translation.value.trim(),
            checked: false
        };

        Meteor.call('save.word', newWord, FlowRouter.current().route.getParam('dictionaryId'));
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
                                <input type="text" className="form-control" ref="word" placeholder="Word"/>
                            </FormGroup>
                            <FormGroup controlId="formInlineTranscription">
                                <ControlLabel>Transcription</ControlLabel>
                                {' '}
                                <input type="text" className="form-control" ref="transcription"
                                       placeholder="Transcription"/>
                            </FormGroup>
                            <FormGroup controlId="formInlineTranslation">
                                <ControlLabel>Translation</ControlLabel>
                                {' '}
                                <input type="text" className="form-control" ref="translation"
                                       placeholder="Translation"/>
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
    return {}
}, NewWordModal)