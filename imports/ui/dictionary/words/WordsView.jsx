import React, {Component, PropTypes} from "react";
import {Panel, Table, Checkbox} from "react-bootstrap";
import {createContainer} from "meteor/react-meteor-data";

import {Words, Dictionaries} from "../../../api/models";
import WordContainer from './Word'
import NewWordModalContainer from './NewWordModal'

class WordsView extends Component {
    constructor(){
        super();
        this.state ={
            hideCompleted:false
        }
    }

    componentDidMount() {
        document.title = this.props.dictionary.title
    }

    viewWords() {
        let words = this.props.words;
        if (this.state.hideCompleted) {
            words = words.filter(item => !item.checked);
        }
        return words.map((item) =>{
            return(
                <WordContainer item={item}  key={item._id}/>
            )
        })
    }

    toggleLearnedCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    }

    render() {
        return (
            <Panel header={this.props.dictionary.title}>
                <Checkbox
                    checked={this.state.hideCompleted}
                    onClick={this.toggleLearnedCompleted.bind(this)}
                >
                    Hide learned words ({this.props.learnedCount})
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
}

export default WordsViewContainer = createContainer(({id}) => {
    Meteor.subscribe('words', id);
    Meteor.subscribe('dictionaries');
    return {
        words: Words.find().fetch(),
        learnedCount: Words.find({ checked: true }).count(),
        dictionary: Dictionaries.findOne({_id: id}) || {},
    }
}, WordsView)