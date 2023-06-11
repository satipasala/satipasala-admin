import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

export const dbProgramOnUpdate = functions.firestore.document('programs/{programDoc}')
  .onUpdate((change, context) => {

    const program = change.after.data();
    if (change.after.id === change.before.id) {
      const db = admin.firestore();

      // Updating relevant courses in courseSubscription collection where the course haven't started yet
      const programSubscriptionsPromise = new Promise((resolve, reject) => {
        console.log("dbProgramsOnUpdate starting changes to programSubscription collection");
        db.collection("programSubscriptions")
          .where("program.id", '==', program.id).where("program.status", "==", "notstarted").get()
          .then(snap => {
            snap.forEach((doc) => {
              const programSubscription = doc.data();
              programSubscription.program =program;
              doc.ref.update(programSubscription).then(() => {
                console.log("dbProgramOnUpdate on courseSubscription %s success", programSubscription.id);
              }).catch((error) => {
                console.error("dbProgramOnUpdate on courseSubscription %s failed :", programSubscription.id, error);
              });
            });
            resolve('courseSubscriptions updated');
          }).catch(error => {
          console.error('Error performing courseSubscriptions collection query on dbProgramOnUpdate : ', error);
          reject('courseSubscriptions update failed');
        });
      });


      // Updating relevant courses in users collection where the course haven't started yet
      const usersPromise = new Promise((resolve, reject) => {
        console.log("dbProgramOnUpdate starting changes to users collection");
        db.collection("users")
          .where(`programSubscriptions.${program.id}.id`, '==', program.id).where(`programSubscriptions.${program.id}.status`, '==', "notstarted").get()
          .then(snap => {
            snap.forEach((doc) => {
              const user = doc.data();
              user.programSubscriptions[program.id] = program;
              doc.ref.update({programSubscriptions: user.programSubscriptions}).then(() => {
                console.log("dbProgramOnUpdate on user %s success", user.email);
              }).catch((error) => {
                console.error("dbProgramOnUpdate on user %s failed :", user.email, error);
              });
            });
            resolve('users updated');
          }).catch(error => {
          console.error('Error performing users collection query on dbProgramOnUpdate : ', error);
          reject('users update failed');
        });
      });

      //update events
      const eventsPromise = new Promise((resolve, reject) => {
        console.log("dbProgramOnUpdate starting changes to events collection");
        db.collection("events")
          .where(`program.id`, '==', program.id).get()
          .then(snap => {
            snap.forEach((doc) => {
              doc.ref.update({program: program}).then(() => {
                console.log("dbProgramOnUpdate on events %s success", program);
              }).catch((error) => {
                console.error("dbProgramOnUpdate on events %s failed :", program, error);
              });
            });
            resolve('users updated');
          }).catch(error => {
          console.error('Error performing users collection query on dbProgramOnUpdate : ', error);
          reject('users update failed');
        });
      });


      //update event sessions
      const eventSessionsPromise = new Promise((resolve, reject) => {
        console.log("dbProgramOnUpdate starting changes to eventSessions collection");
        db.collection("eventSessions")
          .where(`program.id`, '==', program.id)/*
          .where(`status.value`, 'in',['not_started','started'])*/.get()
          .then(snap => {
            snap.forEach((doc) => {
              const oldEventSession = doc.data();
              if (program.courses && oldEventSession.program && oldEventSession.program.courses) {
                const subscribedCourses = oldEventSession.program.courses;
                Object.keys(subscribedCourses).forEach(value => {
                  const isActive = subscribedCourses[value].active
                  program.courses[value].active = isActive?isActive:'No' ;
                  oldEventSession.program.courses[value] = program.courses[value]; //set the updated courses if course id is matched.

                })
              }
              doc.ref.update(oldEventSession).then(() => {
                console.log("dbProgramOnUpdate on eventSessions %s success", program);
              }).catch((error) => {
                console.error("dbProgramOnUpdate on eventSessions %s failed :", program, error);
              });
            });
            resolve('users updated');
          }).catch(error => {
          console.error('Error performing users collection query on dbProgramOnUpdate : ', error);
          reject('users update failed');
        });
      });
      return Promise.all([programSubscriptionsPromise, usersPromise, eventsPromise, eventSessionsPromise]);
    } else {
      return Promise.resolve();
    }
  });
