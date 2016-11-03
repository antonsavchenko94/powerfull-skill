import React, {Component, PropTypes} from "react";
import {Modal, Button, Form, FormGroup, ControlLabel} from "react-bootstrap";
import {createContainer} from "meteor/react-meteor-data";
import Search from "react-search";

class NewWordModal extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            searchItems: [],
            synonyms: []
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
            dictionaryId: FlowRouter.current().route.getParam('dictionaryId'),
            spell: this.refs.word.value.trim().toLowerCase(),
            transcription: this.refs.transcription.value.trim(),
            translation: this.refs.translation.value.trim(),
            context: this.refs.context.value.trim() || "Context doesn   `t add",
            checked: false
        };
        Meteor.call('word.save', newWord, this.state.synonyms);
        this.close();
    }

    getItemsAsync(searchValue, cb) {
        Meteor.call('word.search', searchValue, (err, result) => {
            let items = result.map((res, i) => {
                return {id: i, value: res.spell}
            });
            this.setState({searchItems: items});
            cb(searchValue)
        })
    }

    setSynonyms(items) {
        let withoutId = items.map((item) => {
            return item.value;
        });
        this.setState({
            synonyms: withoutId
        });
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
                        <form onSubmit={this.addWord.bind(this)}>
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
                        </form>
                        <hr/>
                        <Form >
                            <FormGroup controlId="formInlineWord">
                                <ControlLabel>Context</ControlLabel>
                                {' '}
                                <textarea className="form-control" ref="context" placeholder="Context"/>
                            </FormGroup>
                        </Form>
                        <hr/>
                        <h4>Find and add synonyms</h4>
                        <Search items={this.state.searchItems}
                                multiple={true}
                                maxSelected={5}
                                getItemsAsync={this.getItemsAsync.bind(this)}
                                onItemsChanged={this.setSynonyms.bind(this)}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                        <Button bsStyle="primary" onClick={this.addWord.bind(this)}>Add</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}

export default createContainer(()=> {
    return {}
}, NewWordModal)
