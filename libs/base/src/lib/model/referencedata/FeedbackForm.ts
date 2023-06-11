import {RefData} from "./RefData";

export interface FeedbackForm extends RefData {
  id?: string;
  name: string;
  description?: string;
}
