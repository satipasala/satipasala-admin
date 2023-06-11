import {Component, OnInit} from '@angular/core';
import {
  NavigationService,
  NotificationService,
} from "@satipasala/base";
import {StatsService} from "@satipasala/base";

@Component({
  selector: 'admin-overview',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit {
  userCount: any;
  hostCount: any;
  questionnaireCount: any;
  courseCount: any;

  constructor(private statsService:StatsService,
              private navigationService: NavigationService,
              private notificationService:NotificationService) {
  }

  ngOnInit() {
    this.statsService.getDocumentCount().subscribe(documentCount => {
      this.userCount = documentCount.users;
      this.hostCount = documentCount.hosts;
      this.questionnaireCount = documentCount.questionnaires;
      this.courseCount = documentCount.courses;
    },error => this.notificationService.showErrorNotification("Error getting document count"));
  }

  userView() {
    this.navigationService.navigate("User Management");
  }

  hostView() {
    this.navigationService.navigate("Organization Management");
  }

  questionView() {
    this.navigationService.navigate("Questionnaire Management");
  }

  courseView() {
    this.navigationService.navigate("Program Management");
  }
}
