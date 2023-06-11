import {Directive, Input, OnDestroy, OnInit} from "@angular/core";
import {City, Country, State} from "@satipasala/base";
import {StateInfo} from "../../../../../../../libs/base/src/lib/model/referencedata/State";
import {CityInfo} from "../../../../../../../libs/base/src/lib/model/referencedata/City";
import {HostInfo} from "../../../../../../../libs/base/src/lib/model/Host";
import {ChartColumn} from "../../../../../../../libs/google-charts/src/lib/s-chart";
import {Observable} from "rxjs";

@Directive()
export abstract class EventChartController implements OnInit,OnDestroy{

  protected eventGeoChartMode: EventChartMode = EventChartMode.WORLD;
  protected _selectedCountry: Country;
  protected _selectedState: State;
  protected _selectedCity: City;
  protected _selectedOrganization: HostInfo;

  dataset: Promise<any[][]>;
  titles: ChartColumn[];

  protected constructor() {

  }

   ngOnInit(): void {
    this.titles = this.getTitles();
    this.dataset = this.getDataSet();
  }

  ngOnDestroy(): void {

  }

  get selectedCountry(): Country {
    return this._selectedCountry;
  }

  @Input()
  set selectedCountry(country: Country) {
    this._selectedCountry = country
    if (country != null) {
      this.eventGeoChartMode = EventChartMode.COUNTRY;
    } else {
      this.eventGeoChartMode = EventChartMode.WORLD;
    }
    this.titles = this.getTitles();
    this.dataset = this.getDataSet();
  }


  get selectedState(): State {
    return this._selectedState;
  }

  @Input()
  set selectedState(state: State) {
    this._selectedState = state
    if (state != null) {
      this.eventGeoChartMode = EventChartMode.STATE;
      this.titles = this.getTitles();
      this.dataset = this.getDataSet();
    }

  }

  get selectedCity(): City {
    return this._selectedCity;
  }

  @Input()
  set selectedCity(city: City) {
    this._selectedCity = city;
    if (city != null) {
      this.eventGeoChartMode = EventChartMode.CITY;
      this.titles = this.getTitles();
      this.dataset = this.getDataSet();
    }

  }

  get selectedOrganization(): HostInfo {
    return this._selectedOrganization;
  }

  @Input()
  set selectedOrganization(organizationInfo: HostInfo) {
    this._selectedOrganization = organizationInfo;
    if (organizationInfo != null) {
      this.eventGeoChartMode = EventChartMode.ORGANIZATION;
      this.titles = this.getTitles();
      this.dataset = this.getDataSet();
    }
  }

  getTitles(): ChartColumn[] {
    switch (this.eventGeoChartMode) {
      case EventChartMode.WORLD:
        return this.getWorldTitle();
      case EventChartMode.COUNTRY:
        return this.getCountryTitle(this._selectedCountry);
      case EventChartMode.STATE:
        return this.getStateTitles(this._selectedState);
      case EventChartMode.CITY:
        return this.getCityTitles(this._selectedCity);
      case EventChartMode.ORGANIZATION:
        return this.getOrganizationTitles(this._selectedOrganization);
    }
  }

  getDataSet(): Promise<any[][]> {
    switch (this.eventGeoChartMode) {
      case EventChartMode.WORLD:
        return this.getWorldDataSet();
      case EventChartMode.COUNTRY:
        return this.getCountryDataSet(this._selectedCountry);
      case EventChartMode.STATE:
        return this.getStateDataSet(this._selectedState);
      case EventChartMode.CITY:
        return this.getCityDataSet(this._selectedCity);
      case EventChartMode.ORGANIZATION:
        return this.getOrganizationDataSet(this._selectedOrganization);
    }
  }

  abstract getWorldDataSet(): Promise<any[][]>;

  abstract getCountryDataSet(country: Country): Promise<any[][]>;

  abstract getStateDataSet(state: State): Promise<any[][]>;

  abstract getCityDataSet(city: City): Promise<any[][]>;

  abstract getOrganizationDataSet(hostInfo: HostInfo): Promise<any[][]>;

  abstract getWorldTitle(): ChartColumn[] ;

  abstract getCountryTitle(country: Country): ChartColumn[] ;

  abstract getStateTitles(state: StateInfo): ChartColumn[] ;

  abstract getCityTitles(city: CityInfo): ChartColumn[];

  abstract getOrganizationTitles(organizationInfo: HostInfo): ChartColumn[]


}



export enum EventChartMode {
  WORLD,
  COUNTRY,
  STATE,
  CITY,
  ORGANIZATION
}
