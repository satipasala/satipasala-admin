import * as functions from 'firebase-functions';

/** HTTP Trigger */
exports = module.exports = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});
