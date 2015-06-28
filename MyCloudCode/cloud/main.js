// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:

require('cloud/app.js');

Parse.Cloud.define("hello", function (request, response) {
    response.success("Hello world!");
});


var Stripe = require('stripe');
Stripe.initialize('sk_test_gIpQN1t8DDhmcyU9eLOc1uov');


/// Create the customer, and finalize the payment.
function stripe_pay(request, response) {

    Stripe.Customers.create({
        card: request.params.token,
        plan: request.params.plan,
        quantity: request.params.quantity
            // coupon: request.params.coupon, 
            // email: request.params.email

    }).then(function (httpResponse) {
        response.success(httpResponse);
    });
}

Parse.Cloud.define("pay", function (request, response) {
    Stripe.initialize('sk_test_gIpQN1t8DDhmcyU9eLOc1uov');
    stripe_pay(request, response);
});

/* WEBHOOOK START */

// Using Express

function stripe_updateSubscription(request, response) {

    response.success(response);

    /*
    app.post("/api", function (request, response) {
        // Retrieve the request's body and parse it as JSON
        var event_json = JSON.parse(request.body);

        // Do something with event_json

        response.send(200);
    });
    */
}

Parse.Cloud.define("updateSubscription", function (request, response) {
    Stripe.initialize('sk_test_gIpQN1t8DDhmcyU9eLOc1uov');
    stripe_updateSubscription(request, response);
});

/* WEBHOOOK END */