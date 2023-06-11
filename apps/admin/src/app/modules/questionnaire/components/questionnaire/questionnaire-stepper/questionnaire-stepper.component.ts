import {Component, Input, OnInit} from '@angular/core';
import {Questionnaire} from "@satipasala/base";

@Component({
  selector: 'admin-questionnaire-stepper',
  templateUrl: './questionnaire-stepper.component.html',
  styleUrls: ['./questionnaire-stepper.component.scss']
})
export class QuestionnaireStepperComponent implements OnInit {

  get questionnaire(): Questionnaire {
    return this._questionnaire;
  }

  @Input()
  set questionnaire(value: Questionnaire) {
    this._questionnaire = value;
    if(value){
      length = Object.keys(this._questionnaire.questions).length;
    }
  }

  private _questionnaire:Questionnaire;

  @Input() mode: 'preview' | 'submit' = 'preview';

  length:number;

  ngOnInit(): void {
  }

}
