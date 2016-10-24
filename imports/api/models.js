import { Mongo } from 'meteor/mongo';

const Dictionaries = new Mongo.Collection('dictionaries');
if (Meteor.isServer) {
    Meteor.publish('dictionaries', () => {
        console.log('i am here')
        return Dictionaries.find({})
    });
}
const Words = new Mongo.Collection('words');

export {Dictionaries, Words}