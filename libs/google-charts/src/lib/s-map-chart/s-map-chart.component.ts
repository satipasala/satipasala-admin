import {AfterViewInit, Component, ElementRef, Inject, OnDestroy} from '@angular/core';
import {ChartColumn, SChart} from "../s-chart";
import {SidenavService} from "@satipasala/base";
import {ChartInjector} from "../chart-injector";

declare var google: any;

@Component({
  selector: 's-map-chart',
  template: `
    <style>
      .s-map-chart {
        height: 100%;
        width: 100%;
      }
    </style>
    <div class="s-map-chart" #chart></div>
  `
})
export class SMapChart extends SChart<any, ChartColumn> implements AfterViewInit, OnDestroy {

  constructor(public sidenavService: SidenavService,@Inject('environment') protected environment,protected chartInjector:ChartInjector) {
    super(sidenavService,environment,chartInjector);
  }

  getOptions(): any {
    return {
      zoomLevel: 6,
      showTooltip: true,
      showInfoWindow: true,
      useMapTypeControl: true
    }
  }

  getPackage() {
    return 'map';
  }

  getExtraConfigs() {
    return {mapsApiKey:this.environment.googleCharts.mapsApiKey};
  }

  getChart(elementRef: ElementRef) {
    return new google.visualization.Map(this.elementRef.nativeElement);
  }

}

