import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {getCustomClaims} from '../../utils/objectUtils';

export const dbRoleOnUpdate = functions.firestore.document('roles/{roleId}').onUpdate((change, context) => {
  return new Promise((resolve, reject) => {
    const {roleId} = context.params;
    const roleSnapshotAfter = change.after.data();
    const db = admin.firestore();
    //update the relevent user claims when role is updated
    admin.firestore().collection("users")
      .where("userRole.id", "==", change.after.id).get()
      .then(snap => {
        snap.forEach((doc) => {
          const user = doc.data();
          console.log("dbRoleOnUpdate [Process] Started updating %s document", doc.id);
          user.userRole = roleSnapshotAfter;
          //updating user role
          db.collection('users').doc(user.email).update({userRole: roleSnapshotAfter}).then(() => {
            console.log("user role updated successfully for user:", user.email);
            admin.auth().setCustomUserClaims(user.uid, getCustomClaims(user))
              .then(() => {
                resolve(true)
              }).catch(error => {
              console.error('Error setting auth claims:', error);
              reject('Error setting auth claims:' + error);
            });
          }).catch(error => {
            console.log("dbRoleOnUpdate [Error] User role update failed for user: %s.  Error => %s", user.email, error);
            reject()
          })
        })
      }).catch(error => {
      console.log('dbRoleOnUpdate [Error] Requested user %s not found. Error => ', roleId, error);
      reject()
    })
  })
});
