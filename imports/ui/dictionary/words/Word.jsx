import React, {Component, PropTypes} from "react";
import classnames from "classnames";
import {createContainer} from "meteor/react-meteor-data";
import {Words} from "../../../api/models";

class Word extends Component {
    toggleChecked() {
        Meteor.call('word.setChecked', this.props.dictionaryId, this.props.item.spell, !this.props.item.checked);
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
                <td>{ this.props.item.spell }</td>
                <td>{ this.props.item.transcription}</td>
                <td>{ this.props.item.translation}</td>
            </tr>
        )
    }
}
export default WordContainer = createContainer(() => {
    return {}
}, Word)