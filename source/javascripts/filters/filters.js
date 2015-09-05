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
