import {Mongo} from "meteor/mongo";

const Dictionaries = new Mongo.Collection('dictionaries');

export {Dictionaries}