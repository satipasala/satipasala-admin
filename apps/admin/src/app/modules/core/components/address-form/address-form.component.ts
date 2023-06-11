import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Country, RefDataType, ReferenceDataService} from "@satipasala/base";
import {State} from "../../../../../../../../libs/base/src/lib/model/referencedata/State";
import {City} from "../../../../../../../../libs/base/src/lib/model/referencedata/City";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable, of, Subscription} from "rxjs";
import {RefData} from "../../../../../../../../libs/base/src/lib/model/referencedata/RefData";
import {filter, flatMap, map, mergeMap, startWith} from "rxjs/operators";

@Component({
  selector: 'admin-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit, OnDestroy {

  get parentForm(): FormGroup {
    return this._parentForm;
  }

  @Input()
  set parentForm(value: FormGroup) {
    this._parentForm = value;
    if (this._parentForm != null) {
      this._parentForm.addControl("addressInfo", this.addressForm);
    }
  }


  private _parentForm: FormGroup;

  @Input()
  public disabled: boolean;

  public cities: Observable<City[]>;
  public states: Observable<State[]>;
  public countries: Observable<Country[]>;

  public filteredCountries: Observable<Country[]>;
  public filteredStates:Observable<State[]>;
  public filteredCities:Observable<City[]>;

  addressForm: FormGroup;

  constructor(private fb: FormBuilder,
              private referenceDataService: ReferenceDataService) {

    this.addressForm = this.fb.group({
      'street': [],
      'city': [''],
      'state': [''],
      'country': ['', Validators.required]
    });

  }

  ngOnInit() {
    this.filteredCountries = this.addressForm.controls['country'].valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name,this.countries) : this.countries),
        mergeMap(value => value)
      );
    this.filteredStates = this.addressForm.controls['state'].valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name,this.states) : this.states),
        mergeMap(value => value)
      );
    this.filteredCities = this.addressForm.controls['city'].valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name,this.cities) : this.cities),
        mergeMap(value => value)
      );
    this.cities = this.referenceDataService.getData<City>(RefDataType.CITY, true);
    this.states = this.referenceDataService.getData<State>(RefDataType.STATE, true)
    this.countries = this.referenceDataService.getData<Country>(RefDataType.COUNTRY, false);
  }

  compareItems(i1: RefData, i2: RefData) {
    return i1 && i2 && i1.name === i2.name;
  }

  selectedCity(city:City) {
    this.addressForm.controls['state'].setValue(city.state);
    this.addressForm.controls['country'].setValue(city.country);
  }

  selectedCountry(country:Country){
    this.filteredStates = this.states.pipe(map(states=>states.filter(state => state.country?.shortName == country?.shortName )));
    this.filteredCities = this.cities.pipe(map(cities=>cities.filter(city => city.country?.shortName == country?.shortName)));
    this.addressForm.controls['state'].setValue("");
    this.addressForm.controls['city'].setValue("");
  }

  selectedState(state:State){
    this.filteredCities = this.cities.pipe(map(cities => cities.filter(city => city.state?.name == state?.name)));
    this.addressForm.controls['country'].setValue(state.country);
    this.addressForm.controls['city'].setValue("");
  }

  ngOnDestroy(): void {
  }

  nameDisplayFunc(dataObj:any): string {
    return dataObj && dataObj.name ? dataObj.name : '';
  }

  private _filter(name: string,collection:Observable<any[]>): Observable<any[]> {
    const filterValue = name.toLowerCase();
    return collection.pipe(map(data=>data.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0)));
  }

}
