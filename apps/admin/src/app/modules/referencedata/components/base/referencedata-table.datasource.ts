import {AfterViewInit, ChangeDetectorRef, Directive, OnDestroy} from "@angular/core";
import {FirebaseDataSource, RefDataType, ReferenceDataService} from "@satipasala/base";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Subscription} from "rxjs";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {RefData} from "../../../../../../../../libs/base/src/lib/model/referencedata/RefData";
@Directive()
export class ReferenceDataTableDatasource<T extends RefData> extends FirebaseDataSource<T> implements AfterViewInit, OnDestroy {
  private paginator: MatPaginator;
  private sort: MatSort;
  private refDataSubscription: Subscription;

  constructor(paginator: MatPaginator, sort: MatSort, fireStore: AngularFirestore, private dataType: RefDataType, private referenceDataService: ReferenceDataService, private cdr: ChangeDetectorRef) {
    super(paginator, sort, referenceDataService);
    this.paginator = paginator;
    this.sort = sort;
  }

  loadMore(event: PageEvent) {
    console.log("Not implemented!"); //TODO implement pagination
    return;
    // this.queryData(query => query.orderBy("name").startAt(event.pageIndex).limit(event.pageSize), {
    //   documentId: this.locale,
    //   subCollection: 'activityTypes'
    // });
  }

  fetchData(): void {
    this.refDataSubscription = this.referenceDataService.getData<T>(this.dataType, false).subscribe(refDataArray => {
      this.dataSubject.next(refDataArray);
      this.cdr.detectChanges();
    });
  }

  nextBatch() {
    this.fetchData();
  }

  ngOnDestroy() {
    this.refDataSubscription.unsubscribe();
  }


}
