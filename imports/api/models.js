import { Mongo } from 'meteor/mongo';

const Dictionaries = new Mongo.Collection('dictionaries');

const Words = new Mongo.Collection('words');

if (Meteor.isServer) {
    Meteor.publish('users', function() {
        if(this.userId){
            return Meteor.users.find();
        }else {
            throw new Meteor.Error('You must authorize!!!')
        }
    });

    Meteor.publish('dictionaries', function() {
        console.log(this.userId);
        if(this.userId){
            return Dictionaries.find();
        }else {
            throw new Meteor.Error('You must authorize!!!')
        }
    });

    Meteor.publish('publicDictionaries', function() {
        return Dictionaries.find({isPublic: true})
    });

    Meteor.publish('words', (id) => {
        return Words.find({dictionaryId: id })
    });
}

export {Dictionaries, Words}