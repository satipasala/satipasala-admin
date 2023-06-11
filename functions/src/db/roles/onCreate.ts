'use strict';
import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

export const dbRoleOnCreate = functions.firestore.document('roles/{roleId}').onCreate(event => {
  //all the permissions will be added to role when role is created.
  return new Promise((resolve, reject) => {
    const db = admin.firestore();
    event.ref.set({
      courses: {}
    }, {merge: true}).then((ref) => {
      resolve(ref);
    }).catch(error => {
      console.log('error1', error);
      reject(error)
    })
  });
});
