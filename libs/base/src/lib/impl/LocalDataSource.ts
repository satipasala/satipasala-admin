import {SDataSource} from "./SDataSource";
import {Filter, FilterGroup, OrderBy} from "./FirebaseDataSource";
import {Observable, of, Subject} from "rxjs";
import {SearchFilter} from "../model/SearchFilter";

export class LocalDataSource implements SDataSource<any> {


  private _dataArray: Array<any>;
  dataSubject: Subject<any[]> = new Subject<any[]>();
  lastIndex: number = 0;
  batchSize:number = 20;
  dataLoading:boolean = false;

  constructor(dataArray?: Array<any>) {
    this.dataArray = dataArray;
  }
  
  isDataLoading () {
    this.dataLoading;
  }

  get dataArray(): Array<any> {
    return this._dataArray;
  }

  set dataArray(value: Array<any>) {
    this._dataArray = value;
  }

  setFilterGroups(filterGroups: FilterGroup[]) {
    console.error("filtering by not supported yet")
  }

  setSearchFilters(filters: SearchFilter[]) {
    console.error("filtering by not supported yet")
  }

  accumulateSearchFilters(filters: SearchFilter[]) {
    console.error("search filtering by not supported yet")
  }

  accumulateSearchFilter(filter: SearchFilter) {
    console.error("search filtering by not supported yet")
  }

  addOrderBy(orderBy: OrderBy) {
    console.error("order by not supported yet")
  }

  setOrderBy(...orderBy: OrderBy[]) {
    //   console.error("order by not supported yet")
  }

  connect(): Observable<any[]> {
    return this.dataSubject.asObservable();
  }


  clearSearchFilters(filters: SearchFilter[]) {
    console.error("clear filters not supported yet")
  }


  disconnect() {
    this.dataSubject.unsubscribe();
  }

  queryData() {
    this.dataSubject.next(this._dataArray);
  }

  fetchData(): void {
    this.queryData();
  }

  nextBatch() {
    this.queryData();
  }

  reachedEnd(): boolean {
    //  return this.lastIndex >= this.dataArray.length;
    return true;
  }

  clearAllFilters() {
    throw new Error("Method not implemented.");
  }

  accumulateFilter(groupName: string, filter: Filter) {
    console.error(" filtering not supported yet")
  }

  accumulateFilterGroup(filterGroups: FilterGroup) {

    console.error(" filtering not supported yet")
  }

  clearFilterGroup(filterGroup: FilterGroup) {

    console.error(" filtering not supported yet")
  }

  removeFilter(groupName: string, filter: Filter, fireChanges?: boolean) {

    console.error(" filtering not supported yet")
  }

  removeFilterGroup(filterGroup: FilterGroup, fireChanges?: boolean) {

    console.error(" filtering not supported yet")
  }

  removeSearchFilter(filter: SearchFilter, fireChanges?: boolean) {

    console.error(" filtering not supported yet")
  }

  setBatchSize(batchSize:number){
    this.batchSize = batchSize;
  }
}
