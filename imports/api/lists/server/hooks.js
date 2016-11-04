import {Dictionaries, Words} from "../../models";

Dictionaries.before.insert((userId, doc) => {
    doc.createdAt = Date.now();
});

Dictionaries.after.remove((userId, doc) => {
   Words.remove({dictionaryId: doc._id}, (err, doc) =>  {
        if (err) {
            console.log(err);
        }
        else {
            console.log(`${doc} document was removed from Word`);
        }
    })
});

Words.before.insert((userId, doc) => {
    doc.createdAt = Date.now();
    doc.cheked = false;
});