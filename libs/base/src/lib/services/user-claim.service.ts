import {Injectable, ViewChild} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Observable, Subject} from 'rxjs';

import {
  AUTH_MANAGEMENT_ROUTE_PERMISSIONS,
  AUTH_MANAGEMENT_ROUTE_ROLES,
  AUTH_MANAGEMENT_ROUTE_ROLES_ADD_ROLE_ABS,
  AUTH_MANAGEMENT_ROUTE_ROLES_COURSES,
  AUTH_MANAGEMENT_ROUTE_ROLES_PERMISSION,
  AUTH_MANAGEMENT_ROUTE_VIEW_ROLE_INFO,
  COURSE_ACTIVITY_INFO_ROUTE,
  COURSE_ASSIGN_TO_USER_ROUTE,
  COURSE_FEEDBACK_ROUTE,
  COURSE_MANAGEMENT_ROUTE,
  EVENT_MANAGEMENT_ADD_ROUTE,
  EVENT_MANAGEMENT_EDIT_ROUTE,
  EVENT_MANAGEMENT_ROUTE,
  EVENT_MANAGEMENT_VIEW_ROUTE,
  FILE_MANAGEMENT_IMG_UPLOAD_ROUTE,
  FILE_MANAGEMENT_PDF_UPLOAD_ROUTE,
  HOST_LOCATIONS_EDIT_ROUTE,
  HOST_LOCATIONS_INFO_ROUTE,
  HOST_MANAGEMENT_EDIT_ROUTE,
  HOST_MANAGEMENT_INFO_ROUTE,
  QUESTION_MANAGEMENT_ACTION_ROUTE,
  QUESTION_MANAGEMENT_ADD_ROUTE,
  QUESTION_MANAGEMENT_INFO_ROUTE,
  QUESTION_MANAGEMENT_ROUTE,
  QUESTIONNAIRE_MANAGEMENT_ADD_ROUTE,
  QUESTIONNAIRE_MANAGEMENT_EDIT_ROUTE,
  QUESTIONNAIRE_MANAGEMENT_INFO_ROUTE,
  QUESTIONNAIRE_MANAGEMENT_ROUTE,
  REFERENCE_DATA_ACTIVITY_TYPE_ROUTE,
  REFERENCE_DATA_LANGUAGE_ROUTE,
  REFERENCE_DATA_ORGANIZATION_TYPE_ROUTE,
  REFERENCE_DATA_QUESTION_LABEL_ROUTE,
  REFERENCE_DATA_QUESTION_TYPE_ROUTE,
  USERS_COURSE_ROUTE,
  USERS_EDIT_ROUTE,
  USERS_MANAGEMENT_ROUTE,
  USERS_REGISTER_ROUTE,
} from '../../../../../apps/admin/src/app/app-routs'
import {NotificationService} from "./notificationService";
import {Role} from "../model/Role";


@Injectable({
  providedIn: 'root'
})
export class UserClaimService {


  constructor(private auth: AuthService, private notificationService: NotificationService) {
  }

  /**
   *Return logged usesr permissions as an observable
   */

  getUserPermissions(): Observable<any> {
    const subject: Subject<any> = new Subject<any>();
    this.auth.getAuthTokenInfo().then(idTokenResult => {
      subject.next(idTokenResult.claims.userPermissions);
    }).catch((error) => {
      console.log(error);
    });

    return subject.asObservable();
  }

  /**
   * Return allowed organization types of logged user's role can view
   */
  getRoleOrgs(): Observable<any> {
    const subject: Subject<any> = new Subject<any>();
    this.auth.getAuthTokenInfo().then(idTokenResult => {
      subject.next(idTokenResult.roleId);
    }).catch((error) => {
      console.log(error);
    });
    return subject.asObservable();
  }

