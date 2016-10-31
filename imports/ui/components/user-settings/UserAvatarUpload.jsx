import React, {Component, PropTypes} from "react";
import {FormGroup, ControlLabel, Button} from "react-bootstrap";
import {createContainer} from "meteor/react-meteor-data";

class UserAvatarUpload extends Component {

    constructor() {
        super();
        this.state = {
            imageBase64Url: '',
            isImageUrlNotReady: true
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        Meteor.call('user.saveAvatar', this.state.imageBase64Url)
        this.refs.avatar.value = '';
    }

    handleImage(event) {
        event.preventDefault();

        let files = event.target.files;
        let fileReader = new FileReader();

        fileReader.onload = (event) => {
            this.setState({
                imageBase64Url: event.target.result,
                isImageUrlNotReady: false
            })
        };
        fileReader.readAsDataURL(files[0]);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup>
                    <ControlLabel>Avatar</ControlLabel>
                    {' '}
                    <input className="form-control"
                           ref="avatar"
                           type="file"
                           accept="image/*"
                           onChange={this.handleImage.bind(this)}
                    />
                </FormGroup>
                <Button type="submit" disabled={this.state.isImageUrlNotReady}>
                    Upload avatar
                </Button>
            </form>
        )
    }
}

export default createContainer(() => {
    return {}
}, UserAvatarUpload)
