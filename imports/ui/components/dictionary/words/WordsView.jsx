import React, {Component, PropTypes} from "react";
import {Panel, Table, Checkbox} from "react-bootstrap";
import {createContainer} from "meteor/react-meteor-data";
import {Words, Dictionaries} from "../../../../api/models";
import WordContainer from "./Word";
import NewWordModalContainer from "./NewWordModal";

class WordsView extends Component {
    constructor() {
        super();
        this.state = {
            hideCompleted: false
        }
    }

    viewWords() {
        let words = this.props.dictionary.words;
        if (this.state.hideCompleted) {
            words = words.filter(item => !item.checked);
        }
        return words.map((item, index) => {
            return (
                <WordContainer dictionaryId={this.props.dictionary._id} item={item} key={index}/>
            )
        })
    }

    toggleLearnedCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    }

    render() {
        if (this.props.isLoading) {
            return (
                <Panel header={this.props.dictionary.title}>
                    <Checkbox
                        checked={this.state.hideCompleted}
                        onClick={this.toggleLearnedCompleted.bind(this)}
                    >
                        Hide learned words
                    </Checkbox>
                    <NewWordModalContainer/>
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Word</th>
                            <th>Transcription</th>
                            <th>Translation</th>
                        </tr>
                        </thead>
                        <tbody className="word-container">
                        {this.viewWords()}
                        </tbody>
                    </Table>
                </Panel>
            )
        }
        else {
            return (<div><h1>Loading...</h1></div>)
        }
    }
}

export default createContainer(({id}) => {
    let subscribe = Meteor.subscribe('dictionary', id);
    return {
        dictionary: Dictionaries.findOne(),
        isLoading: subscribe.ready(),
    }
}, WordsView)