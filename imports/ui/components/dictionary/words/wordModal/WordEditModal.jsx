import React, {Component, PropTypes} from "react";
import {Modal, Button, FormGroup, ControlLabel} from "react-bootstrap";
import {createContainer} from "meteor/react-meteor-data";

class WordEditModal extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false
        }
    }

    close() {
        this.setState({showModal: false});
    }

    open(event) {
        event.preventDefault();
        this.setState({showModal: true});
    }

    edit() {
        let modifier = {
            spell: this.refs.word.value.trim().toLowerCase(),
            transcription: this.refs.transcription.value.trim(),
            translation: this.refs.translation.value.trim(),
            context: this.refs.context.value.trim(),
        };
        Meteor.call('word.update', this.props.word._id, modifier, () => {
            this.setState({showModal: false});
        })
    }

    render() {
        return (
            <div className="edit-word">
                <img src="/images/edit.png" onClick={this.open.bind(this)} className="edit-word"/>

                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create new card</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup controlId="formInlineWord">
                                <ControlLabel>Word</ControlLabel>
                                {' '}
                                <input type="text" className="form-control" ref="word"
                                       defaultValue={this.props.word.spell} placeholder="Word"/>
                            </FormGroup>
                            <FormGroup controlId="formInlineTranscription">
                                <ControlLabel>Transcription</ControlLabel>
                                {' '}
                                <input type="text" className="form-control" ref="transcription"
                                       placeholder="Transcription" defaultValue={this.props.word.transcription}/>
                            </FormGroup>
                            <FormGroup controlId="formInlineTranslation">
                                <ControlLabel>Translation</ControlLabel>
                                {' '}
                                <input type="text" className="form-control" ref="translation"
                                       placeholder="Translation" defaultValue={this.props.word.translation}/>
                            </FormGroup>
                            <FormGroup controlId="formInlineWord">
                                <ControlLabel>Context</ControlLabel>
                                {' '}
                                <textarea className="form-control" ref="context" placeholder="Context"
                                          defaultValue={this.props.word.context}/>
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                        <Button onClick={this.edit.bind(this)}>Edit</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}

export default WordEditModal
