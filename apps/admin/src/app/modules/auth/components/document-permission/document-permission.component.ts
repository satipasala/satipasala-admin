import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  Country,
  Host,
  HostsService, ObjectUtils, OrganizationType,
  Permission,
  PermissionLevel,
  RefDataType,
  ReferenceDataService,
  Role
} from "@satipasala/base";
import {State} from "../../../../../../../../libs/base/src/lib/model/referencedata/State";
import {City} from "../../../../../../../../libs/base/src/lib/model/referencedata/City";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {StateService} from "../../../../../../../../libs/base/src/lib/services/state.service";
import {RefData} from "../../../../../../../../libs/base/src/lib/model/referencedata/RefData";

@Component({
  selector: 'admin-document-permission',
  templateUrl: './document-permission.component.html',
  styleUrls: ['./document-permission.component.scss']
})
export class DocumentPermissionComponent implements OnInit, OnDestroy {
  // @Input() role: Role;

  // public countries: Country[];
  // public states: State[];
  // public cities: City[];
  // public organizations: Host[];
  // public locations: Location[];
  // public orgTypes: OrganizationType[];

  // public cityObservable: Subscription;
  // public stateObservable: Subscription;
  // public countryObservable: Subscription;

  // countryFormControl: FormControl = new FormControl('', [Validators.required]);
  // stateFormControl: FormControl = new FormControl('', [Validators.required]);
  // cityFormControl: FormControl = new FormControl('', [Validators.required]);
  // orgTypeFromControl: FormControl = new FormControl('', [Validators.required]);


  // disabled:false;

  // constructor(private fb: FormBuilder,private hostService:HostsService,
  //             private referenceDataService: ReferenceDataService,
  //             private stateService: StateService) {


  //   this.hostService.getAll().subscribe(dataArr => this.organizations = dataArr);
  // }

  ngOnInit() {
  //   this.buildForm();
  //   this.cityObservable = this.referenceDataService.getData<City>(RefDataType.CITY, true).subscribe(cities => {
  //     this.cities = cities;
  //   });
  //   this.stateObservable = this.referenceDataService.getData<State>(RefDataType.STATE, true).subscribe(states => {
  //     this.states = states;
  //   });
  //   this.countryObservable = this.referenceDataService.getData<Country>(RefDataType.COUNTRY, false).subscribe(countries => {
  //     this.countries = countries;
  //   });

  //   this.referenceDataService.getData<OrganizationType>(RefDataType.ORGANIZATION_TYPE, true).subscribe(dataArr => {
  //     this.orgTypes = dataArr;
  //   });
  }

  // buildForm() {
  //   this.countryFormControl.valueChanges.subscribe(country => {
  //     this.role.allowedCountry = country;
  //   });

  //   this.stateFormControl.valueChanges.subscribe(state => {
  //     this.role.allowedState = state;
  //   });

  //   this.cityFormControl.valueChanges.subscribe(city => {
  //     this.role.allowedCity  = city;
  //   })

  //   this.orgTypeFromControl.valueChanges.subscribe(allowedOrgTypes => {
  //     this.role.allowedOrgTypes = ObjectUtils.mapFromArray(allowedOrgTypes,'name');
  //   })
  // }


  // compareItems(i1: RefData, i2: RefData) {
  //   return i1 && i2 && i1.name === i2.name;
  // }




  // selectedCity(city: City) {
  //   this.stateFormControl.setValue(city.state);
  //   this.countryFormControl.setValue(city.country);
  // }

  ngOnDestroy(): void {
  //   this.cityObservable.unsubscribe();
  //   this.stateObservable.unsubscribe();
  //   this.countryObservable.unsubscribe();
  }

}
