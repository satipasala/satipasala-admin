import {Component, Input} from '@angular/core';
import {GeoChartOptions} from "../../../../../../../../libs/google-charts/src/lib/s-geo-chart/s-geo-chart.component";
import {EventChartController, EventChartMode} from "../event-chart-controller.directive";
import {State, StateInfo} from "../../../../../../../../libs/base/src/lib/model/referencedata/State";
import {ChartColumn} from "../../../../../../../../libs/google-charts/src/lib/s-chart";
import {City, CityInfo} from "../../../../../../../../libs/base/src/lib/model/referencedata/City";
import {HostInfo} from "../../../../../../../../libs/base/src/lib/model/Host";
import {EventsDashboardService} from "../events-dashboard.service";
import {Country} from "@satipasala/base";
import {map, mergeMap, reduce} from "rxjs/operators";

@Component({
  selector: 'admin-dashboard-event-geo-chart',
  templateUrl: './event-geo-chart.component.html',
  styleUrls: ['./event-geo-chart.component.scss']
})
export class EventGeoChart extends EventChartController {

  options: GeoChartOptions = new GeoChartOptions();

  constructor(private eventsDashboardService: EventsDashboardService) {
    super();
  }

  @Input()
  set selectedState(state: State) {
    if (state != null) {
      this.options.region = this._selectedCountry?.shortName;
      this.options.displayMode = 'regions';
      this.options.resolution = 'provinces';
    }
    super.selectedState = state;
  }

  @Input()
  set selectedCountry(country: Country) {
    super.selectedCountry = country;
    if (country != null) {
      this.options.region = country?.shortName;
      this.options.displayMode = 'regions';
      this.options.resolution = 'provinces';
    } else {
      this.options.region = 'world';
      this.options.displayMode = 'auto';
      this.options.resolution = 'countries';
    }

  }

  getWorldDataSet(): Promise<any[][]> {
    return new Promise<any[][]>((resolve, reject) => {
      let data = [];
      this.eventsDashboardService.getCountriesOfWorld().subscribe(countries => {
        countries.forEach(country => {
          this.eventsDashboardService.getCountryEventsInfo(country).subscribe(eventsInfo => {
            data.push([country.name, eventsInfo.numberOfEvents])
          })
        })
        resolve(data)
      }, error => {
        resolve(data)
      })
    });
  }


  getCountryDataSet(country: Country): Promise<any[][]> {
    return new Promise<any[][]>((resolve, reject) => {
      let data = [];
      this.eventsDashboardService.getStatesOfCountry(country).then(states => {
        states.forEach(state => {
          this.eventsDashboardService.getStateEventsInfo(state).subscribe(eventsInfo => {
            data.push([state.name, eventsInfo.numberOfEvents])
          })
        })
        resolve(data)
      }, error => {
        resolve(data)
      })
    });
  }

  getStateDataSet(state: State): Promise<any[][]> {
    return new Promise<any[][]>((resolve, reject) => {
      let data = [];
      this.eventsDashboardService.getCitiesOfState(state).subscribe(cities => {
        cities.forEach(city => {
          this.eventsDashboardService.getCityEventsInfo(city).subscribe(eventsInfo => {
            data.push([city.state.name, eventsInfo.numberOfEvents])
          })
        })
        resolve(data)
      }, error => {
        resolve(data)
      })
    });
  }

  getCityDataSet(city: City): Promise<any[][]> {
    return new Promise<any[][]>((resolve, reject) => {
      let data = [];
      this.eventsDashboardService.getOrganizationsOfCity(city).then(organizations => {
        let numberOfEvents = 0;
        organizations.forEach(organization => {
          this.eventsDashboardService.getOrganizationEventsInfo(organization).subscribe(eventsInfo => {
            numberOfEvents += eventsInfo.numberOfEvents
          })
        })
        data.push([city.state.name, numberOfEvents])
        resolve(data)
      }, error => {
        resolve(data)
      })
    });
  }

  getOrganizationDataSet(hostInfo: HostInfo): Promise<any[][]> {
    return new Promise<any[][]>((resolve, reject) => {
      let data = [];
      this.eventsDashboardService.getEvents(
        event => event.host.id == hostInfo.id
          && (this._selectedCountry != null ? this._selectedCountry.shortName == event.addressInfo.city.state.country.shortName : true)
          && (this._selectedState != null ? this._selectedState.id == event.addressInfo.city.state.id : true)
          && (this._selectedCity != null ? this._selectedCity.id == event.addressInfo.city.id : true)
      ).pipe(
        mergeMap(event => event),

        map(event => {
          if (this._selectedCountry == null) {
            return event.addressInfo.city.state.country.name;
          } else {
            return event.addressInfo.city.state.name;
          }
        }),
        reduce((states, name) => {
          const count = states[name] || 0;
          states[name] = count + 1;
          return states;
        }, {})
      ).subscribe(states => {
        Object.keys(states).forEach(state => {
          data.push([state, states[state]]);
        })
        resolve(data)
      }, error => {
        resolve(data)
      })
    });
  }

  getWorldTitle(): ChartColumn[] {
    return [
      {label: 'Country', type: 'string'},
      {label: 'Number of Events', type: 'number'}];
  }


  getCountryTitle(country: Country): ChartColumn[] {
    return [
      {label: 'State', type: 'string'},
      {label: 'Number of Events', type: 'number'}
    ];
  }

  getStateTitles(state: StateInfo): ChartColumn[] {
    return [
      {label: 'City', type: 'string'},
      {label: 'Number of Events', type: 'number'}
    ];
  }

  getCityTitles(city: CityInfo): ChartColumn[] {
    return [
      {label: 'Organization', type: 'string'},
      {label: 'Number of Events', type: 'number'}
    ];
  }

  getOrganizationTitles(organizationInfo: HostInfo): ChartColumn[] {
    return [
      {label: 'Organization Events', type: 'string'},
      {label: 'Number of Events', type: 'number'}
    ];
  }


}

