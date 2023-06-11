import { Component, Input, OnInit } from '@angular/core';
import { Course, Question, Questionnaire, Role } from "@satipasala/base";
import { FormArray, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'admin-questionnaire-question-card',
  templateUrl: './questionnaire-question-card.component.html',
  styleUrls: ['./questionnaire-question-card.component.scss']
})
export class QuestionnaireQuestionCard implements OnInit {

  @Input()
  set question(question: Question<any>) {
    if(question){
      this._question = question;
      this.courseForm.patchValue({
        question: this.question,
        isAdded: this.isQuestionAssigned()
      });
    }
  }

  get question(): Question<any>{
    return this._question;
  }

  private _question: Question<any>;

  @Input()
  formGroup: FormGroup;

  private _questionnaire: Questionnaire;
  courseForm: FormGroup;

  constructor() {
    this.courseForm = new FormGroup({
      question: new FormControl(),
      isAdded: new FormControl()
    });
  }

  @Input()
  set questionnaire(value: Questionnaire) {
    this._questionnaire = value;
  }

  get questionnaire(): Questionnaire {
    return this._questionnaire;
  }

  ngOnInit(): void {
    (this.formGroup.controls['items'] as FormArray).push(this.courseForm);
  }

  isQuestionAssigned(): boolean {
    if (this._questionnaire.questions) {
      return this._questionnaire.questions[this.question.id] !== undefined;
    }
    return false;
  }


}
