
import {LandType} from "./Types";
import {State} from "../referencedata/State";

export interface Province extends ProvinceInfo{
  locationCount?:number;
  districts:State[];
}

export interface ProvinceInfo {
  id:string;
  name:string;
  type:LandType;
}
