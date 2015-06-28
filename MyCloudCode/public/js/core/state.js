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
        .state('landing', {
            url: '/landing',
            views: {
                'navbar': {
                    templateUrl: 'js/core/templates/navbarLanding.tpl.html',
                    controller: 'NavbarCtrl'
                },
                'main': {
                    templateUrl: 'js/main/templates/landing.tpl.html',
                    controller: 'LandingCtrl'
                }
            }
        })
        .state('api', {
            url: '/api',
            views: {
                'main': {
                    templateUrl: 'js/core/templates/api.tpl.html',
                    controller: 'ApiCtrl'
                }
            }
        })
        .state('404', {
            url: '/404',
            templateUrl: 'js/core/templates/404.tpl.html',
            controller: 'AppCtrl'
        });

}]);