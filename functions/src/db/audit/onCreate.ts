import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {addAuditRecord, updateMetaData} from "../../utils/auditUtils";

export const auditOnCreate = functions.firestore.document('{collection}/{id}').onCreate(async (change, context) => {
  return new Promise<any>((resolve, reject) => {
    updateMetaData(context, admin.firestore(), "Document created", change.data(), resolve, reject, true);
    // TODO add a triggered_by to link execution to the user
    //addAuditRecord(context, admin.firestore(), "Document created", change.data(), resolve, reject);
  });
});





