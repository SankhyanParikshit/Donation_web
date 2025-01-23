const Stripe = require('stripe');
const stripe = Stripe(process.env.stripe_secret_key);
module.exports = stripe;
