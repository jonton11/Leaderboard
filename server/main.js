import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  PlayersList = new Mongo.Collection('players');
  // We need to define this in the server as well or there will be an insert error on the client console
});

Meteor.publish('thePlayers', function() {
  var currentUserId = this.userId;
  return PlayersList.find({createdBy: currentUserId});
});

Meteor.methods({
  'insertPlayerData': function(playerNameVar){
    var currentUserId = Meteor.userId();
    PlayersList.insert({
        name: playerNameVar,
        score: 0,
        createdBy: currentUserId
    });
  },
  'removePlayerData': function(selectedPlayer){
    var currentUserId = Meteor.userId();
    PlayersList.remove({_id: selectedPlayer, createdBy: currentUserId});
  },
  'modifyPlayerScore': function(selectedPlayer, scoreValue) {
    var currentUserId = Meteor.userId();
    PlayersList.update({_id: selectedPlayer, createdBy: currentUserId}, {$inc: {score: scoreValue}});
  }
});
