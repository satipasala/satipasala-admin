import {ActionType, addActionFeedRecord} from "./actionFeedUtils";

export function getUserInfo(user) {
  const userInfoObj = {
    displayName: user.displayName ? user.displayName : "",
    email: user.email,
    firstName: user.firstName ? user.firstName : "",
    id: user.email,
    lastName: user.lastName ? user.lastName : "",
    organizationInfo: {},
    uid: user.uid,
    userName: user.userName ? user.userName : "",
    userRoleId: user.userRoleId,
    userRole: {},
    photoURL: user.photoURL
  };

  userInfoObj.userRole = {
    name: user.userRole.name,
    id: user.userRole.id,
  }
  return userInfoObj;

}


//get removed courses comparing two roles
export function getRemovedCoursesFromRole(role, updatedRole): any[] {
  const removedCourses = [];
  if (role.courses) {
    Object.keys(role.courses).forEach(key => {
      if (updatedRole.courses[key] == null) {
        removedCourses.push(role.courses[key]);
      }
    });
  }

  return removedCourses;
}


//get newly added courses comparing two roles
export function getAllCoursesAddedToRole(updatedRole): any[] {
  const newCourses = [];
  if (updatedRole.courses) {
    Object.keys(updatedRole.courses).forEach(key => {
      newCourses.push(updatedRole.courses[key]);
    });
  } else {
    console.log("no updated roles");
    updatedRole.courses = {};
  }

  return newCourses;
}

//get removed courses comparing user and updated user
export function getRemovedCoursesFromUser(user, updatedUser): any[] {
  const removedCourses = [];
  if (user.courseSubscriptions && updatedUser.courseSubscriptions) {
    Object.keys(user.courseSubscriptions).forEach(key => {
      if (updatedUser.courseSubscriptions[key] == null && 'started' !== user.courseSubscriptions[key].status) {
        removedCourses.push(user.courseSubscriptions[key]);
      }
    });
  }
  return removedCourses;
}

//get removed courses comparing user and updated user
export function getRemovedProgramsFromUser(user, updatedUser): any[] {
  const removedCourses = [];
  if (user.programSubscriptions && updatedUser.programSubscriptions) {
    Object.keys(user.programSubscriptions).forEach(key => {
      if (updatedUser.programSubscriptions[key] == null && 'started' !== user.programSubscriptions[key].status) {
        removedCourses.push(user.programSubscriptions[key]);
      }
    });
  }
  return removedCourses;
}

//get added courses comparing user and updated user
export function getNewCoursesAddedToUser(user, updatedUser): any[] {
  const newCourses = [];
  if (updatedUser.courseSubscriptions) {
    if (user.courseSubscriptions) {
      user.courseSubscriptions = {}
    }
    Object.keys(updatedUser.courseSubscriptions).forEach(key => {
      if (user.courseSubscriptions[key] == null) {
        newCourses.push(updatedUser.courseSubscriptions[key]);
      }
    });
  } else {
    updatedUser.courseSubscriptions = {};
  }

  return newCourses;
}

//get added courses comparing user and updated user
export function getNewProgramsAddedToUser(user, updatedUser): any[] {
  const newCourses = [];
  if (updatedUser.programSubscriptions) {
    if (!user.programSubscriptions) {
      user.programSubscriptions = {}
    }
    Object.keys(updatedUser.programSubscriptions).forEach(key => {
      if (user.programSubscriptions[key] == null) {
        newCourses.push(updatedUser.programSubscriptions[key]);
      }
    });
  } else {
    updatedUser.programSubscriptions = {};
  }

  return newCourses;
}

export function getAddedSessionSubscriptions(user, updatedUser) {
  const newSessionSubscriptions = [];
  if (updatedUser.sessionSubscriptions) {
    if (!user.sessionSubscriptions) {
      user.sessionSubscriptions = {}
    }
    Object.keys(updatedUser.sessionSubscriptions).forEach(key => {
      if (user.sessionSubscriptions[key] == null) {
        newSessionSubscriptions.push(updatedUser.sessionSubscriptions[key]);
      }
    });
  } else {
    updatedUser.sessionSubscriptions = {};
  }

  return newSessionSubscriptions;
}

export function removeUserCourseSubscription(user, courseId) {
  const course = user.courseSubscriptions[courseId];
  if (user.courseSubscriptions && course && course.status === 'notstarted') {
    delete user.courseSubscriptions[courseId];
    console.log("dbCourseSubscriptionOnDelete [Process] Removing %s course subscription from %s", courseId, user.id)
  }
}

