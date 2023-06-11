import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalSearchService, OrderBy, SearchFilter} from "@satipasala/base";
import {Subscription} from "rxjs";

@Component({
  selector: 'admin-audit-log-page',
  templateUrl: './audit-log-page.component.html',
  styleUrls: ['./audit-log-page.component.scss']
})
export class AuditLogPage implements OnInit, OnDestroy {
  searchBy: SearchFilter[] = [];
  orderBy: OrderBy[] = [{fieldPath: 'context.timestamp', directionStr: 'asc'}];
  searchSubscription: Subscription;
  searchFields: string[] = ['context.params.id', 'context.params.collection'];

  constructor(private searchFilterService: GlobalSearchService) {
  }

  ngOnInit() {
    this.searchSubscription = this.searchFilterService.connect(this.searchFields, filters => {
      this.searchBy = filters
    }, error => alert(error));
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

}
