import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SPieChart } from './s-pie-chart/s-pie-chart.component';
import { SGeoChart } from './s-geo-chart/s-geo-chart.component';
import {SScatterChart} from "./s-scatter-chart/s-geo-chart.component";
import {SSteppedAreaChart} from "./s-stepped-area-chart/s-stepped-chart.component";
import {STimelineChart} from "./s-timeline-chart/s-timeline-chart.component";
import {SOrgChart} from "./s-org-chart/s-org-chart.component";
import {SGanttChart} from "./s-gantt-chart/s-gantt-chart.component";
import {SMapChart} from "./s-map-chart/s-map-chart.component";
import {ChartInjector} from "./chart-injector";

@NgModule({
  imports: [CommonModule],
  providers:[ChartInjector],
  declarations: [SPieChart, SGeoChart,SScatterChart,SSteppedAreaChart,STimelineChart,SOrgChart,SGanttChart,SMapChart],
  exports:[SPieChart,SGeoChart,SScatterChart,SSteppedAreaChart,STimelineChart,SOrgChart,SGanttChart,SMapChart]
})
export class GoogleChartsModule {

  public static forRoot(environment: any): ModuleWithProviders<GoogleChartsModule> {

    return {
      ngModule: GoogleChartsModule,
      providers: [
        {
          provide: 'environment', // you can also use InjectionToken
          useValue: environment
        }
      ]
    };
  }
}
