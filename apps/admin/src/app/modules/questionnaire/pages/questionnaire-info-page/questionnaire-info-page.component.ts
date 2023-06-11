import { Component, OnInit } from '@angular/core';
import { Questionnaire } from "@satipasala/base";
import { BaseQuestionnairePage } from "../base-questionnaire-page";
import { ActivatedRoute, Router } from "@angular/router";
import { QuestionnaireService } from "@satipasala/base";

@Component({
  selector: 'admin-questionnaire-info-page',
  templateUrl: './questionnaire-info-page.component.html',
  styleUrls: ['./questionnaire-info-page.component.scss']
})
export class QuestionnaireInfoPage extends BaseQuestionnairePage {
  constructor(protected router: Router, protected route: ActivatedRoute,
    protected questionnaireService: QuestionnaireService) {
    super(router, route, questionnaireService);
  }


  onQuestionnaireFetch(questionnaire: Questionnaire) {
  }

}
