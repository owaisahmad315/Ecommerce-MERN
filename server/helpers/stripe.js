// const paypal = require("paypal-rest-sdk");

// paypal.configure({
//   mode: "",
//   client_id: "",
//   client_secret: "",
// });

// module.exports = paypal;



const Stripe = require('stripe');
const stripe = Stripe('sk_test_51QBym8FSJ9zOghjYIZKBEGL3saQhfXDb8ntukM7xMJjHGYYqzg3eYt1q8GMUTSeU7Pd1SBp6Q4wjEk1WSVjctW9e00A4aofag1');  // Replace with your Stripe secret key

module.exports = stripe;
