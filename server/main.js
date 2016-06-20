import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  PlayersList = new Mongo.Collection('players');
  // We need to define this in the server as well or there will be an insert error on the client console
});
