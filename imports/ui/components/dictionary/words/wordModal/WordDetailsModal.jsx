import React, {Component, PropTypes} from "react";
import {Modal, Button, Form, FormGroup, ControlLabel} from "react-bootstrap";
import {createContainer} from "meteor/react-meteor-data";

class WordDetailsModal extends Component {
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

    render() {
        return (
            <div>
                <a href="#" onClick={this.open.bind(this)}>
                    {this.props.word.spell}
                </a>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create new card</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup controlId="formInlineWord">
                                <ControlLabel>Word</ControlLabel>
                                {' '}
                                <input type="text" className="form-control" ref="word" defaultValue={this.props.word.spell}  placeholder="Word" readOnly/>
                            </FormGroup>
                            <FormGroup controlId="formInlineTranscription">
                                <ControlLabel>Transcription</ControlLabel>
                                {' '}
                                <input type="text" className="form-control" ref="transcription readOnly"
                                       placeholder="Transcription" defaultValue={this.props.word.transcription} readOnly/>
                            </FormGroup>
                            <FormGroup controlId="formInlineTranslation">
                                <ControlLabel>Translation</ControlLabel>
                                {' '}
                                <input type="text" className="form-control" ref="translation"
                                       placeholder="Translation" defaultValue={this.props.word.translation} readOnly/>
                            </FormGroup>
                            <FormGroup controlId="formInlineWord">
                                <ControlLabel>Context</ControlLabel>
                                {' '}
                                <textarea className="form-control" ref="context" placeholder="Context" defaultValue={this.props.word.context}/>
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}

export default WordDetailsModal