import React, {Component, PropTypes} from "react";
import {Panel, Table, Checkbox} from "react-bootstrap";
import {createContainer} from "meteor/react-meteor-data";
import {Words, Dictionaries} from "../../../../api/models";
import WordContainer from "./Word";
import NewWordModalContainer from "./wordModal/NewWordModal";

class WordsView extends Component {
    constructor() {
        super();
        this.state = {
            hideCompleted: false
        }
    }

    viewWords() {
        let words = this.props.words;
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

    togglePrivate() {
        let modifier = {
            isPublic: !this.props.dictionary.isPublic
        };
        Meteor.call('dictionary.update', this.props.dictionary._id, modifier)
    }

    uploadCsv(event) {
        event.preventDefault();
        let file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = () => {
            Meteor.call('word.importFromCsv', reader.result, this.props.dictionary._id)
        };
        reader.readAsText(file);
    }

    renderOperationsOnWords() {
        return (
            <form className="form-horizontal">
                <Checkbox
                    checked={this.state.hideCompleted}
                    onChange={this.toggleLearnedCompleted.bind(this)}
                >
                    Hide learned words
                </Checkbox>
                <Checkbox
                    checked={this.props.dictionary.isPublic}
                    onChange={this.togglePrivate.bind(this)}>
                    Is public dictionary
                </Checkbox>
                <NewWordModalContainer/>
                <input type="file" onChange={this.uploadCsv.bind(this)}/>
                <img src=""/>
            </form>
        )
    }

    render() {
        if (this.props.isLoading) {
            console.log(this.props.userId);
            console.log(!!this.props.userId );
            return (
                <Panel header={this.props.dictionary.title}>
                    {
                        this.props.userId === this.props.dictionary.owner?
                            this.renderOperationsOnWords() : ''
                    }
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Word</th>
                            <th>Transcription</th>
                            <th>Translation</th>
                            <th></th>
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
    let dictionarySubscribe = Meteor.subscribe('dictionary', id).ready(),
        wordSubscribe = Meteor.subscribe('words', id).ready();
    return {
        userId: Meteor.userId(),
        dictionary: Dictionaries.findOne(),
        words: Words.find().fetch(),
        isLoading: dictionarySubscribe && wordSubscribe,
    }
}, WordsView)