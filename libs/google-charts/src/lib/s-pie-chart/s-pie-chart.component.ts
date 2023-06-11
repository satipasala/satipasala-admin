import {AfterViewInit, Component, ElementRef, Inject, Input, ViewChild} from '@angular/core';
import {ChartColumn, SChart} from "../s-chart";
import {SidenavService} from "@satipasala/base";
import {ChartInjector} from "../chart-injector";
declare var google: any;

@Component({
  selector: 's-pie-chart',
  template: `
    <style>
      .s-pie-chart {
        height: 100%;
        width: 100%;
        display: block;
        position: absolute;
        overflow: hidden;
      }</style>
    <div #chart class="s-pie-chart"></div>
  `
})
export class SPieChart extends SChart<any, ChartColumn> {

  constructor(public sidenavService: SidenavService,@Inject('environment') protected environment,protected chartInjector:ChartInjector) {
    super(sidenavService,environment,chartInjector);
  }

  getOptions(): any {
    return {
      title: 'My Daily Activities',
    };
  }

  getPackage() {
    return 'corechart';
  }


  getChart(elementRef: ElementRef) {
    return new google.visualization.PieChart(this.elementRef.nativeElement);
  }

  getExtraConfigs() {

  }



}
