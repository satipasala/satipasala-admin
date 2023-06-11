import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventChartController} from "../event-chart-controller.directive";
import {ChartColumn} from "../../../../../../../../libs/google-charts/src/lib/s-chart";
import {City, Country, State} from "@satipasala/base";
import {CityInfo} from "../../../../../../../../libs/base/src/lib/model/referencedata/City";
import {StateInfo} from "../../../../../../../../libs/base/src/lib/model/referencedata/State";
import {HostInfo} from "../../../../../../../../libs/base/src/lib/model/Host";
import {Observable} from "rxjs";
import {EventsDashboardService} from "../events-dashboard.service";
import {distinct, mergeMap, toArray} from "rxjs/operators";

@Component({
  selector: 'admin-dashboard-event-category-chart',
  templateUrl: './event-category-chart.component.html',
  styleUrls: ['./event-category-chart.component.scss']
})
export class EventCategoryChart extends EventChartController {
  options = {
    title: "Participation By Countries", pieHole: 0.4,
    legend: 'none',
    pieSliceText: 'label',
    slices: {
      4: {offset: 0.2},
      12: {offset: 0.3},
      14: {offset: 0.4},
      15: {offset: 0.5}
    }
  }

  constructor(private eventsDashboardService: EventsDashboardService) {
    super();
  }

  getWorldTitle(): ChartColumn[] {
    this.options = Object.assign(this.options, {title: "Participation By Countries"});
    return [{label: 'Country', type: 'string'}, {label: 'Participants', type: 'number'}];
  }

  getCountryTitle(country: Country): ChartColumn[] {
    this.options = Object.assign(this.options, {title: "Participation By Country - " + country.name});
    return [{label: 'Composition', type: 'string'}, {label: 'Participants', type: 'number'}];
  }

  getCityTitles(city: CityInfo): ChartColumn[] {
    this.options = Object.assign(this.options, {title: "Participation By City - " + city.name});
    return [{label: 'Composition', type: 'string'}, {label: 'Participants', type: 'number'}];
  }

  getStateTitles(state: StateInfo): ChartColumn[] {
    this.options = Object.assign(this.options, {title: "Participation By State - " + state.name});
    return [{label: 'Composition', type: 'string'}, {label: 'Participants', type: 'number'}];
  }


  getOrganizationTitles(organizationInfo: HostInfo): ChartColumn[] {
    this.options = Object.assign(this.options, {
      title: "Participation By Organization - " + organizationInfo.name,
      pieHole: 0.4
    });
    return [{label: 'Composition', type: 'string'}, {label: 'Participants', type: 'number'}];
  }

  getWorldDataSet(): Promise<any[][]> {
    return new Promise<any[][]>((resolve, reject) => {
      let data = [];
      this.eventsDashboardService.getCountriesOfWorld().subscribe(countries => {
        countries.forEach(country => {
          this.eventsDashboardService.getCountryEventsInfo(country).subscribe(countryInfo => {
            data.push([country.name, countryInfo.numberOfParticipants])
          })
          resolve(data)
        });
      }, error => {
        resolve(data)
      })
    })
  }

  getCountryDataSet(country: Country): Promise<any[][]> {
    return new Promise<any[][]>((resolve, reject) => {
      let data = [];
      this.eventsDashboardService.getStatesOfCountry(country).then(states => {
        states.forEach(state => {
          this.eventsDashboardService.getStateEventsInfo(state).subscribe(stateInfo => {
            data.push([state.name, stateInfo.numberOfParticipants]);
          });
        });
        resolve(data)
      }, error => {
        resolve(data)
      })
    })
  }

  getStateDataSet(state: State): Promise<any[][]> {
    return new Promise<any[][]>((resolve, reject) => {
      let data = [];

      this.eventsDashboardService.getCitiesOfState(state).subscribe(cities => {
        cities.forEach(city => {
          this.eventsDashboardService.getCityEventsInfo(city).subscribe(eventInfo => {
            data.push([city.name, eventInfo.numberOfParticipants]);
          })
        });
        resolve(data)
      }, error => {
        resolve(data)
      })

    })
  }


  getCityDataSet(city: City): Promise<any[][]> {
    return new Promise<any[][]>((resolve, reject) => {
      let data = [];
      this.eventsDashboardService.getCityEvents(city).pipe(
        mergeMap(value => value),
        distinct(value => value.host.name),
        toArray()
      ).subscribe(events => {
        events.forEach(event => {
          this.eventsDashboardService.getOrganizationEventsInfo(event.host).subscribe(eventInfo => {
            data.push([event.host.name, eventInfo.numberOfParticipants]);
          })

        })
        resolve(data)
      }, error => {
        resolve(data)
      })
    })
  }

  getOrganizationDataSet(hostInfo: HostInfo): Promise<any[][]> {
    return new Promise<any[][]>((resolve, reject) => {
      let data = [];
      this.eventsDashboardService.getEvents(
        event => event.host.id == hostInfo.id
          && (this._selectedCountry !=null? this._selectedCountry.shortName == event.addressInfo.city.state.country.shortName : true)
          && (this._selectedState !=null ? this._selectedState.id == event.addressInfo.city.state.id : true)
          && (this._selectedCity  !=null? this._selectedCity.id == event.addressInfo.city.id : true)
      ).subscribe(events => {
        events.forEach(event => {
          data.push([event.name, event.participants.numberOfParticipants]);
        })
        resolve(data)
      }, error => {
        resolve(data)
      })
    })
  }

}
