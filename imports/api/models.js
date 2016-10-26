import { Mongo } from 'meteor/mongo';

const Dictionaries = new Mongo.Collection('dictionaries');

const Words = new Mongo.Collection('words');
// const Users = new Mongo.Collection('users');


if (Meteor.isServer) {
    Meteor.publish('users', () => {
        return Meteor.users.find();
    });
    Meteor.publish('dictionaries', () => {
        return Dictionaries.find()
    });

    Meteor.publish('publicDictionaries', () => {
        return Dictionaries.find({public: true})
    });

    Meteor.publish('words', (id) => {
        return Words.find({dictionaryId: id })
    });
}

export {Dictionaries, Words}