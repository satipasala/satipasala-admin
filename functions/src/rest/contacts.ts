import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as firebaseHelper from 'firebase-functions-helper';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from "body-parser";

const db = admin.firestore();

const app = express();
const main = express();

main.use('/api', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended: false}));

// Automatically allow cross-origin requests
main.use(cors({origin: true}));

const contactsCollection = 'contacts';

/** HTTP Trigger */
export const restContacts = functions.https.onRequest(main);

// Add new contact
app.post('/contacts', (req, res) => {
  firebaseHelper.firestore
    .createNewDocument(db, contactsCollection, req.body);
  res.send('Create a new contact');
})

// Update new contact
app.patch('/contacts/:contactId', (req, res) => {
  firebaseHelper.firestore
    .updateDocument(db, contactsCollection, req.params.contactId, req.body);
  res.send('Update a new contact');
})

// View a contact
app.get('/contacts/:contactId', (req, res) => {
  firebaseHelper.firestore
    .getDocument(db, contactsCollection, req.params.contactId)
    .then((doc: any) => res.status(200).send(doc));
})

// View all contacts
app.get('/contacts', (req, res) => {
  firebaseHelper.firestore
    .backup(db, contactsCollection)
    .then((data: any) => res.status(200).send(data))
})

// Delete a contact
app.delete('/contacts/:contactId', (req, res) => {
  firebaseHelper.firestore
    .deleteDocument(db, contactsCollection, req.params.contactId);
  res.send('Contact is deleted');
})
