import {getEventInfo} from "./objectUtils";

const FieldValue = require('firebase-admin').firestore.FieldValue;

export class ActionType {
  public static subscribed_to_event = 'subscribed_to_event';
  public static subscribed_to_session = 'subscribed_to_session';
  public static subscribed_to_course = 'subscribed_to_course';
  public static subscribed_to_program = 'subscribed_to_program';
}

export function addActionFeedRecord(db, actionType, user, record) {
  return new Promise((resolve, reject) => {
    const actionRecord = {
      user: user,
      actionType: actionType,
      record: record,
      date: new Date().toISOString()
    };
    db.collection('actionFeed').add(actionRecord)
      .then((ref) => {
        console.log('actionFeed [Success] User activity recorded successfully. Ref => %s', actionRecord);
        resolve(true);
      })
      .catch(error => {
        console.log('actionFeed [Error] Failed to record user activity, Error => %s', error.toString());
        reject(error)
      });
  })

}

/*

export function updateProgramSubscriptions(newEvent, publishAction) {
  return new Promise((resolve, reject) => {
    try{
      if (newEvent && newEvent.program && newEvent.participation) {
        const db = admin.firestore();
        Object.keys(newEvent.participation).forEach(userId => {
          db.collection("users").doc(userId.toLowerCase()).get().then(snap => {
            // find user is exists on firestore and should be execute on Admin user create another user
            if (snap.exists) {
              const userData = snap.data();
              if (!userData.programSubscriptions) {
                userData.programSubscriptions = {};
              }

              if (userData.programSubscriptions[newEvent.program.id] == null) {
                userData.programSubscriptions[newEvent.program.id] = newEvent.program;
                snap.ref.update(userData).then(() => {
                  console.log("adding programSubscriptions on user %s success", userData.email);
                }).catch((error) => {
                  console.log("adding programSubscriptions on user %s failed :", userData.email, error);
                });
                if (publishAction) {
                  addActionFeedRecord(db, ActionType.subscribed_to_event, userData, newEvent)
                    .then(value => console.log("completed"))
                    .catch(reason => console.error(reason));
                }
              }
            }
          }).catch(error => {
            console.error("error retrieving user  %s :", userId, error);
          });
        })
      }
      resolve(true);
    }catch (e) {
      reject(e)
    }

  })
}

*/

/*
export function updateCourseSubscriptions(newEventSession, publishAction) {
  return new Promise((resolve, reject) => {
    try{
      if (newEventSession && newEventSession.participation) {
        const db = admin.firestore();
        Object.keys(newEventSession.participation).forEach(userId => {
          db.collection("users").doc(userId.toLowerCase()).get().then(snap => {
            // find user is exists on firestore and should be execute on Admin user create another user
            if (snap.exists) {
              const userData = snap.data();
              if (!userData.courseSubscriptions) {
                userData.courseSubscriptions = {};
              }

              if (newEventSession.program) {
                Object.keys(newEventSession.program.courses).forEach(courseId => {
                  const course = newEventSession.program.courses[courseId];
                  if (course.active === 'Yes' && userData.courseSubscriptions[courseId] == null) {
                    userData.courseSubscriptions[courseId] = course;
                    console.log("[Added] new course %s to user", userData.email);
                    snap.ref.update(userData).then(() => {
                      console.log("adding courseSubscriptions on user %s success", userData.email);
                    }).catch(reason => console.error("error adding course to user:",reason));
                  }
                });
              }
              if (!userData.eventSubscriptions) {
                userData.eventSubscriptions = {};
              }
              if (publishAction) {
                addActionFeedRecord(db, ActionType.subscribed_to_session, userData, newEventSession)
                  .then(value => console.log("completed"))
                  .catch(reason => console.error(reason));
              }
            }
          }).catch(error => {
            console.error("error retrieving user  %s :", userId, error);
          });
        })
      }
      resolve(true);
    }catch (e) {
      reject(e)
    }
  })
}
*/

export function updateEventSubscriptions(db,oldEventSession,newEventSession, publishAction){
  return new Promise((resolve, reject) => {
    try{
      if (newEventSession && newEventSession.program && newEventSession.participation) {
        getNewUserSubscriptions(oldEventSession,newEventSession).forEach(userId => {
          db.collection("users").doc(userId.toLowerCase()).get().then(snap => {
            // find user is exists on firestore and should be execute on Admin user create another user
            if (snap.exists) {
              const userData = snap.data();
              if (!userData.programSubscriptions) {
                userData.programSubscriptions = {};
              }

              if (!userData.courseSubscriptions) {
                userData.courseSubscriptions = {};
              }


              if (newEventSession.program) {

                if (userData.programSubscriptions[newEventSession.program.id] == null) {
                  userData.programSubscriptions[newEventSession.program.id] = newEventSession.program;
                  snap.ref.update(userData).then(() => {
                    console.log("adding programSubscriptions on user %s success", userData.email);
                  }).catch((error) => {
                    console.error("adding programSubscriptions on user %s failed :", userData.email, error);
                  });
                }
                Object.keys(newEventSession.program.courses).forEach(courseId => {
                  const course = newEventSession.program.courses[courseId];
                  if (course.active === 'Yes' && userData.courseSubscriptions[courseId] == null) {
                    userData.courseSubscriptions[courseId] = course;
                    console.log("[Added] new course %s to user", userData.email);
                    snap.ref.update(userData).then(() => {
                      console.log("adding courseSubscriptions on user %s success", userData.email);
                    }).catch(reason => console.error("error adding course to user:",reason));
                  }
                });
              }

              if (!userData.eventSubscriptions) {
                userData.eventSubscriptions = {};
              }
              if (publishAction) {
                addActionFeedRecord(db, ActionType.subscribed_to_event, userData, getEventInfo(newEventSession))
                  .then(value => console.log("completed"))
                  .catch(reason => console.error(reason));
              }
            }
          }).catch(error => {
            console.error("error retrieving user  %s :", userId, error);
          });
        })
      }
      resolve(true);
    }catch (e) {
      reject(e)
    }

  })
}

//get removed courses comparing user and updated user
export function getNewUserSubscriptions(oldSession, newEventSession): any[] {
  const addedUsers = [];
  if(oldSession != null && !oldSession.participation){
    oldSession.participation = {};
  }
  if (newEventSession.participation) {
    Object.keys(newEventSession.participation).forEach(key => {
      if (oldSession && oldSession.participation[key] == null ) {
        addedUsers.push(key);
      }else{
        addedUsers.push(key);
      }
    });
  }
  return addedUsers;
}

