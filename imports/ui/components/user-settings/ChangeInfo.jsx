import React, {Component, PropTypes} from "react";
import {FormGroup, ControlLabel, Button} from "react-bootstrap";
import {createContainer} from "meteor/react-meteor-data";

class ChangeInfo extends Component {

    handleSubmit(event) {
        event.preventDefault();

        let username = this.refs.username.value.trim(),
            email = this.refs.email.value.trim();

        if (username) {
            Meteor.call('user.changeUsername', username);
        }
        if (email) {
            Meteor.call('user.changeEmail', email);
        }

        this.refs.username.value = '';
        this.refs.email.value = '';
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup>
                    <ControlLabel>Username</ControlLabel>
                    {' '}
                    <input className="form-control" ref="username" type="text"/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Email</ControlLabel>
                    {' '}
                    <input className="form-control" ref="email" type="text"/>
                </FormGroup>
                <Button type="submit">
                    Submit changes
                </Button>
            </form>
        )

    }
}

export default createContainer(() => {
    return {}
}, ChangeInfo)
