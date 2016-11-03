import {Migrations} from "meteor/percolate:migrations";
import {Dictionaries, Words} from "../../models";

Migrations.add({
    version: 1,
    name: 'Decompose dictionaries',
    up: function () {
        Dictionaries.find({
            words: {$exists: true, $not: {$size: 0}}
        }).forEach((dictionary)=>{
            dictionary.words.forEach((word) => {
                word.dictionaryId = dictionary._id;
                word.context = '';
                word.userId = dictionary.owner;
                Words.insert(word)
            });
            Dictionaries.update({_id: dictionary._id}, {$unset: {words: 1}})
        })
    }
}
);