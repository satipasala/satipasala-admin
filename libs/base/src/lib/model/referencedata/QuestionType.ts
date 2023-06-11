import {RefData} from "./RefData";
import {AnswerType} from "../Types";
import {FormField} from "../fields/FormField";

export interface QuestionType extends RefData , FormField<any>{
    id: string;
    label: string;
    fieldType: string;
    answerType: AnswerType
}
