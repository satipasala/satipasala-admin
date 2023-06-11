import {QuestionType} from "./referencedata/QuestionType";
import {FormField} from "./fields/FormField";
import {QuestionLabel} from "./referencedata/QuestionLabel";
import {Chip} from "./Chip";

export interface ScoringMechanism {
  id: string;
  name: string;
  description: string;
  type: "SCALE" | "REVERSE_SCALE"
}


export interface Question<VALUE_TYPE> extends FormField<VALUE_TYPE> {
  description?: string
  questionType: QuestionType;
  labels: QuestionLabel[];
  scoringMechanism: ScoringMechanism
  questionLevel: QuestionLevel;
}

export interface QuestionLevel extends Chip {
  description: string;
}
