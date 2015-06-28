app.controller('HomeCtrl', ['$scope', 'parseService', '$rootScope', '$state', 'snackbar', function ($scope, parseService, $rootScope, $state, snackbar) {
    console.log('home controller being initialised');
    $scope.user = {};
    $scope.error = false;
    $scope.errorMsg = "";
    $scope.loading = false;

    $scope.signUp = function () {
        var user = new Parse.User();
        user.set("username", $scope.user.username);
        user.set("password", $scope.user.password);

        user.signUp(null, {
            success: function (user) {
                // Hooray! Let them use the app now.
                snackbar.create("User Created! Log in now!");
                //console.log(user);
                parseService.login($scope.user.username, $scope.user.password)
                    .then(function (auth) {
                        $scope.loading = false;
                        //console.log(auth);
                        $rootScope.loggedInUser = Parse.User.current();
                        $state.go('app.completeProfile', {
                            id: $rootScope.loggedInUser.id
                        });

                        //$state.go('app.profile/');
                        snackbar.create("User logged in!");
                    }, function (error) {
                        console.log(error);
                        $scope.loading = false;
                        $scope.error = true;
                        $scope.user.password = "";
                        $scope.errorMsg = "Invalid Credentials. Please try again.";
                    });
            },
            error: function (user, error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + " " + error.message);
            }
        });
    };

    $scope.FBLogin = function () {
        Parse.FacebookUtils.logIn("email, public_profile, user_friends", {
            success: function (user) {
                //console.log(user);
                if (!user.existed()) {
                    $rootScope.loggedInUser = Parse.User.current();
                    //console.log($rootScope.loggedInUser);
                    FB.api('/me', function (me) {
                        user.set("facebook_id", me.id);
                        user.set("firstName", me.first_name);
                        user.set("lastName", me.last_name);
                        user.setEmail(me.email);
                        //console.log(me.first_name, me.last_name, me.email);
                        user.save().then(function () {
                            //console.log(userObj);
                            $state.go('app.completeProfile');
                            snackbar.create("User signed up and logged in through Facebook!");
                        });
                        //user.set("password", $scope.user.password);
                        //console.log("/me response", me);
                    });

                } else {
                    $rootScope.loggedInUser = Parse.User.current();
                    $state.go('app.profile');
                    snackbar.create("User logged in through Facebook!");
                    //console.log(Parse.User.current());
                }
            },
            error: function (user, error) {
                alert("User cancelled the Facebook login or did not fully authorize.");
            }
        });
    };

    $scope.authenticateUser = function () {
        $scope.error = false;
        if ($scope.user.username && $scope.user.username.length > 0 && $scope.user.password && $scope.user.password.length > 0) {
            $scope.loading = true;
            parseService.login($scope.user.username, $scope.user.password)
                .then(function (auth) {
                    $scope.loading = false;
                    //console.log(auth);
                    $rootScope.loggedInUser = Parse.User.current();
                    $state.go('app.profile', {
                        id: $rootScope.loggedInUser.id
                    });

                    //$state.go('app.profile/');
                    snackbar.create("User logged in!");
                }, function (error) {
                    console.log(error);
                    $scope.loading = false;
                    $scope.error = true;
                    $scope.user.password = "";
                    $scope.errorMsg = "Invalid Credentials. Please try again.";
                });
        } else {
            $scope.error = true;
            $scope.errorMsg = "Please enter valid email and password to log in.";
        }
    };

    //LOGOUT FUNCTION ON ROOTSCOPE
    $rootScope.logOut = function () {
        Parse.User.logOut();
        $rootScope.loggedInUser = Parse.User.current();
        $state.go('home');
        snackbar.create("User logged out!");
    };

}]);