  /**
   * Return observable boolean as router permissions
   *  @param route
   */
  canAccess(route: string): Observable<boolean> {
    const subject: Subject<boolean> = new Subject<boolean>();
    this.getUserPermissions().subscribe((role: Role) => {
      switch (route) {
        case AUTH_MANAGEMENT_ROUTE_PERMISSIONS: {
          subject.next(this.checkPermission(route, role, "vr", "er",));
          break;
        }
        case AUTH_MANAGEMENT_ROUTE_ROLES : {
          subject.next(this.checkPermission(route, role, "vr"));
          break;
        }
        case AUTH_MANAGEMENT_ROUTE_ROLES_ADD_ROLE_ABS: {
          subject.next(this.checkPermission(route, role, "er"));
          break;
        }
        case AUTH_MANAGEMENT_ROUTE_ROLES_PERMISSION: {
          subject.next(this.checkPermission(route, role, "er"));
          break;
        }
        case AUTH_MANAGEMENT_ROUTE_VIEW_ROLE_INFO: {
          subject.next(this.checkPermission(route, role, "vr"));
          break;
        }
        case USERS_MANAGEMENT_ROUTE: {
          subject.next(this.checkPermission(route, role, "collections_users_read"));
          break;
        }
        case "search": {
          subject.next(this.checkPermission(route, role, "collections_users_read"));
          break;
        }
        case USERS_REGISTER_ROUTE: {
          subject.next(this.checkPermission(route, role, "collections_users_write"));
          break;
        }
        case USERS_EDIT_ROUTE: {
          subject.next(this.checkPermission(route, role, "collections_users_write"));
          break;
        }
        case QUESTIONNAIRE_MANAGEMENT_ROUTE: {
          subject.next(this.checkPermission(route, role, "collections_questionnaires_read"));
          break;
        }
        case QUESTIONNAIRE_MANAGEMENT_INFO_ROUTE: {
          subject.next(this.checkPermission(route, role, "collections_questionnaires_read"));
          break;
        }
        case QUESTIONNAIRE_MANAGEMENT_EDIT_ROUTE: {
          subject.next(this.checkPermission(route, role, "collections_questionnaires_write"));
          break;
        }
        case QUESTIONNAIRE_MANAGEMENT_ADD_ROUTE: {
          subject.next(this.checkPermission(route, role, "collections_questionnaires_write"));
          break;
        }
        case HOST_MANAGEMENT_INFO_ROUTE: {
          subject.next(this.checkPermission(route, role, "collections_hosts_read"));
          break;
        }
        case HOST_LOCATIONS_INFO_ROUTE: {
          subject.next(this.checkPermission(route, role, "collections_hosts_read"));
          break;
        }
        case HOST_LOCATIONS_EDIT_ROUTE: {
          subject.next(this.checkPermission(route, role, "collections_hosts_write"));
          break;
        }
        case HOST_MANAGEMENT_EDIT_ROUTE: {
          subject.next(this.checkPermission(route, role, "collections_hosts_write"));
          break;
        }
        case COURSE_MANAGEMENT_ROUTE: {
          subject.next(this.checkPermission(route, role, "collections_courses_read"));
          break;
        }
        case COURSE_ACTIVITY_INFO_ROUTE: {
          subject.next(this.checkPermission(route, role, "collections_courses_read"));
          break;
        }
        case COURSE_ASSIGN_TO_USER_ROUTE: {
          subject.next(this.checkPermission(route, role, "collections_courses_write"));
          break;
        }
        case FILE_MANAGEMENT_IMG_UPLOAD_ROUTE: {
          subject.next(this.checkPermission(route, role, "collections_files_write"));
          break;
        }
        case FILE_MANAGEMENT_PDF_UPLOAD_ROUTE: {
          subject.next(this.checkPermission(route, role, "collections_files_write"));
          break;
        }
        case "uploadAudio": {
          subject.next(this.checkPermission(route, role, "collections_files_write"));
          break;
        }
        case "uploads": {
          subject.next(this.checkPermission(route, role, "collections_files_write"));
          break;
        }
        case QUESTION_MANAGEMENT_ACTION_ROUTE: {
          subject.next(this.checkPermission(route, role, "collections_questions_write"));
          break;
        }
        case QUESTION_MANAGEMENT_ADD_ROUTE: {
          subject.next(this.checkPermission(route, role, "collections_questions_write"));
          break;
        }
        case QUESTION_MANAGEMENT_INFO_ROUTE: {
          subject.next(this.checkPermission(route, role, "collections_questions_read"));
          break;
        }
        case QUESTION_MANAGEMENT_ROUTE: {
          subject.next(this.checkPermission(route, role, "collections_questions_read"));
          break;
        }
        case AUTH_MANAGEMENT_ROUTE_ROLES_PERMISSION: {
          subject.next(this.checkPermission(route, role, "collections_activities_write"));
          break;
        }
        case REFERENCE_DATA_ACTIVITY_TYPE_ROUTE: {
          subject.next(this.checkPermission(route, role, "document_activities_type_read"));
          break;
        }
        case AUTH_MANAGEMENT_ROUTE_ROLES_PERMISSION: {
          subject.next(this.checkPermission(route, role, "document_activities_type_write"));
          break;
        }
        case REFERENCE_DATA_QUESTION_TYPE_ROUTE: {
          subject.next(this.checkPermission(route, role, "document_question_type_read"));
          break;
        }
        case AUTH_MANAGEMENT_ROUTE_ROLES_PERMISSION: {
          subject.next(this.checkPermission(route, role, "document_question_type_read"));
          break;
        }
        case REFERENCE_DATA_ORGANIZATION_TYPE_ROUTE: {
          subject.next(this.checkPermission(route, role, "document_organization_type_read"));
          break;
        }
        case AUTH_MANAGEMENT_ROUTE_ROLES_PERMISSION: {
          subject.next(this.checkPermission(route, role, "document_organization_type_write"));
          break;
        }
        case REFERENCE_DATA_LANGUAGE_ROUTE: {
          subject.next(this.checkPermission(route, role, "document_languages_read"));
          break;
        }
        case AUTH_MANAGEMENT_ROUTE_ROLES_PERMISSION: {
          subject.next(this.checkPermission(route, role, "document_languages_write"));
          break;
        }
        case AUTH_MANAGEMENT_ROUTE_ROLES_PERMISSION: {
          subject.next(this.checkPermission(route, role, "document_school_type_write"));
          break;
        }
        case AUTH_MANAGEMENT_ROUTE_ROLES_PERMISSION: {
          subject.next(this.checkPermission(route, role, "collections_enrollments_read"));
          break;
        }
        case AUTH_MANAGEMENT_ROUTE_ROLES_PERMISSION: {
          subject.next(this.checkPermission(route, role, "collections_enrollments_write"));
          break;
        }
        case COURSE_FEEDBACK_ROUTE: {
          subject.next(this.checkPermission(route, role, "document_course_feedback_read"));
          break;
        }
        case USERS_COURSE_ROUTE: {
          subject.next(true); //todo add proper permission
          break;
        }
        case AUTH_MANAGEMENT_ROUTE_ROLES_COURSES: {
          subject.next(true); //todo add proper permission
          break;
        }
        case REFERENCE_DATA_QUESTION_LABEL_ROUTE: {
          subject.next(true); //todo add proper permission
          break;
        }
        case EVENT_MANAGEMENT_ROUTE: {
          subject.next(true); //todo add proper permission
          break;
        }
        case EVENT_MANAGEMENT_ADD_ROUTE: {
          subject.next(true); //todo add proper permission
          break;
        }
        case EVENT_MANAGEMENT_VIEW_ROUTE: {
          subject.next(true); //todo add proper permission
          break;
        }
        case EVENT_MANAGEMENT_EDIT_ROUTE: {
          subject.next(true); //todo add proper permission
          break;
        }
        default:
          this.notificationService.showErrorNotificationWithLogging("You are not authorized to perform this action", route.toUpperCase());
          subject.next(false);
      }
    });
    return subject.asObservable();

    /**
     * return boolean as logged users' claims has such permissions
     * @param claim1
     * @param claims
     * @param claim2
     */
  }

  checkPermission(path: string, role: Role, ...permissions: string[]): boolean {
    let haveAccess: boolean = false;
    //todo fix below permission check once backend permission checks are over
    permissions.forEach(permission => {
      if (role.allowedPermissions[permission] != null) {
        haveAccess = true;
      }
    });

    if (haveAccess === false) {
      this.notificationService.showErrorNotification("You are not authorized to perform this action");
    }

    return haveAccess;
  }

}
