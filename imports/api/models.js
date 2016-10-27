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

    Meteor.publish('current-user-dictionaries', function() {
        if(this.userId){
            return Dictionaries.find({owner: this.userId});
        }else {
            throw new Meteor.Error('You must authorize!!!')
        }
    });

    Meteor.publish('publicDictionaries', function() {
        return Dictionaries.find({isPublic: true})
    });

    Meteor.publish('words', function(id) {
        check(id, String);
        if(this.userId){
            return Words.find({dictionaryId: id})
        }
    });
}

export {Dictionaries, Words}