import {RefData} from "./RefData";

export interface QuestionLabel extends RefData {
  label?: string;
  type?: string;
  category?: string;
}
