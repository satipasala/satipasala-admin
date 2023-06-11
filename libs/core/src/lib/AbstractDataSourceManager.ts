import {SDataSource} from "../../../base/src/lib/impl/SDataSource";
import {Directive, Input, OnDestroy} from "@angular/core";
import {FirebaseDataSource, LocalDataSource, OrderBy, SearchFilter} from "@satipasala/base";
import {FilterGroup} from "../../../base/src/lib/impl/FirebaseDataSource";
import {map, scan} from "rxjs/operators";
import {ArrayUtils} from "../../../base/src/lib/utils/array-utils";
import {InfiniteScrollService} from "../../../base/src/lib/services/InfiniteScrollService";
@Directive()
export abstract class AbstractDataSourceManager implements  OnDestroy{

  get dataSource(): SDataSource<any> {
    return this._dataSource;
  }
  @Input()
  set dataSource(value: SDataSource<any>) {
    this._dataSource = value;
  }


  private _collectionName: string;

  get collectionName(): string {
    return this._collectionName;
  }

  @Input()
  set collectionName(value: string) {
    this._collectionName = value;
    this.collectionService.setCollection(value);
    this._dataSource = new FirebaseDataSource<any>(null, null, this.collectionService);
  }

  private _dataSet: Array<any>;

  private _orderBy: OrderBy[];

  private _filterBy: FilterGroup[];

  private _searchBy: SearchFilter[];

  get dataSet(): Array<any> {
    return this._dataSet;
  }

  @Input()
  set dataSet(value: Array<any>) {
    this._dataSet = value;
    if (this._dataSource != null) {
      this._dataSource = null;
      // throw "Data source is already set.Setting both data set and DataSource is not allowed."
    }
    this._dataSource = new LocalDataSource(value);
  }

  @Input()
  set dataArray(value: Array<any>) {
    this.infinite = value;
    this._dataSource = new LocalDataSource(value);
  }

  get orderBy(): OrderBy[] {
    return this._orderBy;
  }

  @Input()
  set orderBy(value: OrderBy[]) {
    this._orderBy = value;
    if(value != null){
      this._dataSource.setOrderBy(...value);
    }
    this._connectToDatabase();
  }

  get filterBy(): FilterGroup[] {
    return this._filterBy;
  }

  @Input()
  set filterBy(value: FilterGroup[]) {
    this._filterBy = value;
    if (value != null) {
      this._dataSource.setFilterGroups(value);
      this._connectToDatabase();
    }
  }


  get searchBy(): SearchFilter[] {
    return this._searchBy;
  }

  @Input()
  set searchBy(value: SearchFilter[]) {
    this._searchBy = value;
    if (value != null) {
      this._dataSource.setSearchFilters(value);
      this._connectToDatabase();
    }
  }

  private _batchSize;

  get batchSize(): number {
    return this._batchSize;
  }

  @Input()
  set batchSize(value: number) {
    this._batchSize = value;
    this.dataSource.setBatchSize(value);
  }

  infinite: any[] = [];

  private _dataSource: SDataSource<any>;

   protected constructor(protected collectionService:InfiniteScrollService){

  }


  ngOnDestroy() {
    this._dataSource.disconnect();
  }

  getBatch() {
    this._dataSource.nextBatch();
  }

 abstract nextBatch(offset);

  clearAllFilters() {
    this._dataSource.clearAllFilters();
    this._connectToDatabase();
  }

  private _connectToDatabase() {
    this.infinite = []; //reset of array in data is not retrieved
    this._dataSource.connect().pipe(scan((acc, batch) => {
      //create or update existing scanned object to avoid duplicates. object keys are ids of the documents.
      batch.forEach(value => {
        //todo name check if id is not found should be fixed.
        value.id ? acc[value.id] = value : acc[value.name] = value;
      });
      //todo optimize order by taking only last batch and adding it to already sorted array.(consider dynamic updates too)
      return acc;
    }, {}), map(obj => {
      return ArrayUtils.sortArray(Object.values(obj), this.orderBy)
    })).subscribe(value => {
      this.infinite = value;
    });
  }

}
