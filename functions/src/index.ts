// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.

const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
admin.initializeApp(firebaseConfig);

export { emailNewUser, emailNewHost } from './utils/emailSender'

export { restAuth } from './rest/auth'
export { restContacts } from './rest/contacts'
export { restTranslationcf } from './rest/translationcf'
export { resetAuthUserPassword } from './rest/OnResetPassword'

export { authUserOnCreate } from './auth/user/onCreate'
export { authUserOnDelete } from './auth/user/onDelete'
export { authUserOnVerifyToken } from './auth/user/OnVerifyToken'

export { dbHostsOnCreate } from "./db/hosts/onCreate"

export { dbLocationOnWrite } from './db/location/onWrite'
export { dbUsersOnUpdate } from './db/users/onUpdate'
export { dbUsersOnCreate } from './db/users/onCreate'

export { dbRoleOnUpdate } from './db/roles/onUpdate'
export { dbRoleOnCreate } from './db/roles/onCreate'

export { dbReferenceDataPermissionOnCreate } from "./db/referencedata/onPermissionCreate";
export { dbOnOrganizationTypesUpdate } from "./db/referencedata/onOrganizationTypesUpdate";
export { dbOnCityUpdate} from './db/referencedata/onCityUpdate'

export { dbQuestionsOnCreate } from "./db/qustions/onCreate";
export { dbQuestionsOnUpdate } from "./db/qustions/onUpdate"

export { dbActivityOnWrite } from './db/activity/onWrite';

// export { dbFeedbackOnWrite } from "./db/feedback/onWrite";

export { dbCourseOnUpdate } from "./db/course/onUpdate";
export { dbCourseOnCreate } from "./db/course/onCreate";
export { dbProgramOnUpdate } from "./db/program/onUpdate";
export { dbProgramOnCreate } from "./db/program/onCreate";

//export { dbCourseSubscriptionOnWrite } from "./db/courseSubscription/onWrite";
//export { dbCourseSubscriptionOnDelete } from './db/courseSubscription/onDelete';

export { dbQuestionnaireOnCreate } from "./db/questionnaire/onCreate";
export { dbQuestionnaireOnUpdate } from "./db/questionnaire/onUpdate";

//export { auditOnCreate } from "./db/audit/onCreate";
//export { auditOnUpdate } from "./db/audit/onUpdate";
//export { auditOnDelete } from "./db/audit/onDelete";


export { dbEventOnWrite } from "./db/event/onWrite";
export { dbEventSessionsOnWrite } from "./db/eventSessions/onWrite";
