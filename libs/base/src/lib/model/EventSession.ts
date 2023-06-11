import {Course, User} from "@satipasala/base";
import {Program} from "./Course";
import {UserInfo} from "./User";
import {MediaFiles} from "./Resources";

export interface EventSession {
  id: string
  eventId: string;
  name: string;
  description?: string | null;
  facilitators?:  Object,
  participation?: Object; //UserInfo map key by user_id
  tempFacilitators?:Object; //temp selection
  tempParticipation?:Object;
  startDate: string;
  endDate?: string | null;
  startTime?: any;
  endTime?: any | null;
  status: EventSessionStatus; //'not_started'|'started'|'completed';
  coordinatorInfo: User;
  program: Program;
  imgUrls?: string[];
  mediaFiles?:MediaFiles
}

export interface Subscription {
  status:UserCompletionStatus;
  user:UserInfo;
}

export interface EventSessionStatus {
  value: string; //'not_started'|'started'|'completed';
  name: string;
}

export interface UserCompletionStatus {
  value: string; //'not_started'|'started'|'completed';
  name: string;
}

export const SESSION_NOT_STARTED = {name: "Not Started", value: 'not_started'};
export const SESSION_STARTED = {name: "Started", value: 'started'};
export const SESSION_COMPLETED = {name: 'Completed', value: 'completed'};

export const USER_NOT_STARTED = {name: "Not Started", value: 'not_started'};
export const USER_STARTED = {name: "Started", value: 'started'};
export const USER_COMPLETED = {name: 'Completed', value: 'completed'};
