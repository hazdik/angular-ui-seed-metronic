app.controller('ProfileCtrl', ['$scope', 'parseService', '$modal', 'snackbar', '$stateParams', '$state', '$rootScope', function ($scope, parseService, $modal, snackbar, $stateParams, $state, $rootScope) {


    //console.log($rootScope.loggedInUser.id);

    /* Provide user ID to URL */
    if ($stateParams.id)
        var userId = $stateParams.id;
    else
        var userId = $scope.loggedInUser.id;

    /* if loggedInUser is the same as profile userID then allow edit */
    if ($stateParams.id == $scope.loggedInUser.id)
        $scope.canEdit = true;


    $scope.loading = true;
    $scope.profileInfo = {};

    //YOUTUBE PLAYER SETTINGS
    $scope.playerVars = {
        controls: 0,
        autoplay: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,

    };



    /* NEW FOLLOW SYSTEM USER JOIN TABLE "FOLLOW" */



    $scope.newFollow = function (firstName, lastName) {
        parseService.createFollow({
            follower: $rootScope.loggedInUser,
            followee: $scope.currentProfileUserObj,
        }).then(function (newFollow) {
            $scope.getAllFollows();
            console.log(newFollow);
            $scope.doesCurrentUserFollow();
            snackbar.create("You now like " + firstName + " " + lastName);

        }, function (newFollow, error) {
            console.error(error);
        });;
    };


    $scope.getAllFollows = function () {
        parseService.getAllFollows($scope.currentProfileUserObj).then(function (results) {
            console.log(results);
            $scope.likedUsers = results.map(function (obj) {
                return obj._serverData;
            });
            console.log($scope.likedUsers);
        }, function (error) {
            console.error(error);
        });;
    };

    $scope.getAllFollows();

    $scope.doesCurrentUserFollow = function () {
        parseService.doesCurrentUserFollow($scope.currentProfileUserObj).then(function (results) {
                if (results.length == 0) {
                    $scope.currentUserFollows = false;
                    //console.log($scope.currentUserFollows);
                    //console.log("does not follow");
                } else {
                    $scope.currentUserFollows = true;
                    //console.log($scope.currentUserFollows);
                    //console.log("does follow");
                }
                //console.log(results);
            },
            function (error) {
                console.error(error);
            });
    };

    $scope.doesCurrentUserFollow();

    /* END NEW FOLLOW SYSTEM USER JOIN TABLE "FOLLOW" */





    /* OLD LIKE USER SYSTEM WITH PARSE USER RELATION */

    // Liking another User
    $scope.likeUser = function (firstName, lastName) {
        parseService.likeAUser($stateParams.id)
            .then(function (userObj) {
                    //console.log(userObj);
                    //getLikedUsers(userId);
                    snackbar.create("You now like " + firstName + " " + lastName);
                },
                function (userObj, error) {
                    console.log(error);
                });
    };

    //Un-liking another User
    $scope.unlikeUser = function (firstName, lastName) {
        parseService.unlikeAUser($stateParams.id)
            .then(function (userObj) {
                    //console.log(userObj);
                    //getLikedUsers(userId);
                    snackbar.create("You have now un-liked " + firstName + " " + lastName);
                },
                function (userObj, error) {
                    console.log(error);
                });
    };

    // GET LIKED USERS
    var getLikedUsers = function (userId) {
        var User = Parse.Object.extend("User");
        var query = new Parse.Query(User);
        query.get(userId, function (User) {
            var relation = User.relation("Likes");
            var query = relation.query();
            query.find({
                success: function (results) {
                    //console.log(results);
                    $scope.likedUsers = results.map(function (obj) {
                        return obj._serverData;
                    });
                    //console.log($scope.likedUsers);
                },
                error: function (error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        });
    };
    getLikedUsers(userId);


    //UNLIKE A USER

    $scope.unlikeAUser = function (userId) {
        var currentUser = $rootScope.loggedInUser;
        var User = Parse.Object.extend("User");
        var user = new User();
        user.id = userId;

        var likes = currentUser.relation("Likes");
        console.log(likes);
        likes.add(user);
        return currentUser.save();
    }

    /* END OLD LIKE USER USING USER RELATION */

    // Get Profile Info while Page Loads
    parseService.getProfileInfo(userId)
        .then(function (userObj) {
                //console.log(userObj);
                $scope.profileInfo = userObj._serverData;
                $scope.currentProfileUserObj = userObj;
                $scope.loading = false;

                //check if active subscription
                var timestamp = new Date() / 1000 | 0;
                console.log(timestamp);
                console.log($scope.profileInfo.active_until);

                if (timestamp < $scope.profileInfo.active_until) {
                    $rootScope.userPaid = true;
                    console.log("paid");
                } else {
                    $rootScope.userPaid = false;
                    console.log("NOT paid");
                }

            },
            function (userObj, error) {
                console.log(error);
                $scope.loading = false;
            });

    $scope.goToProfile = function (username) {
        parseService.getProfileID(username)
            .then(function (user) {
                var userID = user[0].id;
                $state.go('app.profile', {
                    id: userID
                });
            });
    };


    $scope.updateProfilePic = function () {
        console.log($scope.profileInfo.profile_pic);
        var file_pic = new Parse.File($scope.profileInfo.profile_pic.name, $scope.profileInfo.profile_pic);
        $scope.profileInfo.profile_pic = file_pic;
        $scope.saveProfile(function () {

        });
    };

    $scope.saveProfile = function (callback) {
        $scope.loading = true;
        //console.log($scope.profilePicFile);
        parseService.updateProfileInfo(userId, $scope.profileInfo)
            .then(function (userObj) {
                    //console.log(userObj);
                    $scope.loading = false;
                    snackbar.create("Profile update is complete!");
                    if (callback)
                        callback();
                },
                function (userObj, error) {
                    console.log(error);
                    $scope.loading = false;
                });
    }


    //STRIPE

    $scope.handleStripe = function (status, response) {
        if (response.error) {
            console.log(response.error);
            // there was an error. Fix it.
        } else {
            // got stripe token, now charge it or smt
            var tokenUnique = response.id
            console.log(tokenUnique);
            Parse.Cloud.run('pay', {
                token: tokenUnique,
                plan: "coach",
                quantity: "1"
            }, {
                success: function (result) {
                    //console.log(result);
                    //console.log(result.id);
                    $scope.profileInfo.customerID = result.id;
                    $scope.profileInfo.active_until = result.subscriptions.data[0].current_period_end;
                    $scope.saveProfile();
                    //console.log($scope.profileInfo);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
    };


    /* UPLOADING TRACKMAN DATA */

    $scope.$watch('csv.content', function (newVal, oldVal) {
        //console.log(newVal);
        // Parse CSV string
        if (newVal) {
            var data = Papa.parse(newVal);
            $scope.csvParsedData = data;
            console.log($scope.csvParsedData);
        }
    });


    $scope.uploadCsvData = function () {
        if ($scope.csvParsedData) {
            var data = $scope.csvParsedData.data;

            var trackManObjectList = [];
            var TrackMan = Parse.Object.extend('TrackMan');
            for (var i = 2; i < data.length; i++) {
                var trackMan = new TrackMan();
                var row = data[i];
                var columnNames = data[0];
                for (var j = 0; j < row.length; j++) {
                    var columnName = columnNames[j];
                    columnName = cleanName(columnName);
                    trackMan.set(columnName, row[j]);
                }
                trackMan.set('userId', $scope.loggedInUser);
                trackManObjectList.push(trackMan);
            }
            //console.log(trackManObjectList);
            Parse.Object.saveAll(trackManObjectList, {
                success: function (objs) {
                    // objects have been saved...
                    console.log(objs);
                },
                error: function (error) {
                    // an error occurred...
                    console.log('error');
                }
            });
        }
    }

    function cleanName(str) {
        str = str.replace(/[^a-zA-Z ]/g, "");
        str = str.replace(/\s/g, "");
        return str.toLowerCase();
    }
            }]);