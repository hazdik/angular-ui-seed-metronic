app.factory('parseService', ['$rootScope', function ($rootScope) {

    return {
        login: function (username, password) {
            return Parse.User.logIn(username, password);
        },
        createUpdate: function (updateObj) {
            var Update = Parse.Object.extend("Updates");
            var update = new Update();
            updateObj["author"] = $rootScope.loggedInUser;
            return update.save(updateObj);
        },
        getAllUpdates: function () {
            var Update = Parse.Object.extend("Updates");
            var query = new Parse.Query(Update);
            query.limit(10);
            return query.find();
        },
        createTournament: function (tournamentObj) {
            var Tournament = Parse.Object.extend("Tournaments");
            var tournament = new Tournament();
            tournamentObj["author"] = $rootScope.loggedInUser;
            return tournament.save(tournamentObj);
        },
        getAllTournaments: function () {
            var Tournaments = Parse.Object.extend("Tournaments");
            var query = new Parse.Query(Tournaments);
            return query.find();
        },
        getProfileInfo: function (userId) {
            var User = Parse.Object.extend("User");
            var query = new Parse.Query(User);
            return query.get(userId);
        },
        updateProfileInfo: function (userId, newProfileInfo) {
            var User = Parse.Object.extend("User");
            var user = new User();
            user.id = userId;
            return user.save(newProfileInfo);
        },
        getAllCoaches: function () {
            var coaches = Parse.Object.extend("User");
            var query = new Parse.Query("User");
            query.equalTo("role", "coach");
            return query.find();
        },
        getAllPlayers: function () {
            var coaches = Parse.Object.extend("User");
            var query = new Parse.Query("User");
            query.equalTo("role", "player");
            return query.find();
        },
        getProfileID: function (username) {
            var profileID = Parse.Object.extend("User");
            var query = new Parse.Query("User");
            query.equalTo("username", username);
            return query.find();
        },
        likeAUser: function (userId) {
            var currentUser = $rootScope.loggedInUser;
            var User = Parse.Object.extend("User");
            var user = new User();
            user.id = userId;

            var likes = currentUser.relation("Likes");
            //console.log(likes);
            likes.add(user);
            return currentUser.save();
        },
        unlikeAUser: function (userId) {
            var currentUser = $rootScope.loggedInUser;
            var User = Parse.Object.extend("User");
            var user = new User();
            user.id = userId;

            var likes = currentUser.relation("Likes");
            console.log(likes);
            likes.remove(user);
            return currentUser.save();
        }
    };
}]);