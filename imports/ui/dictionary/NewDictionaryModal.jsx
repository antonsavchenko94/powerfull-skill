import React, {Component, PropTypes} from "react";
import {Modal, Button, Form, FormGroup, FormControl, Checkbox} from "react-bootstrap";
import {createContainer} from "meteor/react-meteor-data";
import ReactDOM from 'react-dom';


class NewDictionaryModal extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            isPublic: false
        }
    }

    close() {
        this.setState({showModal: false});
    }

    open() {
        this.setState({showModal: true});
    }

    createCard() {
        let title = ReactDOM.findDOMNode(this.refs.title).value.trim();
        let isPublic = this.state.isPublic;
        if(title){
            Meteor.call('dictionary.create', title, isPublic);
            this.setState({showModal: false});
        }
    }

    choosePublic() {
        this.setState({
            isPublic: !this.state.isPublic
        })
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
                        <Form>
                            <FormGroup controlId="formInlineName">
                                {' '}
                                <FormControl type="text" ref="title" placeholder="Title" />
                            </FormGroup>
                            <FormGroup controlId="formInlinePrivate">
                                {' '}
                                <Checkbox onClick={this.choosePublic.bind(this)}>
                                    Is public
                                </Checkbox>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                        <Button onClick={this.createCard.bind(this)}>Create</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
};

export default NewDictionaryModalContainer = createContainer(()=>{
    return {}
}, NewDictionaryModal)