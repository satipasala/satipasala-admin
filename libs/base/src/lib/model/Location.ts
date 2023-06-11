
import { Course } from "./Course";
import { User, UserInfo } from "./User";
import {LocationType} from "./referencedata/LocationType";
import {MediaFiles, RitchMedia} from "./Resources";

//for de normalizing purpose
export interface LocationInfo extends RitchMedia{
  id: string //Identifier Field Should be the same as document identifier - Indexed",
  hostId: string //Host that this location belongs to
  hostName: string;
  name: string // Short name for the location as a quick reference ex:(BMICH,6A,) - Indexed",
  description: string //detailed information or details about the location - Not Indexed",
}

export interface Location extends LocationInfo {
  // parentLocation:string //: document Id of the parent location - Indexed",
  locationType: LocationType //: Location type ex:(Ministry,School,ClassRoom,PublicVenue,) - Indexed",
  createdAt: Date//:Created Datetime in UTC format - Indexed",
  updatedAt: Date//:Last updated Datetime in UTC format - Indexed"}
  courses?: Course[];
  teachers?: UserInfo[];
  isDisabled: boolean;
}


