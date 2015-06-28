// Application Level State
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('', '/home');


    $stateProvider
        .state('app', {
            url: '',
            controller: 'AppCtrl',
            views: {
                'navbar': {
                    templateUrl: 'js/core/templates/navbar.tpl.html',
                    controller: 'NavbarCtrl'
                },
                'main': {
                    templateUrl: 'js/core/templates/main.tpl.html'
                }
            },
            data: {
                requireLogin: true
            }
        })
        .state('home', {
            url: '/home',
            views: {
                'navbar': {
                    templateUrl: 'js/core/templates/navbar.tpl.html',
                    controller: 'NavbarCtrl'
                },
                'main': {
                    templateUrl: 'js/main/templates/home.tpl.html',
                    controller: 'HomeCtrl'
                }
            }
        })
        .state('404', {
            url: '/404',
            templateUrl: 'js/core/templates/404.tpl.html',
            controller: 'AppCtrl'
        });

}]);