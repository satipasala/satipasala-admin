
import {LocationInfo} from "./Location";
import {AddressInfo} from "./AddressInfo";
import {HostInfo} from "./Host";
import {Role} from "./Role";
import firebase from "firebase/compat/app";
import {RitchMedia} from "./Resources";

export interface User extends UserInfo {
  _organizationsInfo?: String[];//For queries; https://stackoverflow.com/questions/54081799/firestore-to-query-by-an-arrays-field-value
  preferredMedium?: string | null;
  disabled: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
  courseSubscriptions?: Object; //object key Course.id . but in courseSubsciption collection //object key is CourseSubscription.userInfo.uid+"_"+CourseSubscription.course.id
  programSubscriptions?: Object; //object key Course.id . but in programSubscriptions collection //object key is programSubscriptions.userInfo.uid+"_"+programSubscriptions.program.id
  description: string;
  userRole?:Role;
  addressInfo?: AddressInfo;
}


export interface UserInfo extends firebase.UserInfo, RitchMedia { //FirebaseUsr represents user account
  id: string;
  userName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  dob?: string | null;
  nic?: string | null;
  userRoleId: string;
  organizationInfo?: HostInfo;
  locationInfo?:LocationInfo;
}

