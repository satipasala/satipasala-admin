import { Host } from "./Host";
import { User } from './User';
import { AddressInfo } from './AddressInfo';
import { ParticipationInfo } from './Participation';
import { Program } from './Course';
import { EventCategory } from './referencedata/EventCategory';
import { MediaFiles } from "./Resources";
import { Timestamp } from '@firebase/firestore-types';


export interface Event {
  id: string;
  name: string;
  disabled: boolean | false;
  imgUrls?: string[];
  startDate: Timestamp | Date | string;
  endDate?: Timestamp | Date | string;
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
  tempFacilitators?: Object; //temp selection
  tempParticipation?: Object;
  host: Host;
  program: Program;
  createdDate: string;
  mediaFiles?: MediaFiles
}


