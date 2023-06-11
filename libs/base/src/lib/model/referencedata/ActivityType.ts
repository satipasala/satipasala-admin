import {RefData} from "./RefData";

export class ActivityType implements RefData {
  public description?: string;
  active: string;
  name: string;
  contentType:{type:string,name:string};
  tags:any[];

}
