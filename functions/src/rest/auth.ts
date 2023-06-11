import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

const app = express();
const main = express();

main.use('/api', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended: false}));

// Automatically allow cross-origin requests
main.use(cors({origin: true}));

/** HTTP Trigger */
export const restAuth = functions.https.onRequest(main);


// export const processRoleChange = functions.firestore.document('users/{userId}').onWrite((snap, context) => {
//   const userData = snap.after.data();
//   // Exit when the data is deleted.
//   if (!snap.after.exists) {
//     return null;
//   }
//   console.log('userData');
//   console.log(userData);
//   // TODO: Run a query to extract user permissions from the role and update here.
//   return snap.after.ref.set({userPriviledges: "superadmin;editevents"}, {merge: true});
// });

app.get('/auth/getCustomClaims', (req, res) => {
  res.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Allow-Headers', 'Authorization');
  res.set('Access-Control-Max-Age', '3600');
  res.status(200).send('GET setCustomClaims');
});

app.post('/auth/setCustomClaims', (req, res) => {

  // Get the ID token passed.
  const idToken = req.body.data.idToken;
  console.log('received token : ' + idToken);
  // Verify the ID token and decode its payload.
  admin.auth().verifyIdToken(idToken)
    .then((claims) => {
      // Verify user is eligible for additional privileges.
      // Add custom claims for additional privileges.
      const customClaims = {
        userPriviledges: 'superadmin;editevents'
      };
      admin.auth().setCustomUserClaims(claims.sub, customClaims)
        .then(() => {
          // Tell client to refresh token on user.
          res.end(JSON.stringify({
            data: {
              status: 'success'
            }
          }));
        })
        .catch(error => {
          console.log(error);
        })

    })
    .catch(error => {
      console.log(error);
    });

});

/*
export const setCustomClaims = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', "*");
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Allow-Headers', 'Authorization');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    // Get the ID token passed.
    const idToken = req.body.idToken;
    console.log('received toke : ' + idToken);
    // Verify the ID token and decode its payload.
    admin.auth().verifyIdToken(idToken)
      .then((claims) => {
        // Verify user is eligible for additional privileges.
        // Add custom claims for additional privileges.
        const customClaims = {
          userPriviledges: 'superadmin;editevents'
        };
        admin.auth().setCustomUserClaims(claims.sub, customClaims)
          .then(() => {
            // Tell client to refresh token on user.
            res.end(JSON.stringify({
              status: 'success'
            }));
          })
          .catch(error => {
            console.log(error);
          })

      })
      .catch(error => {
        console.log(error);
      });
  }
});
*/
