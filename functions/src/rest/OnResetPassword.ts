import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const cors = require('cors')({ origin: true });

export const resetAuthUserPassword = functions.https.onRequest((req, res) => {
    const db = admin.firestore();
    const defaultPassword = 'Sati@123';
    cors(req, res, () => {
        if (req.method === 'POST') {
            if (req.body.email) {
                // Getting user by email
                admin.auth().getUserByEmail(req.body.email)
                    .then(userRecord => {
                        // Updating user password with hardcorded default password
                        admin.auth().updateUser(userRecord.uid, { password: defaultPassword })
                            .then(() => {
                                // Updating firestore document
                                db.collection('auth').doc(userRecord.email).update({ password: defaultPassword }).then(() => {
                                    // Sending success response if password field in firestore updated successfuly
                                    console.log('Password was reset for ' + userRecord.email)
                                    res.send({ message: 'Password reset', status: 'Success' })
                                }).catch(err => {
                                    // Sending error response if unable to update user password if firestore
                                    console.log('Password reset on firestore for ' + userRecord.email + ' failed. ' + err)
                                    res.send({ message: 'Password reset', status: 'Failed' })
                                })
                            }).catch(err => {
                                // Sending error response if unable to update user password
                                console.log('Password reset for ' + userRecord.email + ' failed. ' + err)
                                res.send({ message: 'Password reset', status: 'Failed' })
                            })
                    })
                    .catch(() => {
                        // Sending error response if email is not avaliable
                        res.send({ message: 'Password reset', status: 'Failed' })
                    })
            } else {
                // Sending required fields missing response if email filed is not avaliable
                res.send({ message: 'Password reset', status: 'Failed' })
            }
        } else {
            // Sending unauthorized request response if not a POST request
            res.send({ message: 'Password reset', status: 'Failed' });
        }
    })
})
