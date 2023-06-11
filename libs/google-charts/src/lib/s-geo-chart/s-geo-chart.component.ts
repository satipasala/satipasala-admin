import {AfterViewInit, Component, ElementRef, Inject, OnDestroy} from '@angular/core';
import {ChartColumn, SChart} from "../s-chart";
import {SidenavService} from "@satipasala/base";
import {ChartInjector} from "../chart-injector";
declare var google: any;
@Component({
  selector: 's-geo-chart',
  template: `
    <style>
      .s-geo-chart {
        height: 100%;
        width: 100%;
      }
    </style>
    <div class="s-geo-chart" #chart></div>
  `
})
export class SGeoChart extends SChart<GeoChartOptions, ChartColumn> implements AfterViewInit, OnDestroy {
  constructor(public sidenavService: SidenavService,@Inject('environment') protected environment,protected chartInjector:ChartInjector) {
    super(sidenavService,environment,chartInjector);
  }

  getOptions(): GeoChartOptions {
    return new GeoChartOptions();
  }

  getPackage() {
    return 'geochart';
  }

  getExtraConfigs() {
    return {mapsApiKey:this.environment.googleCharts.mapsApiKey};
  }

  getChart(elementRef: ElementRef) {
    return new google.visualization.GeoChart(this.elementRef.nativeElement);
  }

}

export class GeoChartOptions {
  displayMode?: 'auto' | 'regions' | 'markers' | 'text' = 'auto';
  region?: 'world' | string = 'world';
  resolution?:'countries'|'provinces'|'metros' = 'countries'
  /*  colorAxis = {
      colors: ['blue', 'red']
    }*/

}
