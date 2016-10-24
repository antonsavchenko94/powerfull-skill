import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router';
import {Dictionaries} from '../imports/api/models'

Meteor.methods({
    'user.create'(user){
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

    'dictionary.create'(title) {
        console.log('dictionary')
        let dictionary = {
            title,
            owner: Meteor.userId(),
        };
        console.log(dictionary)
        Dictionaries.insert(dictionary, (err, doc) => {
            if(err){
                console.log(err)
            } else {
                console.log(doc)
            }
        })
    }
});