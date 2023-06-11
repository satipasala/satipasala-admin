import {RefData} from "./referencedata/RefData";

export class RoleLevel implements RefData{
  id:string;
  name:string;
  access_level:number;
  description?:string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  active: string;
}
