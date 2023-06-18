import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  NavigationService,
  NotificationService,
} from "@satipasala/base";
import {StatsService} from "@satipasala/base";
import { Subscription } from 'rxjs';

@Component({
  selector: 'admin-overview',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit,OnDestroy {
  userCount: any;
  hostCount: any;
  questionnaireCount: any;
  courseCount: any;
  statsSubscription:Subscription;

  constructor(private statsService:StatsService,
              private navigationService: NavigationService,
              private notificationService:NotificationService) {
  }

  ngOnInit() {
    this.statsSubscription = this.statsService.getDocumentCount().subscribe(documentCount => {
      this.userCount = documentCount.users;
      this.hostCount = documentCount.hosts;
      this.questionnaireCount = documentCount.questionnaires;
      this.courseCount = documentCount.courses;
    },error => this.notificationService.showErrorNotification("Error getting document count"));
  }

  ngOnDestroy(): void {
      this.statsSubscription.unsubscribe();
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
