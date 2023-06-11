import {RefData} from "./RefData";
import {Country} from "./Country";

export class State implements StateInfo,RefData {
  id: string;
  name: string;
  shortName: string;
  country: Country;
  active: string;
  description: string;
}

export interface StateInfo {
  id: string;
  name: string;
  shortName: string;
  description: string;
}
