'use strict';
import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

export const dbReferenceDataPermissionOnCreate = functions.firestore.document('referencedata/permissions').onWrite(snap => {
  //all the permissions will be added to role when permission is created.

  return new Promise((resolve, reject) => {
    const permissions = snap.after.data();
    const db = admin.firestore();
    const rolesBatch = db.batch();
    if(permissions){
      db.collection("roles").get().then(snapshot => {
        snapshot.forEach((doc) => {
          const role = doc.data();
          if(role.allowedPermissions){
            role.allowedPermissions = Object.assign(permissions,role.allowedPermissions);
          }else{
            role.allowedPermissions = permissions;
          }

          rolesBatch.set(doc.ref, role, {merge: true});
          console.log('%s Permissions are successfully added for batch update role %s',permissions, role.id);
        });


        rolesBatch.commit().then((result) => {
          console.log("Permissions are successfully added to roles", result);
          resolve("success");
        }).catch((error) => {
          console.error("Permission add failed for roles", error);
          reject(error)
        });
      }).catch(error => {
        reject(error)
      });
    }else{
      reject("permissions undefined")
    }

  })
});
