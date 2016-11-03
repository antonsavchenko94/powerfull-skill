import React, {Component, PropTypes} from "react";
import classnames from "classnames";
import {Popover, OverlayTrigger} from "react-bootstrap";
import {createContainer} from "meteor/react-meteor-data";
import WordEditModal from "./wordModal/WordEditModal";
import WordDetailsModal from "./wordModal/WordDetailsModal";

class Word extends Component {
    toggleChecked() {
        let modifier = {
            checked: !this.props.item.checked
        };
        Meteor.call('word.update', this.props.item._id, modifier);
    }

    deleteWord() {
        Meteor.call('word.delete', this.props.item._id);
    }

    popoverHoverFocus(item) {
        return (
            <Popover id="popover-trigger-hover-focus" title={item.spell + " context"}>
                <p>{item.context}</p>
            </Popover>)

    }

    render() {
        const wordClassName = classnames({
            checked: this.props.item.checked,
        });
        return (
            <OverlayTrigger key={this.props.item._id} trigger={['hover', 'focus']} placement="bottom"
                            overlay={this.popoverHoverFocus(this.props.item)}>
                <tr key={this.props.item._id} className={wordClassName}>
                    <td>
                        <input
                            type="checkbox"
                            readOnly
                            checked={this.props.item.checked}
                            onChange={this.toggleChecked.bind(this)}/>
                    </td>
                    <td>
                        <WordDetailsModal word={this.props.item}/>
                    </td>
                    <td>{ this.props.item.transcription }</td>
                    <td>{ this.props.item.translation }</td>
                    <td>
                        <img onClick={ this.deleteWord.bind(this) } src="/images/rubbish-bin.png"
                             className="word-delete-button"/>
                        {' '}||{' '}
                        <WordEditModal word={this.props.item}/>
                    </td>
                </tr>
            </OverlayTrigger>
        )
    }
}
export default createContainer(() => {
    return {}
}, Word)
