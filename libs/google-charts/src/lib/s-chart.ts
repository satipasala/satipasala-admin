import {AfterViewInit, Directive, ElementRef, HostListener, Inject, Input, ViewChild} from "@angular/core";
import {Subscription} from "rxjs";
import {SidenavService} from "@satipasala/base";
import {ChartInjector} from "./chart-injector";

declare var google: any;


@Directive()
export abstract class SChart<OPTIONS, COLUMN> implements AfterViewInit {
  protected _dataTable;
  protected _chart;
  private _columns: any[];
  private _rows: any[][];
  private _options: OPTIONS;
  resizeSubscription: Subscription;
  @ViewChild('chart', {static: true}) elementRef: ElementRef;
  drawSubscription:Subscription
  _chartTimeout = null;
  protected constructor(protected sidenavService: SidenavService, @Inject('environment') protected environment,protected chartInjector:ChartInjector) {
    this.options = this.getOptions();
    this.resizeSubscription = this.sidenavService.sideNavState.subscribe(state => {
      this.drawChart();
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.drawChart();
  }

  private addColumns() {
    if (this._columns && this._dataTable) {
      this._columns.forEach(column => {
        this._dataTable.addColumn(column.type, column.label);
      })
    }
  }

  _cleanUpDataTableColumns() {
    if (this._columns && this._dataTable) {
      this._dataTable.removeColumns(0, this._columns.length)
    }
  }

  _cleanupDataTableRows() {
    if (this._rows && this._dataTable) {
      this._dataTable.removeRows(0, this._rows.length)
    }
  }

  private addRows() {
    if (this._rows && this._dataTable) {
      this._dataTable.addRows(this._rows)
    }
  }

  drawChart() {
    if(this.drawSubscription){
      this.drawSubscription.unsubscribe();
    }
    this.drawSubscription = this.chartInjector.chartLoaded.subscribe(loaded=>{
      if (this._dataTable != null && this._options != null) {
        if(this._chartTimeout != null){
          clearTimeout(this._chartTimeout) ;
        }
        this._chartTimeout = setTimeout(() => {
          this._chart.draw(this._dataTable, this._options);
        }, 10)
      }
    });
  }

  get rows(): any[][] {
    return this._rows;
  }

  @Input()
  set rows(value: any[][]) {
    this._cleanupDataTableRows()
    this._rows = value;
    this.addRows();
    this.drawChart()
  }

  get columns(): COLUMN[] {
    return this._columns;
  }

  @Input()
  set columns(value: COLUMN[]) {
    this._cleanUpDataTableColumns();
    this._columns = value;
    this.addColumns()
    this.drawChart()
  }

  get options(): OPTIONS {
    return this._options;
  }

  @Input()
  set options(value: OPTIONS) {
    this._options = value;
    this.drawChart();
  }

  private initChart = () => {
    this._dataTable = new google.visualization.DataTable();
    this._chart = this.getChart(this.elementRef)
    this.addColumns();
    this.addRows()
    this.drawChart()
  }

  ngAfterViewInit() {
    let configs = {
      'packages': [this.getPackage()]
    }
    if (this.getExtraConfigs()) {
      configs = Object.assign(configs, this.getExtraConfigs())
    }
    google.charts.load('current', configs);
    google.charts.setOnLoadCallback(this.initChart);
  }

  ngOnDestroy(): void {
    this.resizeSubscription.unsubscribe();
  }

  abstract getPackage();

  abstract getExtraConfigs();

  abstract getOptions(): OPTIONS;

  abstract getChart(elementRef: ElementRef)
}


export interface ChartColumn {
  id?;
  label;
  type;
}
