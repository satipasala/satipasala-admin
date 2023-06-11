import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {
  QUESTIONNAIRE_MANAGEMENT_ROUTE,
} from "../../../../../app-routs";
import {Questionnaire} from "@satipasala/base";

@Component({
  selector: 'admin-questionnaire-sub-menu',
  templateUrl: './questionnaire-sub-menu.component.html',
  styleUrls: ['./questionnaire-sub-menu.component.css']
})
export class QuestionnaireSubMenuComponent implements OnInit {
  @Input() questionnaire: Questionnaire;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
  }

  editQuestionnaire() {
    this.router.navigate([{
        outlets:
          {leftsidebar: ["edit", this.questionnaire.id]}
      }],
      {relativeTo: this.activatedRoute.parent});
  }

  viewQuestionnaire() {

    this.router.navigate([{
        outlets:
          {leftsidebar: ["info", this.questionnaire.id]}
      }],
      {relativeTo: this.activatedRoute.parent});
  }
}
