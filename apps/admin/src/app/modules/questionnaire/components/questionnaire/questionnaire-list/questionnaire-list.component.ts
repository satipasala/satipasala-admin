import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PermissionsService, Questionnaire, SearchFilter } from "@satipasala/base";
import { QUESTIONNAIRE_MANAGEMENT_ADD_ROUTE } from "../../../../../app-routs";
import { ActivatedRoute, Router } from "@angular/router";
import { FilterGroup, OrderBy } from "../../../../../../../../../libs/base/src/lib/impl/FirebaseDataSource";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Subscription } from 'rxjs';
import { GlobalSearchService } from 'libs/base/src/lib/services/global-search.service';
import { SInfiniteScrollGrid } from 'libs/core/src/lib/infinite-scroll/infinite-scroll-grid/infinite-scroll-grid.component';

@Component({
  selector: 'admin-questionnaire-list',
  templateUrl: './questionnaire-list.component.html',
  styleUrls: ['./questionnaire-list.component.scss']
})
export class QuestionnaireListComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(SInfiniteScrollGrid, { static: true }) infiniteScroll: SInfiniteScrollGrid;

  searchFields: string[] = ['name'];
  collection: string = 'questionnaires';
  orderBy: OrderBy[] = [{ fieldPath: 'name', directionStr: 'asc' }];
  searchBy: SearchFilter[] = [];
  searchSubscription: Subscription;
  filterBy: FilterGroup[];
  rolePermission: Object;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private searchFilterService: GlobalSearchService, private permissionsService: PermissionsService) {
    this.permissionsService.isRoleAuthorized('collection_questionnaires').then(permission => {
      this.rolePermission = permission
      this.permissionsService.getQuestionnaireFilters('view').then(filters => {
        this.filterBy = filters;
      }).catch(err => console.error(err))
    }).catch(err => console.error(err))
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

  addNewQuestionnaire() {

    this.router.navigate([{
      outlets:
        { leftsidebar: [QUESTIONNAIRE_MANAGEMENT_ADD_ROUTE] }
    }],
      { relativeTo: this.activatedRoute.parent });
  }


  editQuestionnaire(questionnaire: Questionnaire) {
    this.router.navigate([{
      outlets:
        { leftsidebar: ["edit", questionnaire.id] }
    }],
      { relativeTo: this.activatedRoute.parent });
  }

  viewQuestionnaire(questionnaire: Questionnaire) {

    this.router.navigate([{
      outlets:
        { leftsidebar: ["info", questionnaire.id] }
    }],
      { relativeTo: this.activatedRoute.parent });
  }

  getLength(questions) {
    return Object.keys(questions).length;
  }
}
