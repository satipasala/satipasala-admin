export const PRIVACY_POLICY_ROUTE="privacy-policy"

export const DASHBOARD_ROUTE = "dashboard";
export const EMBEDDED_DASHBOARDS_PREFIX='embedded-dashboards/'
export const EMBEDDED_DASHBOARDS=EMBEDDED_DASHBOARDS_PREFIX+':dashboardId'
export const DASHBOARD_OVERVIEW_ROUTE = "overview";
export const DASHBOARD_EVENT_OVERVIEW_ROUTE = "event-overview";

export const USERS_ROUTE = "users";
export const USERS_LOGIN_ROUTE = "login";
export const USERS_MANAGEMENT_ROUTE = "management";
export const USERS_EDIT_ROUTE = ":uid";
export const USERS_REGISTER_ROUTE = "register";
export const USERS_COURSE_ROUTE = ":uid/courses";

export const HOST_MANAGEMENT_ROUTE = "host";
export const HOST_MANAGEMENT_INFO_ROUTE = "info";
export const HOST_MANAGEMENT_EDIT_ROUTE = ":hostId";
export const HOST_LOCATIONS_INFO_ROUTE = ":hostId/location";
export const HOST_LOCATIONS_EDIT_ROUTE = HOST_LOCATIONS_INFO_ROUTE + "/:locationId";
export const HOST_ASSIGN_TO_USER_ROUTE = "host/assign/:hostId";

export const PROGRAM_MANAGEMENT_ROUTE = "programs";



export const COURSE_MANAGEMENT_ROUTE = "cources";
export const COURSE_MANAGEMENT_INFO_ROUTE = "courceInfo";
export const COURSE_MANAGEMENT_ACTION_ROUTE = ":courseId/:action";  // edit, add
export const COURSE_ASSIGN_TO_USER_ROUTE = "course/assign/:courseId";             // submit course
export const COURSE_FEEDBACK_ROUTE = "feedback";             // submit course
export const COURSE_ACTIVITY_INFO_ROUTE = "activities/:courseId";

export const PROGRAM_MANAGEMENT_INFO_ROUTE = "programInfo";
export const PROGRAM_MANAGEMENT_ACTION_ROUTE = "program/:programId/:action";  // edit, add
export const PROGRAM_ASSIGN_TO_USER_ROUTE = "programUsers/assign/:programId";             // submit program
export const PROGRAM_FEEDBACK_ROUTE = "programFeedback";             // submit program
export const PROGRAM_COURSE_INFO_ROUTE = "programCourses/info/:programId";

export const EVENT_MANAGEMENT_ROUTE = "events";
export const EVENT_MANAGEMENT_INFO_ROUTE = "eventInfo";
export const EVENT_MANAGEMENT_ADD_ROUTE = "new";
export const EVENT_MANAGEMENT_VIEW_ROUTE = "view";
export const EVENT_MANAGEMENT_EDIT_ROUTE = "edit";

export const SESSION_MANAGEMENT_ROUTE = "sessions";
  export const SESSION_MANAGEMENT_ADD_ROUTE = "addSession";
export const SESSION_MANAGEMENT_EDIT_ROUTE = "editSession";
export const SESSION_MANAGEMENT_DETAILS_ROUTE = "sessionDetails/:sessionId";

export const FILE_MANAGEMENT_ROUTE = "files";
export const FILE_MANAGEMENT_IMG_UPLOAD_ROUTE = "imageUploads";
export const FILE_MANAGEMENT_PDF_UPLOAD_ROUTE = "pdfUploads";
export const FILE_MANAGEMENT_AUDIO_FILES_ROUTE = "audioFiles";

export const ACTIVITY_MANAGEMENT_ROUTE = "activity";
export const ACTIVITY_MANAGEMENT_INFO_ROUTE = "info";

export const QUESTIONNAIRE_MANAGEMENT_ROUTE = "questionnaires";
export const QUESTIONNAIRE_MANAGEMENT_LIST_ROUTE = "list";

export const QUESTIONNAIRE_MANAGEMENT_EDIT_ROUTE = "edit/:questionnaireId";
export const QUESTIONNAIRE_MANAGEMENT_INFO_ROUTE = "info/:questionnaireId";
export const QUESTIONNAIRE_MANAGEMENT_ADD_ROUTE = "add";

export const QUESTION_MANAGEMENT_ROUTE = "questions";
export const QUESTION_MANAGEMENT_ACTION_ROUTE = ":questionId/edit";
export const QUESTION_MANAGEMENT_ADD_ROUTE = "add";
export const QUESTION_MANAGEMENT_INFO_ROUTE = ":questionId";


export const REFERENCE_DATA_ROUTE = "referencedata";
export const REFERENCE_DATA_ACTIVITY_TYPE_ROUTE = "activitytype";
export const REFERENCE_DATA_QUESTION_TYPE_ROUTE = "questiontype";
export const REFERENCE_DATA_QUESTION_LABEL_ROUTE = "questionlabel";
export const REFERENCE_DATA_LOCATION_TYPE_ROUTE = "schooltype";
export const REFERENCE_DATA_ORGANIZATION_TYPE_ROUTE = "organizationtype";
export const REFERENCE_DATA_LANGUAGE_ROUTE = "language";
export const REFERENCE_DATA_CITIES_ROUTE = "cities";
export const REFERENCE_DATA_STATES_ROUTE = "states";
export const REFERENCE_DATA_EVENT_CATEGORY_ROUTE = "eventCategory";
export const REFERENCE_DATA_DASHBOARD_TYPE = "dashboardType";

export const AUTH_MANAGEMENT_ROUTE = "auth";
export const AUTH_MANAGEMENT_ROUTE_PERMISSIONS = "permissions";
export const AUTH_MANAGEMENT_ROUTE_PERMISSION_LEVELS = "permissionLevels";
export const AUTH_MANAGEMENT_ROUTE_ROLE_LEVELS = "roleLevels";
export const AUTH_MANAGEMENT_ROUTE_COURSES = "courses";
export const AUTH_MANAGEMENT_ROUTE_VIEW_PERMISSION = "permissions/view/:permissionId";
export const AUTH_MANAGEMENT_ROUTE_ROLES = "roles";
export const AUTH_MANAGEMENT_ROUTE_VIEW_ROLE_INFO = "view/:roleId";
export const AUTH_MANAGEMENT_ROUTE_ROLES_FORM = "add/edit";
export const AUTH_MANAGEMENT_ROUTE_ROLES_ADD_ROLE_RELATIVE = "add";
export const AUTH_MANAGEMENT_ROUTE_ROLES_ADD_ROLE_ABS = "roles/add";
export const AUTH_MANAGEMENT_ROUTE_ROLES_COURSES = "courses/:roleId";

export const AUTH_MANAGEMENT_ROUTE_ROLES_PERMISSION = "permissions/:roleId";

export const AUDIT_LOG_ROUTE= "auditLog";
export const AUDIT_LOG_INFO_ROUTE="auditInfo";
