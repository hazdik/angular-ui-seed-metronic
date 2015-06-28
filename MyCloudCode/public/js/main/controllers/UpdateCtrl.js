app.controller('UpdateCtrl', ['$scope', 'parseService', function ($scope, parseService) {
    // Create 1 Dummy Update 
    parseService.createUpdate({
        text: "This is a random update with number - " + (Math.ceil(Math.random() * 100))
    }).then(function (newUpdate) {
        //console.log(newUpdate);
    }, function (newUpdate, error) {
        console.error(error);
    });;

    $scope.updates = [];
    // Getting All Updates to Populate
    $scope.loading = true;
    parseService.getAllUpdates()
        .then(function (results) {
                $scope.loading = false;
                $scope.updates = results.map(function (obj) {
                    return obj._serverData;
                });
            },
            function (error) {
                $scope.loading = false;
                console.error(error);
            });

}]);