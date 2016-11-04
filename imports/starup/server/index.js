import {Meteor} from "meteor/meteor";
import {Migrations} from "meteor/percolate:migrations";
import "../../api/lists/methods";
import "../../api/lists/server/hooks";
import "../../api/lists/server/publish";
import "../../api/lists/server/migrations";


Meteor.startup(() => {
    Migrations.migrateTo('latest');
});


