import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RefDataFormObject, ReferenceDataFormDialog} from "../../../base";
import {ActivityType} from "@satipasala/base";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";
import {Observable} from "rxjs";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'admin-activity-type-form',
  templateUrl: './activity-type-form.component.html',
  styleUrls: ['./activity-type-form.component.css']
})
export class ActivityTypeFormComponent extends ReferenceDataFormDialog<ActivityType, ActivityTypeFormComponent> {


  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl: AbstractControl;
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allActivityTags: string[] = ['EEG', 'GAME'];
  contentType = [
    {name: 'PDF', type: "pdf"},
    {name: 'Video', type: "video"},
    {name: 'Audio', type: "audio"},
    {name: 'Game', type: "game"},
    {name: 'Practice Session', type: "practice"},
    {name: 'Discussion', type: "discussion"}
  ]

  constructor(public fb: FormBuilder, dialogRef: MatDialogRef<ActivityTypeFormComponent>, @Inject(MAT_DIALOG_DATA) formObject: RefDataFormObject<ActivityType>) {
    super(dialogRef);
    this.setDataObject(formObject);
    this.tagCtrl = this.formGroup.controls['tags'];
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allActivityTags.slice()));
  }

  getFormGroup(): FormGroup {
    return this.fb.group({
      name: [this.dataObj.data.name || "", Validators.required],
      active: [this.dataObj.data.active || "Yes"],
      description: [this.dataObj.data.description || ""],
      contentType: [this.dataObj.data.contentType, Validators.required],
      tags: [this.dataObj.data.tags]
    });
  }

  @ViewChild('tagInput') fruitInput: ElementRef<HTMLInputElement>;


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value && this.tags.indexOf(value) === -1) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
    this.tagCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.tags.indexOf(event.option.viewValue) === -1) {
      this.tags.push(event.option.viewValue);
    }

    this.fruitInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allActivityTags.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

}

