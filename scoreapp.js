// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

/* // Here we dont use var because is a global thing, we want this in all app,
 and we use it in server and client code.*/
Players = new Meteor.Collection("players");  


if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to scoreapp.";
  };
  Template.hello.players = function () {
    return Players.find({}, {sort: {score: -1, name: 1}});
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
  Meteor.startup(function () {   //this run before all the server code
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
