const FieldValue = require('firebase-admin').firestore.FieldValue;

export function auditLogNeeded(collection) {
  return collection !== 'audit_log'
    && collection !== 'auth'
    && collection !== 'feedback'
    && collection !== 'pictures'
    && collection !== 'courseSubscriptions'
    && collection !== 'stats'
}


export function addAuditRecord(context, db, oldDoc, newDoc, resolve, reject) {

  if (auditLogNeeded(context.params.collection)) {
    const auditRecord = {
      context: context,
      oldDoc: oldDoc,
      newDoc: newDoc,
      triggeredAt: new Date().toISOString()
    };
    db.collection('audit_log').add(auditRecord)
      .then((ref) => {
        console.log('auditOnWrite [Success] User activity recorded successfully. Ref => %s', context.params.collection + "_" + ref.id);
        resolve();
      })
      .catch(error => {
        console.log('auditOnWrite [Error] Failed to record user activity, Error => %s', error);
        reject()
      });
  } else {
    console.log("[IGNORED AUDIT] no audit record added for document %s in collection %s ", context.params.id, context.params.collection);
    resolve("[IGNORED AUDIT] no audit record added for document");
  }

}

export function metaDataNeeded(collection) {
  return collection !== 'audit_log'
    && collection !== 'auth'
    && collection !== 'pictures'
    && collection !== 'stats'
    && collection !== 'events'
}

export function updateMetaData(context, db, oldDoc, newDoc, resolve, reject, isAdd) {

  if (metaDataNeeded(context.params.collection)) {
    const ref = db.collection('stats').doc('documentCount');
    let count = 0;

    if (isAdd === true) {
      count = 1;
    } else {
      count = -1;
    }

    ref.get().then( doc=> {
      if (doc.exists) {
        const update = {};
        if (context.params.collection.toString() in doc.data()) {
          update[context.params.collection] = FieldValue.increment(count);
          doc.ref.update(update);
        } else {
          update[context.params.collection] = 1;
          doc.ref.update(update);
        }
        resolve();
      } else {
        const documentCount = {};
        documentCount[context.params.collection] = 1;

        db.collection('stats').doc('documentCount').set(documentCount, {merge: true})
          .then((docRef) => {
            console.log('stats [Success] stats recorded successfully. Ref => %s', context.params.collection + "_" + docRef.id);
            resolve();
          })
          .catch(error => {
            console.log('stats [Error] Failed to record stats, Error => %s', error);
            reject()
          });
      }
    }).catch( error=> {
      console.log("Error getting document:", error);
      reject("[ERROR stats] no stats updated for document", error);
    });


  } else {
    console.log("[IGNORED stats] no stats updated for document %s in collection %s ", context.params.id, context.params.collection);
    reject("[IGNORED stats] no stats updated for document");
  }

}

