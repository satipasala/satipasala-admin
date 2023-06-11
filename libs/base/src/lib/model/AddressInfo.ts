import {City, CityInfo} from "./referencedata/City";
import {State} from "./referencedata/State";
import {ProvinceInfo} from "./country/Province";
import {Country} from "./referencedata/Country";

export interface AddressInfo {
  street?: string | null;
  city?: City |null;
  state?: State | null;
  province?: ProvinceInfo | null;
  country?: Country | null;
}
