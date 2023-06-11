
import {LocationInfo} from "./Location";
import {HostInfo} from "./Host";
import {UserInfo} from "./User";
import {Course} from "./Course";

export interface CourseSubscription{
  id:string
  userInfo: UserInfo;
  teacherInfo?:UserInfo;
  locationInfo?:LocationInfo,
  hostInfo:HostInfo,
  course: Course;
}

