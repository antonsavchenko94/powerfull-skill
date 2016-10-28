import {Meteor} from "meteor/meteor";
import {FlowRouter} from "meteor/kadira:flow-router";
import {Dictionaries} from "../models";
import {check} from "meteor/check";

Meteor.methods({
    'user.create'(user){
        check(user, {
            username: String,
            email: String,
            password: String
        });
        if (Accounts.findUserByEmail(user.email)) {
            console.log("This email exist")
        } else {
            Accounts.createUser({
                username: user.username,
                email: user.email,
                password: user.password
            });
        }
    },

    'dictionary.create'(title, isPublic) {
        check(title, String);
        check(isPublic, Boolean);
        let dictionary = {
            title,
            isPublic,
            wordCount: 0,
            owner: Meteor.userId(),
            words: []
        };
        Dictionaries.insert(dictionary, (err, doc) => {
            if (err) {
                console.log(err)
            }
        })
    },

    'delete.dictionary'(id){
        check(id, String);
        if (this.userId) {
            Dictionaries.remove(id, (err, doc) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(`Document ${doc} was removed`)
                }
            })
        }

    },

    'save.word'(word, dictionaryId) {
        check(word, {
            spell: String,
            transcription: String,
            translation: String,
            checked: Boolean
        });
        Dictionaries.update(dictionaryId, {
            $push: {
                words: word
            }
        }, (err, doc) => {
            if (err) {
                Meteor.Error(err)
            }
        })
    },

    'word.setChecked'(id, word, setChecked){
        check(id, String);
        check(setChecked, Boolean);

        Dictionaries.update({_id: id, 'words.spell': word}, {
            $set: {
                'words.$.checked': setChecked
            }
        }, (err, doc)=> {
            if (err) {
                Meteor.Error(err);
            } else {
                console.log(`${doc} doc was updated`)
            }
        });
    }
});