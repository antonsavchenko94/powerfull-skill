import {Dictionaries, Words} from "../../models";

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

Meteor.publish('user', function (id) {
    if (this.userId) {
        return Meteor.users.find({_id: id}, {
            fields: {
                username: 1
            }
        })
    }
});

Meteor.publish('dictionaries', function () {
    if (this.userId) {
        return Dictionaries.find({}, {
            fields: {
                isPublic: 0
            }
        });
    } else {
        throw new Meteor.Error('You must authorize!!!')
    }
});

Meteor.publish('dictionariesWithWords', function () {
    if (this.userId) {
        let dictionariesId = [];
        Words.find({userId: this.userId}, {
            fields: {
                dictionaryId: 1
            }
        }).map((word) => {
            dictionariesId.push(word.dictionaryId)
        });
        return Dictionaries.find(
            {
                owner: this.userId,
                _id: {
                    $in: dictionariesId
                }
            },
            {
                fields: {
                    isPublic: 0
                }
            }
        );
    } else {
        throw new Meteor.Error('You must authorize!!!')
    }
});

Meteor.publish('publicDictionaries', function () {
    return Dictionaries.find({isPublic: true})
});

Meteor.publish('dictionariesOfAnotherUser', function (id) {
    if (this.userId) {
        return Dictionaries.find({owner: id, isPublic: true}, {
            fields: {
                title: 1,
                owner: 1
            }
        })
    }
});

Meteor.publish('dictionary', function (id) {
    check(id, String);
    if (this.userId) {
        return Dictionaries.find(id);
    } else {
        throw new Meteor.Error('You must authorize!!!')
    }
});

Meteor.publish('words', function (id) {
    check(id, String);
    if (this.userId) {
        return Words.find({dictionaryId: id});
    } else {
        throw new Meteor.Error('You must authorize!!!')
    }
});

