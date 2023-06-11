import * as admin from "firebase-admin";

const db = admin.firestore();

/**
 * return the claims after updating it in admin auth user.
 * @param userData
 */
export function updateCustomClaims(userData): Promise<any> {

  return new Promise((resolve, reject) => {

    db.collection('roles').doc(userData.userRoleId).get().then(roleSnapshot => {
      if (roleSnapshot !== null && roleSnapshot.exists) {
        const role = roleSnapshot.data();
        updateClaimsByRole(role, userData).then(value => resolve(value)).catch(reason => reject(reason));
      }
    }).catch(e => {
      console.error("Error:", e)
    });
  });
}

export function updateClaimsByRole(role, userData): Promise<any> {
  return new Promise((resolve, reject) => {
    const customClaims = {
      userPermissions: role.id
    };
    admin.auth().setCustomUserClaims(userData.uid, customClaims)
      .then(() => {
        console.log('claims updated successfully for user:', userData.email);
        resolve(role)
      })
      .catch(error => {
        console.log("Error updating custom claims",error);
        reject(error);
      });
  });
}


export function isAuthorized(context,...permissions: string[]): boolean {
  let haveAccess: boolean = false;
    //todo fix below logic
  permissions.forEach(permission => {
    if (context.auth.token.userPermissions.indexOf(permission) >-1) {
      haveAccess = true;
    }
  });
  return haveAccess;
}
