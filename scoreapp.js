// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Players = new Meteor.Collection("players");


if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to scoreapp.";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    if (Players.find().count() === 0) {
      var names = ["Rene Paulokat",
                   "Sam Joseph",
                   "Jon Mohrbacher",
                   "Bill Walker",
                   "Julian Alvarez"];
      for (var i = 0; i < names.length; i++)
        Players.insert({name: names[i], score: Math.floor(Random.fraction()*10)*5});
    }

  });
}
