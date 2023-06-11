import {Validator} from "./Validator";
import {FireArrayField} from "./FireArrayField"
import {ChipList} from "../ChipList";
import {Option} from "./Option";
import {FormFieldType} from "../Types";

export interface FormField<T> {
  id:string
  order: number;
  type: FormFieldType;
  name: string;
  label: string;
  disabled: boolean;
  value: T,
  hint?: string;
  validators?: FireArrayField<Validator>;
  formChipList?: ChipList;
  icon?: string;
  options?: Array<Option<T>>;
  checked?: boolean;
  indeterminate?: boolean;
  labelPosition?: string;
}
