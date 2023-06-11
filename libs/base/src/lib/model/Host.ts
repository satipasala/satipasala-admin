import {Course} from "./Course";
import {User} from "./User";
import {Language} from "./referencedata/Language";
import {LocationType} from "./referencedata/LocationType";
import {OrganizationType} from "./referencedata/OrgnizationType";
import {AddressInfo} from "./AddressInfo";
import {MediaFiles, RitchMedia} from "./Resources";


//for de normalizing purpose
export interface HostInfo extends RitchMedia{
  id: string;
  name: string;
  description: string;
  disabled: boolean;
  type: OrganizationType;
}

export interface Host extends HostInfo {
  locations: Object;
  locationTypes: LocationType[]
  medium: Language;
  phone_number: string;
  business_reg_no: string;
  website: string;
  email: string;

  // Person In Charge
  personInChargeName?: string;
  personInChargeDesignation?: string;
  personInChargePhone?: string;
  personInChargeEmail?: string;
  // Primary coordinator
  coordinator1Name?: string;
  coordinator1Designation?: string;
  coordinator1Phone?: string;
  coordinator1Email?: string;
  // Secondary coordinator
  coordinator2Name?: string;
  coordinator2Designation?: string;
  coordinator2Phone?: string;
  coordinator2Email?: string;

  addressInfo: AddressInfo;

  courses?: Course[];
  teachers?: User[];
}



