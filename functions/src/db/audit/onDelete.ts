import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {addAuditRecord, updateMetaData} from "../../utils/auditUtils";

export const auditOnDelete = functions.firestore.document('{collection}/{id}').onDelete(async (change, context) => {
  return new Promise<any>((resolve, reject) => {
    updateMetaData(context, admin.firestore(), change.data(), "Document deleted", resolve, reject, false);
    //addAuditRecord(context, admin.firestore(), change.data(), "Document deleted", resolve, reject);
  });
});