export function addUserCourseSubscriptions(user, course) {
  if (user.courseSubscriptions == null) {
    user.courseSubscriptions = {};
  }
  if (user.courseSubscriptions[course.id] == null || user.courseSubscriptions[course.id].status === 'notstarted') {
    user.courseSubscriptions[course.id] = course;
  }

}

export function addCourseSubscription(db, batch, updatedUser, course) {
  const userInfoObj = getUserInfo(updatedUser);
  const subscriptionId = updatedUser.email + "_" + course.id;
  console.log('courseSubscriptions [Process] Assigning %s course subscription' + subscriptionId);
  batch.set(db.collection('courseSubscriptions').doc(subscriptionId), {
    course: course,
    userInfo: userInfoObj,
    hostInfo: {},
    id: subscriptionId
  });

  addActionFeedRecord(db, ActionType.subscribed_to_course, userInfoObj,getCourseInfo(course) )
    .then(value => console.log("completed"))
    .catch(reason => console.error(reason));

}

export function addProgramSubscription(db, batch, updatedUser, program) {
  const userInfoObj = getUserInfo(updatedUser);
  const subscriptionId = updatedUser.email + "_" + program.id;
  console.log('addProgramSubscription [Process] Assigning %s program subscription' + subscriptionId);
  batch.set(db.collection('programSubscriptions').doc(subscriptionId), {
    program: program,
    userInfo: userInfoObj,
    hostInfo: {},
    id: subscriptionId
  });
  addActionFeedRecord(db, ActionType.subscribed_to_program, userInfoObj, getProgramInfo(program))
    .then(value => console.log("completed"))
    .catch(reason => console.error(reason));
}

export function addSessionSubscription(db, batch, updatedUser, session) {
  const userInfoObj = getUserInfo(updatedUser);
  const subscriptionId = updatedUser.email + "_" + session.id;
  console.log('addSessionSubscription [Process] Assigning %s session subscription' + subscriptionId);
  batch.set(db.collection('sessionSubscriptions').doc(subscriptionId), {
    session: session,
    userInfo: userInfoObj,
    hostInfo: {},
    id: subscriptionId
  });
  db.collection('eventSessions').doc(session.id).get().then(snap => {
    if (snap.exists) {
      const eventSession = snap.data();
      if (!eventSession.participation) {
        eventSession.participation = {};
      }
      eventSession.participation[updatedUser.email] = {
        status: {
          name: "Not Started",
          value: 'not_started',
        },
        user: userInfoObj
      }
      snap.ref.update(eventSession).then(() => {
        console.log("adding eventSessionSubscriptions on user %s success", updatedUser.email);
        addActionFeedRecord(db, ActionType.subscribed_to_session, userInfoObj, getEventInfo(eventSession))
          .then(value => console.log("completed"))
          .catch(reason => console.error(reason));
      }).catch((error) => {
        console.error("adding eventSessionSubscriptions on user %s failed :", updatedUser.email, error);
      });
    }
  });
}


export function removeCourseSubscription(db, batch, updatedUser, course) {
  const subscriptionId = updatedUser.email + "_" + course.id;
  batch.delete(db.collection('courseSubscriptions').doc(subscriptionId));
  console.log('dbRoleOnUpdate [Process] Removing %s course subscription', updatedUser.email + "_" + course.id);
}

export function removeProgramSubscription(db, batch, updatedUser, program) {
  const subscriptionId = updatedUser.email + "_" + program.id;
  batch.delete(db.collection('programSubscriptions').doc(subscriptionId));
  console.log('dbRoleOnUpdate [Process] Removing %s program subscription', updatedUser.email + "_" + program.id);
}

export function getUpdatedFeedbackFromUser(user, updatedUser) {
  const updatedFeedback = [];
  if (updatedUser.courseSubscriptions) {
    Object.keys(updatedUser.courseSubscriptions).forEach(c_key => {
      if (updatedUser.courseSubscriptions[c_key].feedbacks) {
        Object.keys(updatedUser.courseSubscriptions[c_key].feedbacks).forEach(f_key => {
          if (user.courseSubscriptions[c_key] && user.courseSubscriptions[c_key].feedbacks[f_key]) {
            if (updatedUser.courseSubscriptions[c_key].feedbacks[f_key].updatedAt !== user.courseSubscriptions[c_key].feedbacks[f_key].updatedAt) {
              updatedFeedback.push(updatedUser.courseSubscriptions[c_key].feedbacks[f_key]);
              console.log('objectUtils [Process] Updated feedback %s', updatedUser.courseSubscriptions[c_key].feedbacks[f_key].id)
            }
          } else {
            console.log("adding new feedback ");
            updatedFeedback.push(updatedUser.courseSubscriptions[c_key].feedbacks[f_key]);
          }
        })
      }

    });
  }
  return updatedFeedback;
}

