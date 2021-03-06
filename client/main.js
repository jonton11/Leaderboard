PlayersList = new Mongo.Collection('players');

Meteor.subscribe('thePlayers');

Template.leaderboard.helpers({
  'player': function() {
    return PlayersList.find({}, {sort: {score: -1, name: 1}});
    // pass arbitrary {} so we can pass another argument e.g. sort
    // Sort by + => DESC to ASC
    // Sort by - => ASC to DESC
  },
  'listPlayerCount': function() {
    var currentUserId = Meteor.userId();
    return PlayersList.find({createdBy: currentUserId}).count();
  },
  'selectedClass': function() {
    var playerId = this._id;
    var selectedPlayer = Session.get('selectedPlayer');
    if (playerId == selectedPlayer) {
      return "selected";
    }
  },
  'showSelectedPlayer': function() {
    var selectedPlayer = Session.get('selectedPlayer');
    return PlayersList.findOne(selectedPlayer);
  },
  'averageScore': function() {
    return PlayersList.find({}, {$avg: {score: 1}});
  }
});
Template.leaderboard.events({
  'click .player': function() {
    var playerId = this._id;
    Session.set('selectedPlayer', playerId);
  },
  'click .increment': function() {
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('modifyPlayerScore', selectedPlayer, 5);
  },
  'click .decrement': function() {
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('modifyPlayerScore', selectedPlayer, -5);
  }
});

Template.addPlayerForm.events({
  'submit form': function(event, template) {
    event.preventDefault();
    var playerNameVar = event.target.playerName.value;
    var playerScoreVar = parseInt(event.target.playerScore.value);
    event.target.playerName.value = "";
    event.target.playerScore.value = "";
    Meteor.call('insertPlayerData', playerNameVar, playerScoreVar);
  }
});
Template.removePlayerForm.events({
  'click .remove': function() {
    var selectedPlayer = Session.get('selectedPlayer');
    if (confirm("Do you want to remove " + PlayersList.findOne(selectedPlayer).name + "?")) {
      Meteor.call('removePlayerData', selectedPlayer);
    }
  }
});



// UserAccounts = new Mongo.Collection('users');
// We can name collection (table) in MongoDB whatever we want but it must be unique

// We pass data to the collection with the insert(); method in JSON format
//
// PlayersList.insert({ name: "Jon", score: 0});
// PlayersList.insert({ name: "David", score: 0});
// PlayersList.insert({ name: "Bob", score: 0});
// PlayersList.insert({ name: "Mary", score: 0});
// PlayersList.insert({ name: "Bill", score: 0});
// PlayersList.insert({ name: "Warren", score: 0});
// PlayersList.insert({ name: "Tim", score: 0});

// To find, we use .find() but this returns an object. We use .find().fetch() to store the data as an array
// Is there a method like .where for activerecord objects?
