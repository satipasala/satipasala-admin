import {DragDropListItem} from "./DragDropListItem";
import {FireArrayField} from "./fields/FireArrayField";

export interface DragDropList<T extends DragDropListItem> {
  id:string;
  name:string;
  cols:number;
  rows:number;
  color:string;
  list:FireArrayField<T>;
}

