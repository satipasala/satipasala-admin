import {Observable} from "rxjs";
import {Filter, FilterGroup, OrderBy} from "./FirebaseDataSource";
import {SearchFilter} from "../model/SearchFilter";

export interface SDataSource<T> {
  reachedEnd(): boolean

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<T[]>;


  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect();

  fetchData(): void;

  nextBatch();

  setOrderBy(...orderBy: OrderBy[]);

  setFilterGroups(filterGroups: FilterGroup[]);

  setSearchFilters(filters: SearchFilter[]);

  addOrderBy(orderBy: OrderBy);

  removeFilterGroup(filterGroup: FilterGroup, fireChanges: boolean );

  removeFilter(groupName: string, filter: Filter, fireChanges: boolean );

  removeSearchFilter(filter: SearchFilter, fireChanges: boolean );

  accumulateFilterGroup(filterGroups: FilterGroup);

  accumulateFilter(groupName: string, filter: Filter);

  accumulateSearchFilters(filters: SearchFilter[])

  accumulateSearchFilter(filter: SearchFilter)

  clearFilterGroup(filterGroup: FilterGroup);

  clearSearchFilters(filters: SearchFilter[]);

  clearAllFilters();

  setBatchSize(batchSize:number): void;
}
