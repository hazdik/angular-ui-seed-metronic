var app = angular.module('app', [
    'ui.router',
    'parse-angular',
    'ui.bootstrap',
    'youtube-embed',
    'angular.snackbar',
    'ngCsvImport',
    'smart-table',
    'twitter.timeline',
]);

app.run(['$rootScope', 'parseService', '$state', function ($rootScope, parseService, $state) {
    // Chris Parse Account
    Parse.initialize("okQ4Js068Fd2x4pNgcvuVrq8xlkVEHnZUFlfbhFo", "rScQeuX09DX2Jr3CealVNBmRWBsO2xRJb5ndopNz");

    // Rahat Parse Account
    // Parse.initialize("yvHvEkne9jgX5ld3Gc2m3X9dC6ykkZq5aAYcyXKY", "XfQDuNAChEQPBRIRvHg7ABKHwJcfnLElDpamYNXd");

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