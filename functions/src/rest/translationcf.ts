import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const {Translate} = require('@google-cloud/translate').v2;

const LANGUAGES = ['si', 'ta', 'en'];

export const restTranslationcf = functions.firestore.document('/glossary/{lang}/translations/{doc_id}').onCreate(
  (snap, context) => {
    const snapshot = snap.data();
    if (snapshot.translated === 'Yes') {
      return null;
    }

    const promises = [];
    for (const language of LANGUAGES) {
      if (snapshot.lang !== language) {
        promises.push(
          new Translate({key: process.env.API_KEY}).translate(snapshot.phrase, {
            from: snapshot.lang,
            to: language,
            model: snapshot.model
          }).then(results => {
            console.log("translated text: " + results[0]);
            admin.firestore().collection('/glossary').doc(language).collection('translations').add({
              'uid': snapshot.uid,
              'phrase': results[0],
              'lang': language,
              'model': snapshot.model,
              'translated': 'Yes'
            }).catch(e => console.error("Failed to create new translated document"));
          })
        );
      }
    }
    return Promise.all(promises);
  }
);


