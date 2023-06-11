import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChartColumn} from "../../../../../../../../libs/google-charts/src/lib/s-chart";
import {City, Country, State} from "@satipasala/base";
import {EventChartController} from "../event-chart-controller.directive";
import {CityInfo} from "../../../../../../../../libs/base/src/lib/model/referencedata/City";
import {StateInfo} from "../../../../../../../../libs/base/src/lib/model/referencedata/State";
import {HostInfo} from "../../../../../../../../libs/base/src/lib/model/Host";
import {EventsDashboardService} from "../events-dashboard.service";

@Component({
  selector: 'admin-dashboard-event-male-female-chart',
  templateUrl: './event-male-female-chart.component.html',
  styleUrls: ['./event-male-female-chart.component.scss']
})
export class EventMaleFemaleChart  extends EventChartController  {


  options = {title:"Male/Female Variation",pieHole: 0.4}

  constructor(private eventsDashboardService: EventsDashboardService) {
    super();
  }



  getWorldTitle(): ChartColumn[] {
    return [{label: 'Gender', type: 'string'}, {label: 'Number Of Participants', type: 'number'}];
  }

  getCountryTitle(country:Country): ChartColumn[] {
    return [{label: 'Gender', type: 'string'}, {label: 'Number Of Participants', type: 'number'}];
  }

  getCityTitles(city: CityInfo): ChartColumn[] {
    return [{label: 'Gender', type: 'string'}, {label: 'Number Of Participants', type: 'number'}];
  }

  getStateTitles(state: StateInfo): ChartColumn[] {
    return [{label: 'Gender', type: 'string'}, {label: 'Number Of Participants', type: 'number'}];
  }
  getOrganizationTitles(organizationInfo: HostInfo): ChartColumn[] {
    return [{label: 'Gender', type: 'string'}, {label: 'Number Of Participants', type: 'number'}];
  }

  getWorldDataSet(): Promise<any[][]> {
        return new Promise<any[][]>((resolve,reject) => {
      let data = [];
      this.eventsDashboardService.getWorldEventsInfo().subscribe(eventsInfo => {
        data.push(["Male", eventsInfo.numberOfMales]);
        data.push(["Female", eventsInfo.numberOfFemales]);
        resolve(data);
      },error => {
        resolve(data)
      })
    })
  }

  getCountryDataSet(country: Country): Promise<any[][]> {
        return new Promise<any[][]>((resolve,reject) => {
      let data = [];
      this.eventsDashboardService.getCountryEventsInfo(country).subscribe(eventsInfo => {
        data.push(["Male", eventsInfo.numberOfMales]);
        data.push(["Female", eventsInfo.numberOfFemales]);
        resolve(data);
      },error => {
        resolve(data)
      })
    })
  }

  getStateDataSet(state: State): Promise<any[][]> {
        return new Promise<any[][]>((resolve,reject) => {
      let data = [];
      this.eventsDashboardService.getStateEventsInfo(state).subscribe(eventsInfo => {
        data.push(["Male", eventsInfo.numberOfMales]);
        data.push(["Female", eventsInfo.numberOfFemales]);
        resolve(data);
      },error => {
        resolve(data)
      });
    })
  }


  getCityDataSet(city: City): Promise<any[][]> {
        return new Promise<any[][]>((resolve,reject) => {
      let data = [];
      this.eventsDashboardService.getCityEventsInfo(city).subscribe(eventsInfo => {
        data.push(["Male", eventsInfo.numberOfMales]);
        data.push(["Female", eventsInfo.numberOfFemales]);
        resolve(data);
      },error => {
        resolve(data)
      });
    })
  }

  getOrganizationDataSet(hostInfo: HostInfo): Promise<any[][]> {
        return new Promise<any[][]>((resolve,reject) => {
      let data = [];
          this.eventsDashboardService.getEventsInfo(
            event => event.host.id == hostInfo.id
              && (this._selectedCountry !=null? this._selectedCountry.shortName == event.addressInfo.city.state.country.shortName : true)
              && (this._selectedState !=null ? this._selectedState.id == event.addressInfo.city.state.id : true)
              && (this._selectedCity  !=null? this._selectedCity.id == event.addressInfo.city.id : true)
          ).subscribe(eventsInfo => {
        data.push(["Male", eventsInfo.numberOfMales]);
        data.push(["Female", eventsInfo.numberOfFemales]);
        resolve(data);
      },error => {
        resolve(data)
      });
    })
  }


}
