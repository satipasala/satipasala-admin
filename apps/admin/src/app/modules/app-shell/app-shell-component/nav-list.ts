import {
  // AUDIT_LOG_INFO_ROUTE,
  // AUDIT_LOG_ROUTE,
  AUTH_MANAGEMENT_ROUTE,
  AUTH_MANAGEMENT_ROUTE_PERMISSION_LEVELS,
  AUTH_MANAGEMENT_ROUTE_PERMISSIONS,
  AUTH_MANAGEMENT_ROUTE_ROLE_LEVELS,
  AUTH_MANAGEMENT_ROUTE_ROLES,
  COURSE_FEEDBACK_ROUTE,
  COURSE_MANAGEMENT_INFO_ROUTE,
  COURSE_MANAGEMENT_ROUTE,
  DASHBOARD_OVERVIEW_ROUTE,
  DASHBOARD_ROUTE,
  EVENT_MANAGEMENT_ROUTE,
  FILE_MANAGEMENT_AUDIO_FILES_ROUTE,
  FILE_MANAGEMENT_IMG_UPLOAD_ROUTE,
  FILE_MANAGEMENT_PDF_UPLOAD_ROUTE,
  FILE_MANAGEMENT_ROUTE,
  HOST_MANAGEMENT_INFO_ROUTE,
  HOST_MANAGEMENT_ROUTE,
  QUESTION_MANAGEMENT_ROUTE,
  QUESTIONNAIRE_MANAGEMENT_LIST_ROUTE,
  QUESTIONNAIRE_MANAGEMENT_ROUTE,
  REFERENCE_DATA_ACTIVITY_TYPE_ROUTE,
  REFERENCE_DATA_CITIES_ROUTE,
  REFERENCE_DATA_LANGUAGE_ROUTE,
  REFERENCE_DATA_LOCATION_TYPE_ROUTE,
  REFERENCE_DATA_ORGANIZATION_TYPE_ROUTE,
  REFERENCE_DATA_QUESTION_LABEL_ROUTE,
  REFERENCE_DATA_QUESTION_TYPE_ROUTE,
  REFERENCE_DATA_ROUTE,
  REFERENCE_DATA_STATES_ROUTE,
  USERS_MANAGEMENT_ROUTE,
  USERS_ROUTE,
  REFERENCE_DATA_EVENT_CATEGORY_ROUTE,
  ACTIVITY_MANAGEMENT_INFO_ROUTE,
  REFERENCE_DATA_DASHBOARD_TYPE,
  PROGRAM_MANAGEMENT_INFO_ROUTE, EVENT_MANAGEMENT_INFO_ROUTE,
} from "../../../app-routs";
import {Navigation} from "@satipasala/base";

