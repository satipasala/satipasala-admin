import {DataSource} from "@angular/cdk/table";
import {interval, merge, Observable, Subject} from 'rxjs';
import {AngularFirestoreCollection, Query, QueryFn} from "@angular/fire/compat/firestore";
import {AfterViewInit, Directive} from "@angular/core";
import {CollectionService, SubCollectionInfo} from "./CollectionService";
import {SDataSource} from "./SDataSource";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {debounceTime, mergeAll, take, throttle} from "rxjs/operators";
import {SearchFilter} from "../model/SearchFilter";

/**
 * Data source for the HostInfoComponent view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
@Directive()
export class FirebaseDataSource<T> extends DataSource<T> implements AfterViewInit, SDataSource<T> {
  data: AngularFirestoreCollection<T>;
  total = 100;//todo add total calculation to each collection in functions
  lastObj: T;
  dataSubject: Subject<T[]> = new Subject<T[]>();
  collectionService: CollectionService<any>;
  //collection filters
  filterGroups: FilterGroup[] = [];
  searchFilters: SearchFilter[] = [];
  filterChangeSubject: Subject<boolean> = new Subject<boolean>(); //indicate when to fetch data
  orderBy: OrderBy[] = [];
  batchSize:number = 20;


  private dataRquestSubject:Subject<any> = new Subject();

  public constructor(protected matPaginator: MatPaginator, protected matSort: MatSort, protected colService: CollectionService<any>) {
    super();
    this.collectionService = colService;
    // wait for 1000 ms to send requests to server. avaoids unwanted server load
    this.dataRquestSubject.pipe( debounceTime(1000)).subscribe(value => {
      console.log("request recieved value")
      this._requestData(value.query,...value.subCollectionPaths);
    });
    this.filterChangeSubject.subscribe(value => {
      this.fetchData();
    })

  }

  public reachedEnd(): boolean {
    return this.collectionService.reachedEnd;
  }

  /**
   * query data of a sub collection by giving documentId and sub collection name. this should never
   * be called directly in order to reduce number of server calls.
   * @param query function that receives query object
   * @param subCollectionPaths [{documentId: 'course1', subCollection:'activities'}]
   */
  private _requestData(query: (value: Query) => Query, ...subCollectionPaths: SubCollectionInfo[]){
    const observableList: Subject<any>[] = [];

    if (this.searchFilters.length > 0) {

      this.searchFilters.forEach(searchFilter => {
        if (this.filterGroups.length > 0) {
          this.queryBySearchFiltersAndFilterGroup(observableList, query, searchFilter, ...subCollectionPaths);
        } else {
          this.queryBySearchFilters(observableList, query, searchFilter, ...subCollectionPaths);
        }
      });
      //merge all observables in to single observable and remove duplicated
    } else if (this.filterGroups.length > 0) {
      this.queryByFilterGroup(observableList, query, ...subCollectionPaths);
    } else {
      const queryFnc: QueryFn = ref => query(this.addOrderByClauses(ref));
      observableList.push(this.collectionService.querySubCollection(queryFnc, ...subCollectionPaths));
    }

    //todo remove duplicates
    merge(observableList).pipe(mergeAll()).subscribe(
      document => {
        this.dataSubject.next(document);
      });
  }


  /**
   * query data method sends the query to data subject .
   * equests are throttled and last request will be sent to the server
   * @param query
   * @param subCollectionPaths
   */
  public queryData(query: (value: Query) => Query, ...subCollectionPaths: SubCollectionInfo[]) {
    this.dataRquestSubject.next({query:query,subCollectionPaths:subCollectionPaths})
  }


  private queryBySearchFiltersAndFilterGroup(observableList: Subject<any>[], query: (value: Query) => Query, searchFilter, ...subCollectionPaths: SubCollectionInfo[]) {
    this.filterGroups.forEach(filterGroup => {
      const queryFnc: QueryFn = ref => query(this.addSearchWhereClause(this.addWhereClauses(filterGroup.filters, this.addSearchAndOrderByClauses(ref, searchFilter)), searchFilter));
      observableList.push(this.collectionService.querySubCollection(queryFnc, ...subCollectionPaths));
    })
  }

  private queryBySearchFilters(observableList: Subject<any>[], query: (value: Query) => Query, searchFilter, ...subCollectionPaths: SubCollectionInfo[]) {

    const queryFnc: QueryFn = ref => query(this.addSearchWhereClause(this.addSearchAndOrderByClauses(ref, searchFilter), searchFilter));
    observableList.push(this.collectionService.querySubCollection(queryFnc, ...subCollectionPaths));

  }

  private queryByFilterGroup(observableList: Subject<any>[], query: (value: Query) => Query, ...subCollectionPaths: SubCollectionInfo[]) {
    this.filterGroups.forEach(filterGroup => {
      const queryFnc: QueryFn = ref => query(this.addWhereClauses(filterGroup.filters, this.addOrderByClauses(ref)));
      observableList.push(this.collectionService.querySubCollection(queryFnc, ...subCollectionPaths));
    })
  }

  /**
   * query data from multiple sub collections by giving documentId and sub collection name as rest parameters
   *
   * @param pageIndex which index of page is retrieved
   * @param pageSize
   * @param subCollectionPaths [{documentId: 'course1', subCollection:'activities'}]
   */
  public queryCombinedData(queryFn: QueryFn, subCollectionPaths: SubCollectionInfo[][]) {
    for (let i = 0; i < subCollectionPaths.length; i++) {
      this.queryData(queryFn, subCollectionPaths[i][0]);
    }
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<T[]> {
    this.collectionService.lastDoc = undefined;
    return this.dataSubject.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    this.dataSubject.unsubscribe();
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: AngularFirestoreCollection<T>) {/*
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);*/
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: AngularFirestoreCollection<T>) {
    /*if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });*/
  }

  ngAfterViewInit(): void {
    this.fetchData();
  }

  /**
   * load more data to collection using paginator
   * @param event
   */
  loadMore(event: PageEvent) {//todo add correct value to startAt() method
    this.queryData(query => query.startAfter(this.collectionService.lastDoc).limit(event.pageSize));
  }

  fetchData(): void {
    //todo add correct value to startAt() method
    if (this.matPaginator) {
      this.queryData(query => query.limit(this.matPaginator.pageSize));
    } else {
      this.queryData(query => query.limit(this.batchSize));
    }
  }

  nextBatch() {
    if (this.collectionService.lastDoc) {

      this.queryData(query => query.startAfter(this.collectionService.lastDoc).limit(this.batchSize));
    } else {
      this.queryData(query => query.limit(this.batchSize));
    }
  }

  setOrderBy(...orderBy: OrderBy[]) {
    this.orderBy = orderBy;
  }

  addOrderBy(orderBy: OrderBy) {
    this.orderBy.push(orderBy);
  }

  private getDefaultOrderBy(searchFilter: SearchFilter): OrderBy {
    const index = this.orderBy.findIndex(orderBy => orderBy.fieldPath === searchFilter.field);
    const newOrderBy = <OrderBy>{fieldPath: searchFilter.field, directionStr: 'asc'};
    if (index > -1) {
      const existingObject = this.orderBy.splice(index, 1)[0];
      newOrderBy.directionStr = existingObject.directionStr;
    }

    return newOrderBy;
  }

  private addSearchAndOrderByClauses(query: Query, searchFilter: SearchFilter): Query {
    const order = this.getDefaultOrderBy(searchFilter);
    return this.addOrderByClause(query, order);
  }

  private addOrderByClauses(query: Query): Query {
    this.orderBy.forEach(order => {
      query = this.addOrderByClause(query, order)
    });
    return query;
  }

  private addOrderByClause(query: Query, orderBy: OrderBy): Query {
    return query.orderBy(orderBy.fieldPath, orderBy.directionStr);
  }

  private addWhereClauses(filters: Filter[], query: Query): Query {
    filters.forEach(filter => {
      query = this.addWhereClause(query, filter)
    });
    return query;
  }

  private addWhereClause(query: Query, filter: Filter): Query {
    return query.where(filter.fieldPath, filter.opStr, filter.value)
  }

  private addSearchWhereClause(query: Query, filter: SearchFilter): Query {
    //return query.where(filter.field, ">=", filter.value)
    return query.where(filter.field, ">=", filter.value).where(filter.field, "<", (filter.value + 'z'));
  }

  setFilterGroups(filterGroups: FilterGroup[]) {
    this.filterGroups = [];
    this.filterGroups = filterGroups;
    this.filterChangeSubject.next(true);
  }


  accumulateFilterGroup(filterGroup: FilterGroup) {
    filterGroup.filters.forEach(filter => {
      this.removeFilter(filterGroup.key, filter, false);
      this.filterGroups.push(filterGroup);
    });
    this.filterChangeSubject.next(true);
  }


  accumulateFilter(groupName: string, filter: Filter) {
    this.removeFilter(groupName, filter, false);
    this.filterGroups.forEach(value => {
      if (value.key === groupName) {
        value.filters.push(filter)
      }
    })
    this.filterChangeSubject.next(true);
  }

  removeFilterGroup(filterGroup: FilterGroup, fireChanges: boolean = true) {

    const index = this.filterGroups.findIndex(value => (value.key === filterGroup.key));
    if (index !== -1) {
      this.filterGroups.splice(index, 1);
    }
    if (fireChanges === true) {
      this.filterChangeSubject.next(false);
    }
  }

  removeFilter(groupName: string, filter: Filter, fireChanges: boolean = true) {
    this.filterGroups.forEach(group => {
      if (group.key === groupName) {
        const index = group.filters.findIndex(value => (value.fieldPath === filter.fieldPath && value.opStr === filter.opStr));

        if (index !== -1) {
          group.filters.splice(index, 1);
        }
      }
    });

    if (fireChanges === true) {
      this.filterChangeSubject.next(false);
    }
  }


  clearFilterGroup(filterGroup: FilterGroup) {
    filterGroup.filters.forEach(filter => {
      this.removeFilter(filterGroup.key, filter, true);
    })

    this.filterChangeSubject.next(true);
  }


  setSearchFilters(filters: SearchFilter[]) {
    this.searchFilters = [];
    filters.forEach(filter => {
      this.searchFilters.push(filter);
    });
    this.filterChangeSubject.next(true);
  }


  accumulateSearchFilters(filters: SearchFilter[]) {
    filters.forEach(filter => {
      this.removeSearchFilter(filter, false);
      this.searchFilters.push(filter);
    });
    this.filterChangeSubject.next(true);
  }

  accumulateSearchFilter(filter: SearchFilter) {
    this.removeSearchFilter(filter, false);
    this.searchFilters.push(filter);
    this.filterChangeSubject.next(true);
  }

  removeSearchFilter(filter: SearchFilter, fireChanges: boolean = true) {
    const index = this.searchFilters.findIndex(value => (value.field === filter.field));

    if (index !== -1) {
      this.searchFilters.splice(index, 1);
    }
    if (fireChanges === true) {
      this.filterChangeSubject.next(false);
    }
  }

  clearSearchFilters(filters: SearchFilter[]) {
    filters.forEach(filter => {
      this.removeSearchFilter(filter, true);
    })

    this.filterChangeSubject.next(true);
  }

  clearAllFilters() {
    const filterGroups: FilterGroup[] = Object.assign([], this.filterGroups);
    filterGroups.forEach(group => {
      this.removeFilterGroup(group, false);
    });


    const searchFilters = Object.assign([], this.searchFilters);
    searchFilters.forEach(filter => {
      this.removeSearchFilter(filter, false);
    });
    this.filterChangeSubject.next(true);
  }

  setBatchSize(batchSize:number){
    this.batchSize = batchSize;
  }

}


export type WhereFilterOp = '<' | '<=' | '==' | '>=' | '>' | 'array-contains' | 'in' | 'array-contains-any';
export type OrderByDirection = 'desc' | 'asc';

export class Filter {
  fieldPath: string;
  opStr: WhereFilterOp;
  value: any;
}

export class FilterGroup {
  constructor(key: string, filters: Filter[] = []) {
    this.key = key
    this.filters = filters;
  }

  key: string;
  filters: Filter[] = [];
}

export class OrderBy {
  fieldPath: string;
  directionStr?: OrderByDirection
}
