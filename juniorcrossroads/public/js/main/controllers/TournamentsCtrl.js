app.controller('TournamentsCtrl', ['$scope', 'parseService', function ($scope, parseService) {

    $scope.tournaments = [];
    $scope.loading = true;

    $scope.newTournament = function () {
        parseService.createTournament({
            name: $scope.tournament.name,
            location: $scope.tournament.location,
        }).then(function (newTournament) {
            $scope.loading = true;
            $scope.getAllTournaments();
            //console.log(newUpdate);
        }, function (newTournament, error) {
            console.error(error);
        });;
    };

    $scope.getAllTournaments = function () {
        parseService.getAllTournaments()
            .then(function (results) {
                    $scope.loading = false;
                    //console.log(results);
                    $scope.tournaments = results;
                },
                function (error) {
                    $scope.loading = false;
                    console.error(error);
                });
    };

    $scope.getAllTournaments();

}]);