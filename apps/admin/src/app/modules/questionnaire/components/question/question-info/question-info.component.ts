import {Component, Input, OnInit} from '@angular/core';
import {Question} from "@satipasala/base";
import {ActivatedRoute} from "@angular/router";
import {QuestionsService} from "@satipasala/base";
import {Location} from '@angular/common';

@Component({
  selector: 'admin-question-info',
  templateUrl: './question-info.component.html',
  styleUrls: ['./question-info.component.scss']
})
export class QuestionInfoComponent implements OnInit {
  @Input() question:Question<any>;
  questionId:string;

  constructor(private route: ActivatedRoute, private questionsService:QuestionsService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.questionId) {
        this.questionId = params.questionId;
        if (this.questionId != null) {
          this.questionsService.get(this.questionId).subscribe(question => {
            this.question = question;
          });
        }
      }
    });
  }

}
