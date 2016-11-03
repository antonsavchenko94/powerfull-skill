import {Mongo} from "meteor/mongo";

const Dictionaries = new Mongo.Collection('dictionaries');

const Words = new Mongo.Collection('words');

export {Dictionaries, Words}