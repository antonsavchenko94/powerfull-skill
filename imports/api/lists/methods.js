import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router';
import {Dictionaries, Words} from '../models'
import { check } from 'meteor/check'

Meteor.methods({
    'user.create'(user){
        check(user, {
            username: String,
            email: String,
            password: String
        });
        if (Accounts.findUserByEmail(user.email)){
            console.log("This email exist")
        }else {
            Accounts.createUser({
                username: user.username,
                email: user.email,
                password: user.password
            });
        }
    },

    'dictionary.create'(title, public) {
        check(title, String)
        check(public, Boolean)
        let dictionary = {
            title,
            public,
            owner: Meteor.userId(),
        };
        Dictionaries.insert(dictionary, (err, doc) => {
            if(err) {
                console.log(err)
            }
        })
    },

    'save.word'(word) {
        check(word, {
            word: String,
            transcription: String,
            translation: String,
            dictionaryId: String,
            checked: Boolean
        });

        if(word){
            Words.insert(word, (err, doc) => {
                if(err){
                    console.log(err);
                }else {
                    console.log(doc);
                }
            })
        }
    },

    'word.setChecked'(id, setChecked){
        check(id, String)
        check(setChecked, Boolean)
        Words.update(id, { $set: { checked: setChecked } });
    }
});