import React, {Component, PropTypes} from "react";
import {Modal, Button, ControlLabel} from "react-bootstrap";
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
        let word = this.props.word;
        return (
            <div>
                <a href="#" onClick={this.open.bind(this)}>
                    {word.spell}
                </a>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create new card</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <p>
                                <strong>{word.spell}</strong> - [{word.transcription}] - {word.translation}
                            </p>
                            <hr/>
                            <h3>Context of use</h3>
                            <p>
                                {word.context}
                            </p>
                            <hr/>
                            <h3>Synonyms</h3>
                            <ul>
                                {
                                    word.synonyms.length ?
                                        word.synonyms.map((synonym) => {
                                            return (
                                                <li key={synonym._id}>{synonym.spell}</li>
                                            )
                                        }) :
                                        (<li>No synonyms</li>)
                                }
                            </ul>
                        </div>
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