export function assignUpdatedFeedback(db, batch, updatedUser, feedback) {
  const userInfoObj = getUserInfo(updatedUser);
  console.log('dbRoleOnUpdate [Process] Updating %s feedback on feedback ', feedback.subscriptionId);
  batch.set(db.collection('feedback').doc(feedback.id), getFeedbackObject(feedback));
}

export function updateCourseSubscriptionOnFeedbackUpdate(db, batch, updatedUser, feedback) {
  const userInfoObj = getUserInfo(updatedUser);
  const feedbacks = {};
  feedbacks[feedback.occurrence.number] = getFeedbackObject(feedback);
  console.log('dbRoleOnUpdate [Process] Updating %s feedback on course subscription', feedback.subscriptionId);
  batch.set(db.collection('courseSubscriptions').doc(userInfoObj.email + "_" + feedback.subscriptionId), {feedbacks}, {merge: true});
}

function getFeedbackObject(feedback) {
  return {
    courseInfo: feedback.courseInfo,
    feedback: feedback.feedback,
    id: feedback.id,
    occurrence: feedback.occurrence,
    subscriptionId: feedback.subscriptionId,
  }
}

export function addUpdatedFeedback(db, batch, updatedUser, feedback) {
  const userInfoObj = getUserInfo(updatedUser);
  feedback.userInfo = userInfoObj;
  console.log('dbRoleOnUpdate [Process] Assigning %s course subscription', feedback.subscriptionId);
  batch.set(db.collection('feedback').doc(feedback.id), feedback);

}

export function getEventInfo(event: any) {
  const eventInfo = {
    id: event.id,
    name: event.name,
    disabled: event.disabled ? event.disabled : event.disabled = false,
    startDate: event.startDate,
    endDate: '',
    category: event.category,
    coordinatorInfo: getMinimalUserInfo(event.coordinatorInfo),
    addressInfo: event.addressInfo ,
    participants: getParticipantsInfo(event.participants),
    program: event.program,
    host: getHostInfo(event.host),
    facilitators: getFacilitators(event.facilitators)
  };
  return eventInfo;
}



export function getParticipantsInfo(participants) {
  if(participants){
    const eventInfoObj = {
      numberOfAdults: participants.numberOfAdults,
      numberOfChildren: participants.numberOfChildren,
      numberOfFemales: participants.numberOfFemales,
      numberOfMales: participants.numberOfMales,
      numberOfParticipants: participants.numberOfParticipants
    };
    return eventInfoObj;
  }else{
    return {numberOfAdults:0,numberOfChildren:0,numberOfFemales:0,numberOfParticipants:0}
  }

}

export function getHostInfo(host: any) {
  const hostInfo = {
    id: host.id,
    name: host.name,
    disabled: host.disabled ? host.disabled : host.disabled = false,
    type: {
      name: host.type.name,
      active: host.type.active ? host.type.active : ''
    },
    mediaFiles:host.mediaFiles
  }
  return hostInfo;
}

export function getCourseInfo(course: any) {
  const courseInfo = {
    id: course.id,
    name: course.name,
    status: course.status ,
    mandatory:course.mandatory,
    description:course.description,
    questionnaire: course.questionnaire ? {
      id: course.questionnaire.id,
      name: course.questionnaire.name
    } : {},
    mediaFiles:course.mediaFiles
  };

  return courseInfo;
}

export function getProgramInfo(program: any) {
  const courseInfo = {
    id: program.id,
    name: program.name,
    description:program.description,
    status: program.status ,
    mandatory:program.mandatory,
    questionnaire: program.questionnaire ? {
      id: program.questionnaire.id,
      name: program.questionnaire.name
    } : {},
    mediaFiles:program.mediaFiles
  };
  return courseInfo;
}


export function getMinimalUserInfo(user: any) {
  const minimalUserInfoObj = {
    displayName: user.displayName ? user.displayName : "",
    email: user.email,
    userRoleId: user.userRoleId
  };
  return minimalUserInfoObj;
}

function getFacilitators(facilitators: {}) {
  const minimalFacilitatorInfoDataSet = {};
  Object.keys(facilitators).forEach(key => {
    minimalFacilitatorInfoDataSet[key] = getMinimalUserInfo(facilitators[key]);
  })
  return minimalFacilitatorInfoDataSet;
}

