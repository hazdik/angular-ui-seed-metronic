// These two lines are required to initialize Express in Cloud Code.
express = require('express');
app = express();

// Global app configuration section
app.set('views', 'cloud/views'); // Specify the folder to find templates
app.set('view engine', 'ejs'); // Set the template engine
app.use(express.bodyParser()); // Middleware for reading request body

// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.get('/api/v1', function (req, res) {
    res.render('api/v1', {});
});

// // Example reading from the request query string of an HTTP get request.
// app.get('/test', function(req, res) {
//   // GET http://example.parseapp.com/test?message=hello
//   res.send(req.query.message);
// });

// Customer subscription lifecycle events
//customer.created
//customer.subscription.created
//invoice.created
//charge.succeeded (immediate attempt for the first invoice)
//invoice.payment_succeeded
//invoice.created (after the subscription period is up)
//charge.succeeded (approximately one hour later)
//invoice.payment_succeeded
//Go back to Step 6.

// Usual way of doing this, would be endpoint for each webhook, with shared helper functions as needed
//app.post('/api/v1/subscriptions/delete', function (req, res) {
//app.post('/api/v1/subscriptions/update', function (req, res) {

// Example reading from the request body of an HTTP post request.
app.post('/api/v1/subscriptions/update', function (req, res) {
    // Register with ionic like so:
    // ionic push webhook_url https://juniorgolfcrossroads.parseapp.com/api/v1/subscriptions
    console.log("Received stripe subscription: " + JSON.stringify(req.body.data));
    var eventType = req.body.type;

    if (eventType !== 'customer.subscription.updated') {
        console.log("Tried to send an eventType of '" + eventType + "' to the /api/v1/subscriptions/update endpoint");
        res.send("Incorrect eventType '" + eventType + "' for the /api/v1/subscriptions/update endpoint");
    } else {
        var customerID = req.body.data.object.customer;
        var activeUntil = req.body.data.object.current_period_end;
        console.log("Received event " + eventType + " for customer " + customerID + ", active until " + activeUntil);


        var UserObject = Parse.Object.extend("User");
        var query = new Parse.Query(UserObject);
        console.log("Trying to find user: " + req.body.data.object.customer);
        query.equalTo("customerID", req.body.data.object.customer);
        query.find({
            success: function (results) {
                var customer = {};
                var customer = results[0];
                console.log("Retrieved results for user id " + JSON.stringify(results[0]));
                res.send("Received Success: first name " + results[0].get('firstName') + " object ID is " + results[0].get('objectId'));

                //
                //                var User = Parse.Object.extend("User");
                //                var user = new User();
                //                user.id = results[0].id;
                //                user.set("active_until", activeUntil);

                //                var user = new Parse.User();
                //                user.set("active_until", activeUntil);
                //
                //                user.save(null, {
                //                    success: function (user) {
                //                        // Hooray! Let them use the app now.
                //                    },
                //                    error: function (user, error) {
                //                        // Show the error message somewhere and let the user try again.
                //                        alert("Error: " + error.code + " " + error.message);
                //                    }
                //                });

                var User = Parse.Object.extend("User");
                var user = new User();
                user.id = results[0].id;

                user.set("active_until", activeUntil);

                user.save({
                    success: function (user) {
                        // Hooray! Let them use the app now.
                    },
                    error: function (user, error) {
                        // Show the error message somewhere and let the user try again.
                        console.log("Error: " + error.code + " " + error.message);
                    }
                });

                //                UserObject.set('active_until', activeUntil);
                //                UserObject.save({
                //                    success: function (updated) {
                //                        console.log("success");
                //                    },
                //                    error: function (updated, error) {
                //                        status.error("Object update failed");
                //                    }
                //                });


            },
            error: function (error) {
                console.log("Query failed: " + JSON.stringify(error));
                res.send("Received Error");
            }
        });

        //        res.send("Received");
    }

});

// Attach the Express app to Cloud Code.
app.listen();