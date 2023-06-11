
import {Question} from "./Question";

export interface Questionnaire {
  /*type:QuestionnaireType;*/
  name: string;
  id:string;
  questions: Object;//Question type
  questionsIdArray:string[];
  occurence?:number;
}


export enum QuestionnaireType {
  AGGRIGATED,
  INDIVIDUAL

}
