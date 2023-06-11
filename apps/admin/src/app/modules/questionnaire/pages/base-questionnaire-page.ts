import {Directive, OnInit} from "@angular/core";
import {Questionnaire} from "@satipasala/base";
import {QUESTIONNAIRE_MANAGEMENT_EDIT_ROUTE} from "../../../app-routs";
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionnaireService} from "@satipasala/base";
@Directive()
export abstract class BaseQuestionnairePage implements OnInit {
  questionnaire: Questionnaire;

  protected constructor(protected router: Router, protected route: ActivatedRoute,
                        protected questionnaireService: QuestionnaireService) {

  }

  gotoQuestionnairesPage() {
    this.router.navigate([QUESTIONNAIRE_MANAGEMENT_EDIT_ROUTE]);
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.questionnaireId) {
       let questionnaireId = params.questionnaireId;
        this.questionnaireService.get(questionnaireId).subscribe(questionnaireDoc => {
          this.questionnaire = questionnaireDoc;
          this.onQuestionnaireFetch(this.questionnaire);
        },reason => console.error(reason))
      } else {
        this.onQuestionnaireFetch(null);
      }
    });
  }

  abstract onQuestionnaireFetch(questionnaire:Questionnaire);

}
