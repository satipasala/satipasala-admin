import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const cors = require('cors')({ origin: true });

export const authUserOnVerifyToken = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        if (req.method === 'POST') {
            if (req.body.token) {
                admin.auth().verifyIdToken(req.body.token).then(claims =>
                    res.send({ authUser: claims.email, verified: true })
                ).catch(err => {
                    console.log('Request to very token failed. Error : ' + err)
                    res.send({ verified: false })
                })
            } else {
                console.log('Request to very token failed. Error : Request does not contain a token')
                res.send({ verified: false })
            }
        } else {
            console.log('Request to very token failed. Error : Request is not of POST type')
            res.send({ verified: false })
        }
    })
})