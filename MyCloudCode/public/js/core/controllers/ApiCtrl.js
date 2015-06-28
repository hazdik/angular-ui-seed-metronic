app.controller('ApiCtrl', function ($scope) {

    console.log("API CONTROLLER");

    Parse.Cloud.run('updateSubscription', {}, {
        success: function (result) {
            console.log(result);
        },
        error: function (error) {
            console.log(error);
        }
    });


});