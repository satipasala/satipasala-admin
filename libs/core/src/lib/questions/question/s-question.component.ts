import {Component, OnInit} from '@angular/core';
import {FireArrayField} from "../../../../../base/src/lib/model/fields/FireArrayField";
import {Validator} from "@angular/forms";
import {Question} from "../../../../../base/src/lib/model/Question";

@Component({
  selector: 's-question',
  templateUrl: './s-question.component.html',
  styleUrls: ['./s-question.component.scss']
})
export class SQuestionComponent implements OnInit {

  question: Question<any> = <Question<any>>{}

  constructor() {
  }

  ngOnInit() {
  }

  //appearance change based on question type
  setQuestionType() {

  }

}

