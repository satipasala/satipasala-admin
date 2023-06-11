import { Host } from "./Host";
import { User } from './User';
import { AddressInfo } from './AddressInfo';
import { ParticipationInfo } from './Participation';
import {Course, Program} from './Course';
import { EventCategory } from './referencedata/EventCategory';
import {MediaFiles} from "./Resources";

export interface Event {
  id: string;
  name: string;
  disabled: boolean | false;
  imgUrls?: string[];
  startDate: Date;
  endDate?: Date | null;
  startTime?: string;
  endTime?: string | null;
  description?: string | null;
  type: string;
  category: EventCategory;
  coordinatorInfo: User;
  phoneNumber?: string;
  addressInfo: AddressInfo;
  participants: ParticipationInfo;
  participation?: Object; //UserInfo map key by user_id
  facilitators?: Object;
  tempFacilitators?:Object; //temp selection
  tempParticipation?:Object;
  host: Host;
  program:Program;
  createdDate:string;
  mediaFiles?:MediaFiles
}