export function getEventUpdate(dbEventsObj: any, oldEvent: any, newEvent: any, eventDocId: string) {
  const eventsObj = dbEventsObj ? dbEventsObj : {};
  // Existing event
  if (newEvent != null) {
    // If Event is disabled
    if (newEvent.disabled) {
      //[Bug] newEvent.id not fount, docId added as a substitute
      delete eventsObj[eventDocId];
      // If event was disabled previously and enabled now
    } else {
      newEvent.id = eventDocId;
      eventsObj[eventDocId] = getEventInfo(newEvent);
    }
    // New event execution
  } else {
    delete eventsObj[eventDocId];
  }
  return eventsObj;
}


export function getCustomClaims(user: any) {
  const customClaimObj = {
    allowedPermissions: getCollectionPermission(user.userRole.allowedPermissions),
    permissionLevelGroup: getPermissionLevelGroup(user.userRole.permissionLevelGroup),
    accessLevel: user.userRole.roleLevel.access_level,
    roleId:user.userRole.id
  }
  return customClaimObj;
}

function getCollectionPermission(allowedPermissions: any) {
  const permissionsObj = {};
  Object.keys(allowedPermissions).forEach((key: any) => {
    permissionsObj[key] = getCollectionPermissionInfo(allowedPermissions[key]);
  });
  return permissionsObj;
}

function getCollectionPermissionInfo(permissionMap: any) {
  return {
    view: permissionMap.view,
    edit: permissionMap.edit
  };
}

function getPermissionLevelGroup(permissionGroup: any) {
  const permissionsObj = {};
  Object.keys(permissionGroup).forEach((key: any) => {
    permissionsObj[key] = getPermissionLevelGroupInfo(permissionGroup[key]);
  });
  return permissionsObj;
}

function getPermissionLevelGroupInfo(permissionMap: any) {
  return {
    access_level: permissionMap.access_level,
    id: permissionMap.id
  }
}


export class ObjectUtils {
  static mapFromArray(array: any[], key): Object {
    return Object.assign({}, ...array.map(s => ({[s[key]]: s})));
  }

  static reduceProperties(source, destination) {
    for (const prop in destination) {
      if (source[prop] && destination.hasOwnProperty(prop)) {
        if (typeof destination[prop] === 'function') {
          destination[prop] = destination[prop](source[prop])
        } else {
          destination[prop] = source[prop];
        }
      }
    }

    return destination;
  }


  static getCourseSubscriptionKey(user, course) {
    return user.id + "_" + course.id
  }

  static getFeedbackKey(user, course, occurrence) {
    return user.id + "_" + course.id + "_" + occurrence.number;
  }

  static getLocationId(location, host): string {
    return host.id + "_" + location.locationType.name + "_" + location.name;
  }

  static extractUserInfo(user) {
    const userInfo = {
      displayName: null,
      dob: null,
      email: null,
      firstName: null,
      id: null,
      lastName: null,
      nic: null,
      phoneNumber: null,
      photoURL: null,
      providerId: null,
      uid: null,
      userName: null,
      userRoleId: null,
      organizationInfo: null,
    }

    // @ts-ignore
    userInfo.organizationInfo = host => ObjectUtils.extractHostInfo(host)
    return ObjectUtils.reduceProperties(user, userInfo);
  }

  static extractCourseInfo(course) {
    return ObjectUtils.reduceProperties(course, {
      id: null,
      name: null,
      description: null,
      startDate: null,
      endDate: null,
      createdAt: null,
      updatedAt: null,
      status: "notstarted",
      mandatory: null
    });
  }


  static extractHostInfo(host) {
    // @ts-ignore
    return ObjectUtils.reduceProperties(host, {
      id: null,
      name: null,
      description: null,
      disabled: false,
      type: (type) => {
        return {name: type.name}
      }
    });
  }

  static extractLocationInfo(location) {
    return ObjectUtils.reduceProperties(location, {
      id: null,
      hostId: null,
      hostName: null,
      name: null,
      description: null
    });
  }

  /*static extractSubscriptionAssignment(user: any, course: any, subscriptionType: 'assignment' | 'removal', returnType: 'user' | 'course', existingSubscription?: Object[]) {
    if (subscriptionType === 'assignment') {
      if ((user.courseSubscriptions[course.id] == null) || (course.mandatory != user.courseSubscriptions[course.id]?.mandatory)) {
        return (returnType === 'user') ? user : course
      }
    }
    if (subscriptionType === 'removal') {
      if (existingSubscription.includes(user) && (user.courseSubscriptions[course.id] && 'started' != user.courseSubscriptions[course.id]?.status)) {
        return (returnType === 'user') ? user : course
      }
    }
    return false;
  }*/

  static createCourseSubscription(user: any, course: any) {
    return {
      id: user.id + "_" + course.id,
      userInfo: ObjectUtils.extractUserInfo(user),
      hostInfo: user.organizationInfo,
      course: course
    }
  }
}

