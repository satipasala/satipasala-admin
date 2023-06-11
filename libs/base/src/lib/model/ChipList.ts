import {Chip} from "./Chip";
import {FireArrayField} from "./fields/FireArrayField";

export interface ChipList extends FireArrayField<Chip>{

  stacked:boolean;
}
