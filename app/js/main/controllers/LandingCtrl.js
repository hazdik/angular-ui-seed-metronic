app.controller('LandingCtrl', ['$scope', 'parseService', function ($scope, parseService) {

    $scope.myInterval = 5000;

    var slides = $scope.slides = [
        {
            image: 'http://lorempixel.com/400/200/food',
            text: "This is the text"
        },
        {
            image: 'http://lorempixel.com/400/200/sports',
            text: "This is the text"
        },
    ];
    //    $scope.addSlide = function () {
    //        var newWidth = 600 + slides.length + 1;
    //        slides.push({
    //            image: 'http://placekitten.com/' + newWidth + '/300',
    //            text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' + ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
    //        });
    //    };
    //    for (var i = 0; i < 4; i++) {
    //        $scope.addSlide();
    //    }

}]);