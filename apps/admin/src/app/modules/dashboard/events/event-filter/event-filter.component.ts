import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  City,
  Country, State
} from "@satipasala/base";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EventsDashboardService} from "../events-dashboard.service";
import {StateInfo} from "../../../../../../../../libs/base/src/lib/model/referencedata/State";
import {CityInfo} from "../../../../../../../../libs/base/src/lib/model/referencedata/City";
import {HostInfo} from "../../../../../../../../libs/base/src/lib/model/Host";

@Component({
  selector: 'admin-dashboard-event-filter',
  templateUrl: './event-filter.component.html',
  styleUrls: ['./event-filter.component.scss']
})
export class EventFilter implements OnInit {

  eventFilterForm: FormGroup;
  countries: Country[];
  filteredStates: StateInfo[] = [];
  filteredCities: CityInfo[] = [];
  filteredOrganizations: HostInfo[] = [];
  filterSession:EventFilterSession = <EventFilterSession>{}

  @Output()
  filterStateChange: EventEmitter<EventFilterSession> = new EventEmitter<EventFilterSession>();

  constructor(private fb: FormBuilder,private eventsDashboardService: EventsDashboardService) {
    this.eventFilterForm = this.fb.group({
      'country': [''],
      'state': [''],
      'city': [''],
      'organization': ['']
    });
    this.eventsDashboardService.getCountriesOfWorld().subscribe(countries => {
      this.countries = countries;
    });

    this.eventsDashboardService.getOrganizationsOfWord().then(filteredOrganizations => {
      this.filteredOrganizations = filteredOrganizations;
    });
  }

  compareEventsByCountry(i1: Country, i2: string) {
    return i1 && i2 && i1.name === i2;
  }

  compareEventsByState(i1: StateInfo, i2: string) {
    return i1 && i2 && i1.name === i2;
  }

  compareEventsByCity(i1: CityInfo, i2: string) {
    return i1 && i2 && i1.name === i2;
  }

  compareEventsByOrganization(i1: HostInfo, i2: string) {
    return i1 && i2 && i1.name === i2;
  }

  selectedCountry(country: Country) {
    this.eventsDashboardService.getStatesOfCountry(country).then(filteredStates => {
      this.filteredStates = filteredStates;
    });
    this.filteredCities = []
    this.eventsDashboardService.getOrganizationsOfCountry(country).then(filteredOrganizations => {
      this.filteredOrganizations = filteredOrganizations;
    });
    this.filterSession.country = country;
    this.filterSession.state = null;
    this.filterSession.city = null;
    this.filterSession.organization = null;
    this.filterStateChange.emit(this.filterSession);
  }

  selectedState(state: State) {
    this.eventsDashboardService.getCitiesOfState(state).subscribe(value => {
      this.filteredCities = value;
    });
    this.eventsDashboardService.getOrganizationsOfState(state).then(filteredOrganizations => {
      this.filteredOrganizations = filteredOrganizations;
    });
    this.filterSession.state = state;
    this.filterSession.city = null;
    this.filterSession.organization = null
    this.filterStateChange.emit(this.filterSession);
  }

  selectedCity(city: City) {
    this.eventsDashboardService.getOrganizationsOfCity(city).then(filteredOrganizations => {
      this.filteredOrganizations = filteredOrganizations;
    });
    this.filterSession.city = city;
    this.filterSession.organization = null
    this.filterStateChange.emit(this.filterSession);
  }

  selectedOrg(organization: HostInfo) {
    this.filterSession.organization = organization;
    this.filterStateChange.emit(this.filterSession);
  }

  ngOnInit() {

  }

  reset() {
    this.eventFilterForm.reset();
    this.filteredStates = [];
    this.filteredCities = [];
    this.eventsDashboardService.getOrganizationsOfWord().then(filteredOrganizations => {
      this.filteredOrganizations = filteredOrganizations;
    });
    this.filterSession.country = null;
    this.filterSession.state = null;
    this.filterSession.city = null;
    this.filterSession.organization = null;
    this.filterStateChange.emit(this.filterSession);
  }
}

export interface EventFilterSession {
  country: Country;
  state: StateInfo;
  city: CityInfo;
  organization: HostInfo;

}
