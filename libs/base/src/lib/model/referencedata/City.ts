import {RefData} from "./RefData";
import {Country} from "./Country";
import {State} from "./State";
import {GeoLocation} from "./GeoLocation";

export class City implements CityInfo,RefData {
  id: string;
  active: string;
  name: string;
  geoLocation: GeoLocation;
  state: State;
  country: Country;
  description: string;
}

export interface CityInfo {
  id: string;
  name: string;
  geoLocation: GeoLocation;
  description: string;
}
