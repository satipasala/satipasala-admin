import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RefDataFormObject, ReferenceDataFormDialog} from "../../../base";
import {City, Country, GeoLocation, RefDataType, ReferenceDataService, State} from "@satipasala/base";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import * as uuid from 'uuid'
import {Observable, Subscription} from "rxjs";
import {map, mergeMap, startWith} from "rxjs/operators";

@Component({
  selector: 'admin-state-form',
  templateUrl: './state-form.component.html',
  styleUrls: ['./state-form.component.css']
})
export class StateFormComponent extends ReferenceDataFormDialog<State, StateFormComponent> {
  public countries: Observable<Country[]>;
  public filteredCountries: Observable<Country[]>;

  constructor(public fb: FormBuilder, dialogRef: MatDialogRef<StateFormComponent>, @Inject(MAT_DIALOG_DATA) formObject: RefDataFormObject<State>, private referenceDataService: ReferenceDataService) {
    super(dialogRef);
    this.setDataObject(formObject)
  }

  getFormGroup(): FormGroup {
    return this.fb.group({
      id: [this.dataObj.data.id || uuid()],
      name: [this.dataObj.data.name || "", Validators.required],
      shortName: [this.dataObj.data.shortName || ""],
      country: [this.dataObj.data.country || ""],
      active: [this.dataObj.data.active || "Yes"],
      description: [this.dataObj.data.description || ""]
    });
  }

  onSave(): void {
    if (this.formGroup.valid) {
      const state: State = this.formGroup.getRawValue();
      this.dialogRef.close(state);
    } else {
      alert("Errors found! Please check and try again. ")
    }
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
  }

  onClose(): void {

  }

  nameDisplayFunc(dataObj:any): string {
    return dataObj && dataObj.name ? dataObj.name : '';
  }

  private _filter(name: string,collection:Observable<any[]>): Observable<any[]> {
    const filterValue = name.toLowerCase();
    return collection.pipe(map(data=>data.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0)));
  }

}

