import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NotificationService, PermissionsService, Question, SearchFilter} from "@satipasala/base";
import {ActivatedRoute, Router} from "@angular/router";
import {QUESTION_MANAGEMENT_ROUTE, QUESTIONNAIRE_MANAGEMENT_ADD_ROUTE} from "../../../../../app-routs";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FilterGroup, OrderBy} from "../../../../../../../../../libs/base/src/lib/impl/FirebaseDataSource";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subscription} from 'rxjs';
import {GlobalSearchService} from 'libs/base/src/lib/services/global-search.service';
import {SInfiniteScrollGrid} from 'libs/core/src/lib/infinite-scroll/infinite-scroll-grid/infinite-scroll-grid.component';
import {MatDialog} from '@angular/material/dialog';
import {QuestionStatusChangeDialog} from './question-status-change-dialog/question-status-change-dialog.component';

@Component({
  selector: 'admin-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class QuestionsListComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(SInfiniteScrollGrid, {static: true}) infiniteScroll: SInfiniteScrollGrid;

  searchFields: string[] = ['label', 'questionType.id'];
  collection: string = 'questions';
  orderBy: OrderBy[] = [{fieldPath: 'questionType.answerType', directionStr: 'asc'}];
  searchBy: SearchFilter[] = [];
  searchSubscription: Subscription;
  filterBy: FilterGroup[];
  rolePermission: Object;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private searchFilterService: GlobalSearchService, private permissionsService: PermissionsService, private notificationService: NotificationService, public dialog: MatDialog) {
    this.permissionsService.isRoleAuthorized('collection_questionnaires').then(permission => {
      this.rolePermission = permission
      this.permissionsService.getQuestionFilters('view').then(filters => {
        this.filterBy = filters;
      }).catch(reason => console.error('Insufficient permission to retrieve question. Error => %s', reason))
    }).catch(err => console.error(err));
  }

  ngOnInit() {
    this.searchSubscription = this.searchFilterService.connect(this.searchFields, filters => {
      this.searchBy = filters
    }, error => alert(error));
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }


  addNewQuestion() {
    this.router.navigate([{
        outlets:
          {leftsidebar: [QUESTION_MANAGEMENT_ROUTE, QUESTIONNAIRE_MANAGEMENT_ADD_ROUTE]}
      }],
      {relativeTo: this.activatedRoute.parent});
  }


  editQuestion(question: Question<any>) {
    this.router.navigate([{
        outlets:
          {leftsidebar: [QUESTION_MANAGEMENT_ROUTE, question.id, "edit"]}
      }],
      {relativeTo: this.activatedRoute.parent});
  }

  viewQuestion(question: Question<any>) {
    this.router.navigate([{
        outlets:
          {leftsidebar: [QUESTION_MANAGEMENT_ROUTE, question.id]}
      }],
      {relativeTo: this.activatedRoute.parent});
  }

  openDialog(question: Question<any>, status: boolean): void {
    const dialogRef = this.dialog.open(QuestionStatusChangeDialog, {
      width: '350px',
      height: '25%',
      data: {selectedQuestion: question, selecteQuestionStatus: status}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notificationService.showSuccessNotification("Question state updated successfully");
      }
      if (result == false) {
        this.notificationService.showErrorNotification("Question state update failed");
      }
    });
  }
}
