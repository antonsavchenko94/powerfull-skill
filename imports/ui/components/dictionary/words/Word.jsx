import React, {Component, PropTypes} from "react";
import classnames from "classnames";
import {createContainer} from "meteor/react-meteor-data";
import WordDetailsModal from "./wordModal/WordDetailsModal";

class Word extends Component {
    toggleChecked() {
        Meteor.call('word.setChecked', this.props.item._id, !this.props.item.checked);
    }

    deleteWord() {
        Meteor.call('word.delete', this.props.item._id);
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
                <td>
                    <div>
                        <WordDetailsModal word={this.props.item}/>
                    </div>
                </td>
                <td>{ this.props.item.transcription }</td>
                <td>{ this.props.item.translation }</td>
                <td>
                    <img onClick={ this.deleteWord.bind(this) } src="/images/rubbish-bin.png"
                         className="word-delete-button"/>
                </td>
            </tr>
        )
    }
}
export default createContainer(() => {
    return {}
}, Word)