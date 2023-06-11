
import { Questionnaire } from "./Questionnaire";
import { Location } from "./Location";
import { Host } from "./Host";
import { Activity } from "./Activity";
import { UserInfo } from './User';
import {MediaFiles, RitchMedia} from "./Resources";
//program is  a collection of courses.
export interface Program extends CourseInfo{
  courses:Object; //course map-
  questionnaire: Questionnaire;
  numberOfFeedback: number;
  facilitatorsCount: number;
  tempCourses?:Object;
}

export interface Course extends CourseInfo {

  facilitatorsCount: number;
  numberOfFeedback: number;
  activities: Object;
  questionnaire: Questionnaire;
  location?: Location;
  organization?: Host;
  teacherInfo?: UserInfo | null;
  tempActivities?:Object
}

export interface CourseInfo extends RitchMedia{
  id: string
  name: string
  description: string
  endDate?: string
  createdAt?: Date
  updatedAt?: Date;
  status: "started" | "completed" | "notstarted" | "rejected";
  feedbacks?: Object; //object key is user.uid+"_"+course.id+"_"+occurrence.number;
  mandatory: boolean;
  active?:string;
}
