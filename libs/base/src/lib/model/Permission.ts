import {RefData} from "./referencedata/RefData";


export class Permission implements RefData{
  id:string;
  name:string;
  description:string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  types?: any | null;
  disabled:boolean;
  edit:boolean;
  view:boolean;
  active: string;
}
