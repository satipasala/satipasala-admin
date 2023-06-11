import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventChartController} from "../event-chart-controller.directive";
import {City, Country, State} from "@satipasala/base";
import {ChartColumn} from "../../../../../../../../libs/google-charts/src/lib/s-chart";
import {CityInfo} from "../../../../../../../../libs/base/src/lib/model/referencedata/City";
import {StateInfo} from "../../../../../../../../libs/base/src/lib/model/referencedata/State";
import {HostInfo} from "../../../../../../../../libs/base/src/lib/model/Host";
import {Observable} from "rxjs";
import {EventsDashboardService} from "../events-dashboard.service";

@Component({
  selector: 'admin-dashboard-event-courses-chart',
  templateUrl: './event-courses-chart.component.html',
  styleUrls: ['./event-courses-chart.component.scss']
})
export class EventCoursesChart extends EventChartController  {

  options = {title:"Adults/Children Variation",pieHole: 0.4}

  constructor(private eventsDashboardService: EventsDashboardService) {
    super();
  }


  getWorldTitle(): ChartColumn[] {
    return [{label: 'Composition', type: 'string'}, {label: 'Participants', type: 'number'}];
  }

  getCountryTitle(country:Country): ChartColumn[] {
    return [{label: 'Composition', type: 'string'}, {label: 'Participants', type: 'number'}];
  }

  getStateTitles(state: StateInfo): ChartColumn[] {
    return [{label: 'Composition', type: 'string'}, {label: 'Participants', type: 'number'}];
  }

  getCityTitles(city: CityInfo): ChartColumn[] {
    return [{label: 'Composition', type: 'string'}, {label: 'Participants', type: 'number'}];
  }
  getOrganizationTitles(organizationInfo: HostInfo): ChartColumn[] {
    return [{label: 'Composition', type: 'string'}, {label: 'Participants', type: 'number'}];
  }


  getWorldDataSet(): Promise<any[][]> {
        return new Promise<any[][]>((resolve,reject) => {
      let data = [];
      this.eventsDashboardService.getWorldEventsInfo().subscribe(eventsInfo => {
        data.push(["Adults", eventsInfo.numberOfAdults]);
        data.push(["Children", eventsInfo.numberOfChildren]);
        resolve(data)
      },error => {
        resolve(data)
      })
    })
  }

  getCountryDataSet(country: Country): Promise<any[][]> {
        return new Promise<any[][]>((resolve,reject) => {
      let data = [];
      this.eventsDashboardService.getCountryEventsInfo(country).subscribe(eventsInfo => {
        data.push(["Adults", eventsInfo.numberOfAdults]);
        data.push(["Children", eventsInfo.numberOfChildren]);
        resolve(data)
      },error => {
        resolve(data)
      })
    })
  }

  getStateDataSet(state: State): Promise<any[][]> {
        return new Promise<any[][]>((resolve,reject) => {
      let data = [];
      this.eventsDashboardService.getStateEventsInfo(state).subscribe(eventsInfo => {
        data.push(["Adults", eventsInfo.numberOfAdults]);
        data.push(["Children", eventsInfo.numberOfChildren]);
        resolve(data)
      },error => {
        resolve(data)
      });
    })
  }


  getCityDataSet(city: City): Promise<any[][]> {
        return new Promise<any[][]>((resolve,reject) => {
      let data = [];
      this.eventsDashboardService.getCityEventsInfo(city).subscribe(eventsInfo => {
        data.push(["Adults", eventsInfo.numberOfAdults]);
        data.push(["Children", eventsInfo.numberOfChildren]);
        resolve(data)
      },error => {
        resolve(data)
      });
    })
  }

  getOrganizationDataSet(hostInfo: HostInfo): Promise<any[][]> {
        return new Promise<any[][]>((resolve,reject) => {
      let data = [];
      this.eventsDashboardService.getOrganizationEventsInfo(hostInfo).subscribe(eventsInfo => {
        data.push(["Adults", eventsInfo.numberOfAdults]);
        data.push(["Children", eventsInfo.numberOfChildren]);
        resolve(data)
      },error => {
        resolve(data)
      });
    })
  }



}
