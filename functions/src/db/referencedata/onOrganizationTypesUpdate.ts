'use strict';
import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

export const dbOnOrganizationTypesUpdate = functions.firestore.document('referencedata/organizationTypes').onUpdate((change, context) => {
  return new Promise<void>((resolve, reject) => {
    const organizationTypesDataBefore = change.before.data();
    const organizationTypesDataAfter = change.after.data();
    if (organizationTypesDataAfter) {
      const db = admin.firestore();
      let isUpdated = false;
      const organizationsTypes = Object.keys(organizationTypesDataAfter);

      organizationsTypes.forEach(orgTypeName => {

        isUpdated = JSON.stringify(organizationTypesDataAfter[orgTypeName]) !== JSON.stringify(organizationTypesDataBefore[orgTypeName]);

        if (isUpdated) {
          db.collection("hosts").where("type.name", '==', orgTypeName).get().then(snap => {
            snap.forEach((doc) => {
              const organization = doc.data();
              const mergedOrgType = Object.assign(organization.type, organizationTypesDataAfter[orgTypeName]);
              doc.ref.update({type: mergedOrgType}).then(() => {
                console.log("dbOnOrganizationTypesUpdate organization %s on %s updated Successfully", organization.name, doc.id);
              }).catch((error) => {
                console.error("dbOnOrganizationTypesUpdate organization %s on %s failed. %s", organization.name, doc.id, error);
              });
            });
          }).catch(error => {
            console.error("dbOnOrganizationTypesUpdate failed to execute query. %s", error);
          });
        }
      });

    } else {
      console.log('dbOnOrganizationTypesUpdate [Missing] organizationTypes document has been removed');
      resolve();
    }
  })
});

//todo add a proper resolve method to avoid timeout.