export const NavList: Navigation[] = [
  {
    categoryName: 'Dashboard', icon: 'dash_board', dropDown: false, categoryLink: DASHBOARD_ROUTE,
    subCategory:
      [
        {
          subIcon: '',
          subCategoryName: 'Overview',
          subCategoryLink: DASHBOARD_OVERVIEW_ROUTE,
          subCategoryQuery: {title: 'Overview'},
          visible: true
        },
        /*{
          subIcon: '',
          subCategoryName: 'Event Overview',
          subCategoryLink: DASHBOARD_EVENT_OVERVIEW_ROUTE,
          subCategoryQuery: {title: 'Event Overview'},
          visible: true
        }*/
      ],
    isActive: true
  },
  {
    categoryName: 'User Management', icon: 'user_management', dropDown: false, categoryLink: USERS_ROUTE,
    subCategory:
      [
        {
          subIcon: 'manage_user',
          subCategoryName: 'Manage Users',
          subCategoryLink: USERS_MANAGEMENT_ROUTE,
          subCategoryQuery: {title: 'Manage Users'},
          visible: true
        }
      ],
    isActive: true
  },
  {
    categoryName: 'Organization Management',
    icon: 'host_management',
    dropDown: false,
    categoryLink:  HOST_MANAGEMENT_ROUTE,
    subCategory:
      [
        {
          subIcon: 'manage_host',
          subCategoryName: 'Manage Organizations',
          subCategoryLink: HOST_MANAGEMENT_INFO_ROUTE,
          subCategoryQuery: {title: 'Login'},
          visible: true
        }
      ],
    isActive: true
  },
  {
    categoryName: 'Questionnaire Management',
    icon: 'questionnaire_management',
    dropDown: false,
    categoryLink: QUESTIONNAIRE_MANAGEMENT_ROUTE,
    subCategory:
      [
        {
          subIcon: 'questionnaire_management',
          subCategoryName: 'Manage Questionnaire',
          subCategoryLink: QUESTIONNAIRE_MANAGEMENT_LIST_ROUTE,
          subCategoryQuery: {title: 'Login'},
          visible: true
        },
        {
          subIcon: 'question',
          subCategoryName: 'Questions',
          subCategoryLink: QUESTION_MANAGEMENT_ROUTE,
          subCategoryQuery: {title: 'view'},
          visible: true
        }
      ],
    isActive: true
  },
  {
    categoryName: 'Program Management',
    icon: 'courses_management',
    dropDown: false,
    categoryLink: COURSE_MANAGEMENT_ROUTE,
    subCategory:
      [ {
        subIcon: 'programs',
        subCategoryName: 'Programs',
        subCategoryLink: PROGRAM_MANAGEMENT_INFO_ROUTE,
        visible: true
      },
        {
          subIcon: 'courses',
          subCategoryName: 'Courses',
          subCategoryLink: COURSE_MANAGEMENT_INFO_ROUTE,
          visible: true
        }, {
        subIcon: 'activities',
        subCategoryName: 'Manage Activities',
        subCategoryLink: ACTIVITY_MANAGEMENT_INFO_ROUTE,
        visible: true
      },
        {
          subIcon: 'feedback',
          subCategoryName: 'Feedbacks',
          subCategoryLink: COURSE_FEEDBACK_ROUTE,
          visible: true
        }
      ],
    isActive: true
  },
  {
    categoryName: 'Event Management', icon: 'event_management', dropDown: false, categoryLink: EVENT_MANAGEMENT_ROUTE,
    subCategory:
      [
        {
          subIcon: 'event',
          subCategoryName: 'Events', subCategoryLink: EVENT_MANAGEMENT_INFO_ROUTE, visible: true
        }
      ],
    isActive: true
  },
  //todo enable file management when content management CR is implemented
  /*{
    categoryName: 'File Management', icon: 'feedback_new', dropDown: false, categoryLink: FILE_MANAGEMENT_ROUTE,
    subCategory:
      [

        {  subIcon:'assignments', subCategoryName: 'Assignments', subCategoryLink: '/uploads', visible: true },
        {  subIcon:'image_upload', subCategoryName: 'Image Upload', subCategoryLink: FILE_MANAGEMENT_IMG_UPLOAD_ROUTE, visible: true },
        {  subIcon:'pdf_upload', subCategoryName: 'PDF Upload', subCategoryLink: FILE_MANAGEMENT_PDF_UPLOAD_ROUTE, visible: true },
        {  subIcon:'audio_files', subCategoryName: 'Audio Files', subCategoryLink: FILE_MANAGEMENT_AUDIO_FILES_ROUTE, visible: true }
      ],
    isActive: true
  },*/
  {
    categoryName: 'Auth Management', icon: 'auth_management', dropDown: false, categoryLink: AUTH_MANAGEMENT_ROUTE,
    subCategory:
      [
        {
          subIcon: 'roles',
          subCategoryName: 'Roles',
          subCategoryLink: AUTH_MANAGEMENT_ROUTE_ROLES,
          subCategoryQuery: {title: 'Roles'},
          visible: true
        },
        {
          subIcon: 'permission',
          subCategoryName: 'Permissions',
          subCategoryLink: AUTH_MANAGEMENT_ROUTE_PERMISSIONS,
          subCategoryQuery: {title: 'Permissions'},
          visible: true
        }, {
        subIcon: 'permission_level',
        subCategoryName: 'Permission Level',
        subCategoryLink: AUTH_MANAGEMENT_ROUTE_PERMISSION_LEVELS,
        subCategoryQuery: {title: 'Permission Level'},
        visible: true
      }, {
        subIcon: 'role_level',
        subCategoryName: 'Role Levels',
        subCategoryLink: AUTH_MANAGEMENT_ROUTE_ROLE_LEVELS,
        subCategoryQuery: {title: 'Role Levels'},
        visible: true
      }
      ],
    isActive: true
  },
  {
    categoryName: 'Reference Data', icon: 'reference_data', dropDown: false, categoryLink: REFERENCE_DATA_ROUTE,
    subCategory:
      [
        {
          subIcon: 'activity-types',
          subCategoryName: 'Activity Types',
          subCategoryLink: REFERENCE_DATA_ACTIVITY_TYPE_ROUTE,
          visible: true
        },
        {
          subIcon: 'question_type',
          subCategoryName: 'Question Types',
          subCategoryLink: REFERENCE_DATA_QUESTION_TYPE_ROUTE,
          visible: true
        },
        {
          subIcon: 'question lables',
          subCategoryName: 'Question Labels',
          subCategoryLink: REFERENCE_DATA_QUESTION_LABEL_ROUTE,
          visible: true
        },
        {
          subIcon: 'organization-types',
          subCategoryName: 'Organization Types',
          subCategoryLink: REFERENCE_DATA_ORGANIZATION_TYPE_ROUTE,
          visible: true
        },
       /* {
          subIcon: 'location_types',
          subCategoryName: 'Location Types',
          subCategoryLink: REFERENCE_DATA_LOCATION_TYPE_ROUTE,
          visible: true
        },*/
        {
          subIcon: 'languages',
          subCategoryName: 'Languages',
          subCategoryLink: REFERENCE_DATA_LANGUAGE_ROUTE,
          visible: true
        },
        {
          subIcon: 'province',
          subCategoryName: 'States/Provinces',
          subCategoryLink: REFERENCE_DATA_STATES_ROUTE,
          visible: true
        },
        {subIcon: 'cities', subCategoryName: 'Cities', subCategoryLink: REFERENCE_DATA_CITIES_ROUTE, visible: true},
        {
          subIcon: 'event',
          subCategoryName: 'Event Categories',
          subCategoryLink: REFERENCE_DATA_EVENT_CATEGORY_ROUTE,
          visible: true
        },{
          subIcon: 'grid',
          subCategoryName: 'Dashboard Types',
          subCategoryLink: REFERENCE_DATA_DASHBOARD_TYPE,
          visible: true
        }
      ],
    isActive: true
  }
  // {
  //   categoryName: 'Audit Log', icon: 'event_management', dropDown: false, categoryLink: AUDIT_LOG_ROUTE,
  //   subCategory:
  //     [
  //       {  subIcon:'event', subCategoryName: 'Audit Info', subCategoryLink: AUDIT_LOG_INFO_ROUTE, visible: true },
  //     ],
  //   isActive: true
  // }
];
