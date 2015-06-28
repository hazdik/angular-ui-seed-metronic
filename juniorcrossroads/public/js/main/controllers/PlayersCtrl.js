app.controller('PlayersCtrl', ['$scope', '$rootScope', 'parseService', '$state', function ($scope, $rootScope, parseService, $state) {

    $scope.loading = true;

    $scope.goToProfile = function (username) {
        parseService.getProfileID(username)
            .then(function (user) {
                var userID = user[0].id;
                $state.go('app.profile', {
                    id: userID
                });
            });
    };

    parseService.getAllPlayers()
        .then(function (results) {
                $scope.loading = false;
                $scope.players = results.map(function (obj) {
                    return obj._serverData;
                });
                //console.log($scope.players);
            },
            function (error) {
                $scope.loading = false;
                console.error(error);
            });

}]);