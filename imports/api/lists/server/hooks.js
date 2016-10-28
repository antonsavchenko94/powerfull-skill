import {Dictionaries, Words} from "../../models";

Dictionaries.before.insert((userId, doc) => {
    doc.createdAt = Date.now();
});
