import {Dictionaries} from "../../models";

Meteor.publish('currentUser', function () {
    if (this.userId) {
        return Meteor.users.find({_id: this.userId}, {
            fields: {}
        });
    }
});

Meteor.publish('users', function () {
    if (this.userId) {
        return Meteor.users.find({}, {
            fields: {
                _id: 1,
                username: 1
            }
        });
    } else {
        throw new Meteor.Error('You must authorize!!!')
    }
});

Meteor.publish('dictionaries', function () {
    if (this.userId) {
        return Dictionaries.find({});
    } else {
        throw new Meteor.Error('You must authorize!!!')
    }
});

Meteor.publish('dictionariesWithWords', function () {
    if (this.userId) {
        return Dictionaries.find({
            owner: this.userId,
            words: {$exists: true, $not: {$size: 0}}
        });
    } else {
        throw new Meteor.Error('You must authorize!!!')
    }
});

Meteor.publish('publicDictionaries', function () {
    return Dictionaries.find({isPublic: true})
});

Meteor.publish('dictionary', function (id) {
    check(id, String);
    if (this.userId) {
        return Dictionaries.find(id);
    } else {
        throw new Meteor.Error('You must authorize!!!')
    }
});

Meteor.publish('wordsOfDictionary', function (id) {
    check(id, String);
    if (this.userId) {
        return Dictionaries.find({_id: id}, {
            fields: {
                words: 1
            }
        });
    } else {
        throw new Meteor.Error('You must authorize!!!')
    }
});

