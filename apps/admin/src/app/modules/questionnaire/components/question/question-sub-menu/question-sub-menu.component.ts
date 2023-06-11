import {Component, Input, OnInit} from '@angular/core';
import {QUESTION_MANAGEMENT_ROUTE} from "../../../../../app-routs";
import {ActivatedRoute, Router} from "@angular/router";
import {Question} from "@satipasala/base";

@Component({
  selector: 'admin-question-sub-menu',
  templateUrl: './question-sub-menu.component.html',
  styleUrls: ['./question-sub-menu.component.scss']
})
export class QuestionSubMenuComponent implements OnInit {
  @Input() question: Question<any>;
  constructor(private router: Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
  }


  editQuestion() {
    this.router.navigate([{
        outlets:
          {leftsidebar: [QUESTION_MANAGEMENT_ROUTE,this.question.id, "edit"]}
      }],
      {relativeTo: this.activatedRoute.parent});
  }

  viewQuestion() {
    this.router.navigate([{
        outlets:
          {leftsidebar: [QUESTION_MANAGEMENT_ROUTE,this.question.id]}
      }],
      {relativeTo: this.activatedRoute.parent});
  }

}
