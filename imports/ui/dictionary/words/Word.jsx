import React, {Component, PropTypes} from "react";
import {Panel, Table} from "react-bootstrap";
import classnames from 'classnames';
import {createContainer} from "meteor/react-meteor-data";

import {Words, Dictionaries} from "../../../api/models";

class Word extends Component {
    toggleChecked() {
        Meteor.call('word.setChecked', this.props.item._id, !this.props.item.checked);
    }

    render() {
        const wordClassName = classnames({
            checked: this.props.item.checked,
        });

        return (
            <tr key={this.props.item._id} className={wordClassName}>
                <td>
                    <input
                        type="checkbox"
                        readOnly
                        checked={this.props.item.checked}
                        onChange={this.toggleChecked.bind(this)}/>
                </td>
                <td>{ this.props.item.word }</td>
                <td>{ this.props.item.transcription}</td>
                <td>{ this.props.item.translation}</td>
            </tr>
        )
    }
}

Word.propsType = {
    item:PropTypes.object.isRequired,
};

export default WordContainer = createContainer(() => {
    return {}
}, Word)