import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {addAuditRecord, auditLogNeeded} from "../../utils/auditUtils";

export const auditOnUpdate = functions.firestore.document('{collection}/{id}').onUpdate(async (change, context) => {
  return new Promise<any>((resolve, reject) => {
    addAuditRecord(context, admin.firestore(), change.before.data(),change.after.data(),resolve,reject);
  });
});




