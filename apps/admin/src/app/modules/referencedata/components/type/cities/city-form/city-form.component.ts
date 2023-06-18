import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RefDataFormObject, ReferenceDataFormDialog} from "../../../base";
import {City, Country, GeoLocation, RefDataType, ReferenceDataService, State} from "@satipasala/base";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import * as uuid from 'uuid'
import {Observable, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "environments/environment";
import {map, mergeMap, startWith} from "rxjs/operators";

@Component({
  selector: 'city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.css']
})
export class CityFormComponent extends ReferenceDataFormDialog<City, CityFormComponent> {
  public states: Observable<State[]>;

  public countries: Observable<Country[]>;
  public filteredCountries: Observable<Country[]>;
  public filteredStates: Observable<State[]>;

  private GOOGLE_MAP_GEOCODING_API_URL: string = "https://maps.googleapis.com/maps/api/geocode/json?address=";

  constructor(public fb: FormBuilder, dialogRef: MatDialogRef<CityFormComponent>, @Inject(MAT_DIALOG_DATA) formObject: RefDataFormObject<City>, private referenceDataService: ReferenceDataService, private httpClient: HttpClient) {
    super(dialogRef);
    this.setDataObject(formObject)
  }

  getFormGroup(): FormGroup {
    return this.fb.group({
      id: [this.dataObj.data.id || uuid()],
      name: [this.dataObj.data.name || "", Validators.required],
      active: [this.dataObj.data.active || "Yes"],
      state: [this.dataObj.data.state || "", Validators.required],
      country: [this.dataObj.data.country || "", Validators.required],
      latitude: [this.dataObj.data?.geoLocation?.latitude , [Validators.required,Validators.pattern(/^[+-]?\d+(\.\d+)?$/)]],
      longitude: [this.dataObj.data?.geoLocation?.longitude , [Validators.required,Validators.pattern(/^[+-]?\d+(\.\d+)?$/)]],
    });
  }

  afterInit(): void {
    this.countries = this.referenceDataService.getData<Country>(RefDataType.COUNTRY, false);
    this.filteredCountries = this.formGroup.controls['country'].valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name,this.countries) : this.countries),
        mergeMap(value => value)
      );


    this.states = this.referenceDataService.getData<State>(RefDataType.STATE, true);
    this.filteredStates = this.formGroup.controls['state'].valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name,this.states) : this.states),
        mergeMap(value => value)
      );

    if (this.dataObj.data.geoLocation) {//Show geo location if available
      this.formGroup.patchValue({
        latitude: this.dataObj.data.geoLocation.latitude,
        longitude: this.dataObj.data.geoLocation.longitude
      });
    }

    if(this.dataObj.data.country){
      this.selectedCountry(this.dataObj.data.country)
    }
  }

  onClose(): void {
  }

  selectCountry(value) {
    this.formGroup.controls['country'].setValue(value.country);
    const cityName = this.formGroup.controls['name'].value;
    this.onChangeCityName(cityName);
  }

  onSave(): void {
    if (this.formGroup.valid) {
      const city: City = this.formGroup.getRawValue();
      city.geoLocation = Object.assign({}, new GeoLocation(city.name, this.formGroup.controls['latitude'].value, this.formGroup.controls['longitude'].value));
      this.dialogRef.close(city);
    } else {
      alert("Errors found! Please check and try again. ")
    }
  }

  onChangeCityName(cityName: string) {
    const country = this.formGroup.controls['country'].value;
    if (cityName && country) {
      this.httpClient.get(this.GOOGLE_MAP_GEOCODING_API_URL + cityName + ",+" + country.name + "&key=" + environment.firebase.apiKey).subscribe((res) => {
        if (res["status"] === "OK") {
          this.formGroup.patchValue({
            latitude: res["results"][0].geometry.location.lat as number,
            longitude: res["results"][0].geometry.location.lng as number
          });
        } else {
          console.error("No geo coding found!");
        }
      })
    }

  }

  selectedState(value: State) {
  }

  selectedCountry(country: Country) {
    this.filteredStates =  this.states.pipe(map(states=>states.filter(state => state.country?.shortName == country?.shortName )));
  }

  nameDisplayFunc(dataObj:any): string {
    return dataObj && dataObj.name ? dataObj.name : '';
  }

  private _filter(name: string,collection:Observable<any[]>): Observable<any[]> {
    const filterValue = name.toLowerCase();
    return collection.pipe(map(data=>data.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0)));
  }

}

