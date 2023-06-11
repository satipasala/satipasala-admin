import {Component, Input, OnInit} from '@angular/core';
import {
  City,
  Country, State
} from "@satipasala/base";
import {EventChartController} from "../event-chart-controller.directive";
import {ChartColumn} from "../../../../../../../../libs/google-charts/src/lib/s-chart";
import {CityInfo} from "../../../../../../../../libs/base/src/lib/model/referencedata/City";
import {StateInfo} from "../../../../../../../../libs/base/src/lib/model/referencedata/State";
import {HostInfo} from "../../../../../../../../libs/base/src/lib/model/Host";
import {EventsDashboardService} from "../events-dashboard.service";

@Component({
  selector: 'admin-dashboard-event-map',
  templateUrl: './event-map.component.html',
  styleUrls: ['./event-map.component.scss']
})
export class EventMap extends EventChartController {
  _markers: any[][] = [];
  _gMapMarkers = [];

  constructor(private eventsDashboardService: EventsDashboardService) {
    super();
  }

  getCityTitles(city: CityInfo): ChartColumn[] {
    return [
      {type: 'number', label: 'Lat'},
      {type: 'number', label: 'Long'},
      {type: 'string', label: 'City'}];
  }

  getCountryTitle(country: Country): ChartColumn[] {
    return [
      {type: 'number', label: 'Lat'},
      {type: 'number', label: 'Long'},
      {type: 'string', label: 'City'}];
  }

  getStateTitles(state: StateInfo): ChartColumn[] {
    return [
      {type: 'number', label: 'Lat'},
      {type: 'number', label: 'Long'},
      {type: 'string', label: 'City'}];
  }

  getWorldTitle(): ChartColumn[] {
    return [
      {type: 'number', label: 'Lat'},
      {type: 'number', label: 'Long'},
      {type: 'string', label: 'City'}];
  }

  getOrganizationTitles(organizationInfo: HostInfo): ChartColumn[] {
    return [
      {type: 'number', label: 'Lat'},
      {type: 'number', label: 'Long'},
      {type: 'string', label: 'City'}];
  }

  getWorldDataSet(): Promise<any[][]> {
    this.clearData();
     return new Promise<any[][]>((resolve,reject) => {
      this.eventsDashboardService.getWorldEvents().subscribe(events => {
          events.forEach(event => this.createMarker(event.addressInfo.city, event.name));
          resolve(this._markers)
        }
      )
    })
  }

  getCountryDataSet(country: Country): Promise<any[][]> {
    this.clearData()
     return new Promise<any[][]>((resolve,reject) => {
      this.eventsDashboardService.getCountryEvents(country).subscribe(events => {
          events.forEach(event => this.createMarker(event.addressInfo.city, event.name));
          resolve(this._markers)
        }
      )
    })
  }

  getStateDataSet(state: State): Promise<any[][]> {
    this.clearData()
     return new Promise<any[][]>((resolve,reject) => {
      this.eventsDashboardService.getStateEvents(state).subscribe(events => {
          events.forEach(event => this.createMarker(event.addressInfo.city, event.name));
          resolve(this._markers)
        }
      )
    })
  }

  getCityDataSet(city: City): Promise<any[][]> {
    this.clearData()
     return new Promise<any[][]>((resolve,reject) => {
      this.eventsDashboardService.getCityEvents(city).subscribe(events => {
          events.forEach(event => this.createMarker(event.addressInfo.city, event.name));
          resolve(this._markers)
        }
      )
    })
  }

  getOrganizationDataSet(hostInfo: HostInfo): Promise<any[][]> {
    this.clearData()
     return new Promise<any[][]>((resolve,reject) => {
       this.eventsDashboardService.getEvents(
         event => event.host.id == hostInfo.id
           && (this._selectedCountry !=null? this._selectedCountry.shortName == event.addressInfo.city.state.country.shortName : true)
           && (this._selectedState !=null ? this._selectedState.id == event.addressInfo.city.state.id : true)
           && (this._selectedCity  !=null? this._selectedCity.id == event.addressInfo.city.id : true)
       ).subscribe(events => {
          events.forEach(event => this.createMarker(event.addressInfo.city, event.name));
          resolve(this._markers)
        }
      )
    })
  }

  createMarker(cityInfo: CityInfo, title: string) {
    this._markers.push([
      Number(cityInfo.geoLocation.latitude),
      Number(cityInfo.geoLocation.longitude),
      title]);
  }

  clearData() {
    this._gMapMarkers = [];
    this._markers = [];
  }
}
