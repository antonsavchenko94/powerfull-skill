import React, {Component, PropTypes} from "react";
import {Modal, Button} from "react-bootstrap";
import {createContainer} from "meteor/react-meteor-data";


class NewDictionaryModal extends Component {
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

    render() {
        return (
            <div>
                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.open.bind(this)}>

                    <img src="images/plus.png"/>
                </Button>

                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Lalal
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
};

export default NewDictionaryModalContainer = createContainer(()=>{
    return {}
}, NewDictionaryModal)