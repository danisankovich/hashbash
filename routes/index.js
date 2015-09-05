var express = require('express');
var Twitter = require("twitter");
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/twinder');

var Shunned = mongoose.model("Shunned", {
  screen_name: { type: String},
});

function twitterClient(params) {
  return new Twitter({
    // consumer_key: process.env.CONSUMER_KEY,
    consumer_key: 'MDWiiB3CQ9s0hAzoZkdhYM4Gt',
    consumer_secret: '08QR5iNPpI9vM3cbtXl3Lo82ZKFEWI7bx7z7iL7KKawm6Wxhon',
    // consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: params.access_token_key,
    access_token_secret: params.access_token_secret
  });
}
var routes = function(passport) {
  router.get('/auth/twitter', passport.authenticate('twitter'));

  // handle the callback after twitter has authenticated the user
  router.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect : '/profile',
    failureRedirect : '/'
  }));

  router.post('/tweet', function(req, res, next) {
    var client = twitterClient(req.body);

    client.post('statuses/update', { status: req.body.tweet }, function(error, tweets, response){
      if (error) {
        console.error(error);
        res.status(500);
        return;
      }
      res.json(tweets);
    });
  });

  router.post('/search', function(req, res, next) {
    var client = twitterClient(req.body);
    var words = req.body.words.toLowerCase().split(" ");

    client.get('search/tweets', { q: words.join(" OR "), count: 100 }, function(error, tweets, response){
      if (error) {
        console.error(error);
        res.status(500);
        return;
      }
      var stats = {}, oneTweetWords, lowerCaseWord, users = {};

      tweets.statuses.forEach(function(tweet) {
        oneTweetWords = tweet.text.toLowerCase().split(" ");
        oneTweetWords.forEach(function(word) {
          lowerCaseWord = word.toLowerCase();
          if (words.indexOf(lowerCaseWord) >= 0) {
            stats[word] = stats[word] || 0;
            stats[word]++;
            var ratio = tweet.user.friends_count/tweet.user.followers_count;
            tweet.user.ratio = ratio > 1 ? 1.0/ratio : ratio;
            users[tweet.user.screen_name] = tweet.user;
          }
        });
      });
      res.json({ stats: stats, users: users });
    });
  });

  router.post('/follow', function(req, res, next) {
    var client = twitterClient(req.body);
    client.post('friendships/create', { screen_name: req.body.screen_name }, function(error, user, response){
      if (error) {
        console.error(error);
        res.status(500);
        return;
      }
      res.json(user);
    });

  });

  Shunned.on('index', function(err) {
    if (err) {
      console.error(err);
    }
  });

  router.post('/ignore', function(req, res) {
    var newShunned = new Shunned(req.body);
    newShunned.save(function(err, savedShunned) {
      if (err) {
        console.log(err);
        res.status(400).json({error: "Bad Request"});
      }
      console.log("savedShunned:", savedShunned);
      res.json(savedShunned);
    });
  });

  router.get('/ignore', function(req, res) {
    Shunned.find({}).exec(function(err, shunnedUsers) {
      if (err) {
        console.log(err);
      }
      var shunned = shunnedUsers.map(function(shunnedUsers) { //thank you to those who helped with the map function
        return shunnedUsers.screen_name; //shunned = shunnedUsers screennames
      });
      res.json(shunned);
    });
  });
  return router;
};

module.exports = routes;
// module.exports = router;
