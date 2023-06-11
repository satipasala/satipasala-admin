import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Question, Questionnaire } from "@satipasala/base";

@Component({
  selector: 's-questionnaire-form',
  templateUrl: './s-questionnaire-form.component.html',
  styleUrls: ['./s-questionnaire-form.component.scss']
})
export class SQuestionnaireForm implements OnInit {
  @Output()
  onSubmit: EventEmitter<any> = new EventEmitter();

  @Input()
  disableSubmit: boolean;

  @Input()
  set form(form: FormGroup) {
    this._form = form;
  }

  get form() {
    if (this._form) {
      return this._form;
    } else {
      this._form = new FormGroup({})
    }
  }
  private _form: FormGroup;

  @Input()
  mode: 'preview' | 'submit' = 'preview';

  questions: Question<any>[];
  private _questionnaire: Questionnaire;

  constructor(private fb: FormBuilder) {
  }

  @Input()
  set questionnaire(value: Questionnaire) {
    this._questionnaire = value;
    if (this._questionnaire) {
      this.questions = Object.values(this._questionnaire.questions)
    } else {
      this.questions = [];
    }
  }

  get questionnaire(): Questionnaire {
    return this._questionnaire;
  }

  ngOnInit() {
  }

}
