import React, {Component, PropTypes} from "react";
import {createContainer} from "meteor/react-meteor-data";
import {FormGroup, ControlLabel, Button} from "react-bootstrap";

class ChangePassword extends Component {

    handleSubmit(event) {
        event.preventDefault();


        let oldPassword = this.refs.oldPassword.value.trim(),
            newPassword = this.refs.newPassword.value.trim(),
            newPasswordConfirm = this.refs.newPasswordConfirm.value.trim();

        if (oldPassword && newPassword && newPasswordConfirm) {
            if (newPassword === newPasswordConfirm) {
                Accounts.changePassword(oldPassword, newPassword, (err) => {
                    if (err) {
                        console.log(err);
                    }
                })
            }
            this.refs.oldPassword.value = '';
            this.refs.newPassword.value = '';
            this.refs.newPasswordConfirm.value = '';
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup>
                    <ControlLabel>Old password</ControlLabel>
                    {' '}
                    <input className="form-control" ref="oldPassword" type="password"/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>New password</ControlLabel>
                    {' '}
                    <input className="form-control" ref="newPassword" type="password"/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Confirm new password</ControlLabel>
                    {' '}
                    <input className="form-control" ref="newPasswordConfirm" type="password"/>
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
}, ChangePassword)
