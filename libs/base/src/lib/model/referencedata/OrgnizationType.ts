import {RefData} from "./RefData";
import {LocationType} from "./LocationType";

export class OrganizationType implements RefData {
  public description?: string;
  active: string;
  name: string;
  locations: LocationType[];

}
