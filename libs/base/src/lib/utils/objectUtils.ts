import {User, UserInfo} from "../model/User";
import {Occurrence} from "../model/Occurrence";
import {Course, CourseInfo} from "../model/Course";
import {Host, HostInfo} from "../model/Host";
import {Location, LocationInfo} from "../model/Location"; 
import firebase from "firebase/compat/app";
import { Timestamp } from '@firebase/firestore-types'; 
export class ObjectUtils {

  static mapFromArray(array: any[], key): Object {
    return Object.assign({}, ...array.map(s => ({[s[key]]: s})));
  }

  static reduceProperties(source, destination) {
    for (const prop in destination) {
      if (source[prop] && destination.hasOwnProperty(prop)) {
        if (typeof destination[prop] == 'function') {
          destination[prop] = destination[prop](source[prop])
        } else {
          destination[prop] = source[prop];
        }
      }
    }

    return destination;
  }


  static getCourseSubscriptionKey(user: UserInfo, course: Course) {
    return user.id + "_" + course.id
  }

  static getFeedbackKey(user: UserInfo, course: Course, occurrence: Occurrence) {
    return user.id + "_" + course.id + "_" + occurrence.number;
  }

  static getLocationId(location: Location, host: Host): string {
    return host.id + "_" + location.locationType.name + "_" + location.name;
  }

  static extractUserInfo(user: User): UserInfo {
    let userInfo = <UserInfo>{
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
      organizationInfo: null
    }

    // @ts-ignore
    userInfo.organizationInfo = host => ObjectUtils.extractHostInfo(host)
    return ObjectUtils.reduceProperties(user, userInfo);
  }

  static extractCourseInfo(course: Course): CourseInfo {
    return ObjectUtils.reduceProperties(course, <CourseInfo>{
      id: null,
      name: null,
      description: null,
      startDate: null,
      endDate: null,
      createdAt: null,
      updatedAt: null,
      status: "notstarted",
      mandatory: null,
      mediaFiles:null
    });
  }


  static extractHostInfo(host: Host): HostInfo {
    // @ts-ignore
    return ObjectUtils.reduceProperties(host, <HostInfo>{
      id: null,
      name: null,
      description: null,
      disabled: false,
      type: (type) => {
        return {name: type.name}
      },
      mediaFiles:null
    });
  }

  static extractLocationInfo(location: Location): LocationInfo {
    return ObjectUtils.reduceProperties(location, <LocationInfo>{
      id: null,
      hostId: null,
      hostName: null,
      name: null,
      description: null,
      mediaFiles:null
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

  static convertFirebaseTimestamp(timestampObj) {
    if(!timestampObj){
      return;
    }
    const seconds = timestampObj.seconds;
    const nanoseconds = timestampObj.nanoseconds;
  
    const milliseconds = seconds * 1000 + nanoseconds / 1000000;
    const date = new Date(milliseconds);
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    const dateString = `${year}-${month}-${day}`;
    return dateString;
  }

  static getTimeStamp(dateString: Object): Timestamp | null {
    if (!dateString || !Date.parse(dateString.toString())) {
      return null;
    }
    
    const date = new Date(dateString.toString());
    return firebase.firestore.Timestamp.fromDate(date);
  } 

}
