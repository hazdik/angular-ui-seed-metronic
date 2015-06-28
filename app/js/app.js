var app = angular.module('app', [
    'ui.router',
    'parse-angular',
    'ui.bootstrap',
    'youtube-embed',
    'angular.snackbar',
    'ngCsvImport',
    'smart-table',
    'twitter.timeline',
    'angularPayments'
]);

app.run(['$rootScope', 'parseService', '$state', function ($rootScope, parseService, $state) {
    // Chris Parse Account
    Parse.initialize("okQ4Js068Fd2x4pNgcvuVrq8xlkVEHnZUFlfbhFo", "rScQeuX09DX2Jr3CealVNBmRWBsO2xRJb5ndopNz");

    var parseCurrentUser = Parse.User.current();
    if (parseCurrentUser)
        $rootScope.loggedInUser = parseCurrentUser;
    else
        $rootScope.loggedInUser = null;

    //FACEBOOK SDK

    window.fbAsyncInit = function () {
        Parse.FacebookUtils.init({ // this line replaces FB.init({
            appId: '2000743630066309', // Facebook App ID
            cookie: true, // enable cookies to allow Parse to access the session
            xfbml: true, // initialize Facebook social plugins on the page
            version: 'v1.0' // point to the latest Facebook Graph API version
        });
        console.log("FB SDK loaded");
        // Run code after the Facebook SDK is loaded.
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/all.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


    $rootScope.$on("$stateChangeStart", function (event, toState, toParams) {

        var requireLogin = toState.data ? toState.data.requireLogin : false;

        if (requireLogin && $rootScope.loggedInUser == null) {
            // Redirect to Login Controller
            event.preventDefault();
        } else {
            //console.log(requireLogin);
            //console.log('authentic user or does not require login');
        }

    });
}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
app.controller('HeaderController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initHeader(); // init header
    });
}]);

/* Setup Layout Part - Sidebar */
app.controller('SidebarController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initSidebar(); // init sidebar
    });
}]);

/* Setup Layout Part - Theme Panel */
app.controller('ThemePanelController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Footer */
app.controller('FooterController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initFooter(); // init footer
    });
}]);
