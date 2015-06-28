// Sub-application/main Level State
app.config(['$stateProvider', function ($stateProvider) {

    $stateProvider
        .state('app.completeProfile', {
            url: '/completeProfile',
            templateUrl: 'js/main/templates/completeProfile.tpl.html',
            controller: 'ProfileCtrl'
        })
        .state('app.profile', {
            url: '/profile/:id',
            templateUrl: 'js/main/templates/profile/profile.tpl.html',
            controller: 'ProfileCtrl'
        })
        .state('app.profile.statistics', {
            url: '/statistics',
            templateUrl: 'js/main/templates/profile/profileStatistics.tpl.html',
            controller: 'ProfileCtrl',
        })
        .state('app.profile.videos', {
            url: '/videos',
            templateUrl: 'js/main/templates/profile/profileVideos.tpl.html',
            controller: 'ProfileCtrl',
        })
        .state('app.profile.social', {
            url: '/social',
            templateUrl: 'js/main/templates/profile/profileSocial.tpl.html',
            controller: 'ProfileCtrl',
        })
        .state('app.profile.edit', {
            url: '/edit',
            templateUrl: 'js/main/templates/profile/profileEdit.tpl.html',
            controller: 'ProfileCtrl',
        })
        .state('app.profile.likes', {
            url: '/likes',
            templateUrl: 'js/main/templates/profile/profileLikes.tpl.html',
            controller: 'ProfileCtrl',
        })

    .state('app.profiles', {
            url: '/profiles',
            templateUrl: 'js/main/templates/profiles/profiles.tpl.html',
            controller: 'ProfilesCtrl',
        })
        .state('app.profiles.coaches', {
            url: '/coaches',
            templateUrl: 'js/main/templates/profiles/coaches.tpl.html',
            controller: 'CoachesCtrl',
        })
        .state('app.profiles.players', {
            url: '/players',
            templateUrl: 'js/main/templates/profiles/players.tpl.html',
            controller: 'PlayersCtrl',
        })
        .state('app.tournaments', {
            url: '/tournaments',
            templateUrl: 'js/main/templates/tournaments.tpl.html',
            controller: 'TournamentsCtrl',
        })
        .state('app.update', {
            url: '/update',
            templateUrl: 'js/main/templates/update.tpl.html',
            controller: 'UpdateCtrl'
        })
}]);