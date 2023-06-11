
import { Occurrence } from "./Occurrence";
import { UserInfo } from "./User";
import { CourseInfo } from "./Course";
import { Questionnaire } from "./Questionnaire";

export interface Feedback {
  id?: string | null;
  subscriptionId: string;
  courseInfo: CourseInfo;
  userInfo: UserInfo;
  teacherInfo?: UserInfo | null;
  isMandatory?: boolean | null;
  feedback: Questionnaire;
  occurrence: Occurrence;
  updatedAt?: string;
  year:number;
}



