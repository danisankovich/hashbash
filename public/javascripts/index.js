'use strict';

var app = angular.module('sif', ['ui.router']);

angular.module('sif')
.run(function(){
  console.log('Sif Has Arrived');
});
//hey

'use strict';

angular.module('sif')
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {url: '/', templateUrl: '../templates/home/home.html'})
});

'use strict';

angular.module('sif')
.constant('urls',{
  'apiUrl': ''
});

'use strict';

angular.module('sif')
.controller("mainCtrl", function($scope, twitterUser) {
  $scope.tags = [];
  $scope.tweet = "";
  $scope.ignoredUsers = [];

  $scope.btnStyle = function(ratio) {
    var greenScale = Math.floor(125 * ratio);
    return { 'background-color': 'rgb(0,' + greenScale + ',0)' };
  };

  // $scope.follow = function(screenName) {
  //   twitterUser.follow(screenName)
  //   .success(function(data) {
  //     console.log(data);
  //     $scope.data.users[screenName].following = true;
  //   }).catch(function(error) {
  //     console.log(error);
  //   });
  //   return false;
  // };

  $scope.search = function() {
    twitterUser.search($scope.words)
    .success(function(data) {
      console.log(data);
      $scope.data = data;
    }).catch(function(error) {
      console.log(error);
    });
    return false;
  };

  // $scope.sendTweet = function() {
  //   twitterUser.sendTweet($scope.tweet)
  //   .success(function(resp) {
  //     $scope.tweet = "";
  //   }).catch(function(error) {
  //     console.log(error);
  //   });
  // };
  //
  // $scope.includeInTweet = function(tag) {
  //   $scope.tweet = $scope.tweet + " " + tag;
  // };
  //
  // $scope.ignore = function(screenName) {
  //   twitterUser.ignore(screenName).success(function(data) {
  //     $scope.ignoredUsers.push(data.screen_name);
  //   }).catch(function(error) {
  //     console.log(error);
  //   });
  // };
  // twitterUser.IgnoreList().success(function(ignoredUsers) {
  //   console.log(ignoredUsers);
  //   $scope.ignoredUsers = ignoredUsers;
  // }).catch(function(error) {
  //   console.log(error);
  // });
  //
  // $scope.unShame = function($index) {
  //   console.log('hello');
  //   $scope.ignoredUsers.splice($index, 1);
  // };

});

'use strict';

angular.module('sif')
.controller('NavCtrl', function($scope, FBService){
  $scope.login = FBService.twitterLogin;
  $scope.logout = FBService.twitterLogout;

  $scope.currentUser = FBService.currentUser;
});

'use strict';

angular.module('sif')
.filter('friendsFilter', function() {
//   return function(users, showFriends) {
//     if (showFriends) {
//       return users;
//     }
//     var filteredUsers = {};
//     angular.forEach(users, function(userData, screenName) {
//       if (!userData.following) {
//         filteredUsers[screenName] = userData;
//       }
//     });
//     return filteredUsers;
//   };
// })
// .filter('ignoreFilter', function() { //similar to above
//   return function(users, ignoredUsers) {
//     var filterIgnoredUsers = {};
//     angular.forEach(users, function(userData, screenName) {
//       if (ignoredUsers.indexOf(screenName) <= -1) { //if a screenName not within ignoredUsers, it's good.
//         filterIgnoredUsers[screenName] = userData;
//       }
//     });
//     return filterIgnoredUsers;
//   };
});

'use strict';

angular.module('sif')
.service('FBService', function(urls){
  // var fb = this;
  //
  // this.db = new Firebase(urls.firebaseUrl);
  //
  // this.db.onAuth(function(authData) {
  //   if (authData) {
  //     fb.currentUser = authData.twitter;
  //     console.log("Logged in: ", authData);
  //   }
  // });
  //
  // this.twitterLogout = function() {
  //   fb.db.unauth();
  // };
  //
  // this.twitterLogin = function() {
  //   fb.db.authWithOAuthRedirect("twitter", function(error) {
  //     if (error) {
  //       console.log("Login Failed!", error);
  //     }
  //   });
  // };
});

'use strict';

angular.module('sif')
.service('twitterUser', function(urls, $http, FBService) {

  // var withTokens = function(obj) {
    // obj.access_token_key = FBService.currentUser.accessToken;
    // obj.access_token_secret = FBService.currentUser.accessTokenSecret;
  //   return obj;
  // };
  var withTokens = function(obj) {
    return obj;
  };

  this.search = function(words) {
    var data = withTokens({ words: words });
    return $http.post(urls.apiUrl + "/search", data);
  };

  // this.sendTweet = function(tweet) {
  //   var data = withTokens({ tweet: tweet });
  //   return $http.post(urls.apiUrl + "/tweet", data);
  // };

  // this.follow = function(screenName) {
  //   var data = withTokens({ screen_name: screenName });
  //   return $http.post(urls.apiUrl + "/follow", data);
  // };
  //
  // this.ignore = function(screenName) {
  //   var data = withTokens({ screen_name: screenName });
  //   return $http.post(urls.apiUrl + "/ignore", data);
  // };
  //
  // this.IgnoreList = function() {
  //   return $http.get(urls.apiUrl + "/ignore");
  // };

});
