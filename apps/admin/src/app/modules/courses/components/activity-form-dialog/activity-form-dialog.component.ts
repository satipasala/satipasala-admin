import {Component, Inject, ViewChild} from "@angular/core";
import {ActivitiesService, Activity, ActivityType, RefDataType, ReferenceDataService} from "@satipasala/base";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {RefData} from 'libs/base/src/lib/model/referencedata/RefData';
import {FileUploadComponent} from "../../../uploads/file-upload/file-upload.component";
import {ErrorStateMatcher} from "@angular/material/core";


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'admin-activity-form-dialog',
  templateUrl: './activity-form-dialog.component.html',
  styleUrls: ['./activity-form-dialog.component.scss']
})
export class ActivityFormDialog {
  @ViewChild("uploadComponent", {static: false})
  uploadComponent: FileUploadComponent;
  formGroup: FormGroup;
  mode: string;
  activity: Activity;
  activityTypes: any[];
  fileType: string;
  inputType: 'resource' | 'link' = 'link';
  linkFormControl = new FormControl('', [
    Validators.required,
  ]);
  textFormControl = new FormControl('', [
    Validators.required,
  ]);
  matcher = new MyErrorStateMatcher();

  constructor(public dialogRef: MatDialogRef<ActivityFormDialog>, private activitiesService: ActivitiesService, @Inject(MAT_DIALOG_DATA) public data: any,
              private referenceDataServie: ReferenceDataService, private fb: FormBuilder) {
    this.activity = data.activity;
    this.referenceDataServie.getData<ActivityType>(RefDataType.ACTIVITY_TYPE, true).subscribe(dataArr => {
      this.activityTypes = dataArr;
    })
    if(this.activity){
      this.linkFormControl.setValue(this.activity.resource?this.activity.resource['link']:'')
      this.textFormControl.setValue(this.activity.resource?this.activity.resource['text']:'')
    }


    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      gradable: [''],
      maxPoints: [''],
      description: [''],
      active: [''],
      resource: [{}]  //{name:'PDF', type :"pdf" , link:https://drive.google.com/file/d/1DBCwmVgHdkrTDNDfmS6gCWnxAeTfYyIc/view}
    })
    this.mode = data.mode
    if (this.mode !== 'add') {
      this.formGroup.patchValue(this.activity as Activity)
    }
    this.fileType = this.activity?.type?.contentType?.type
    this.formGroup.controls['type'].valueChanges.subscribe(value => {
      this.fileType = value.type?.contentType?.type;
    });

    this.linkFormControl.valueChanges.subscribe(value => {
      this.formGroup.patchValue({resource: {link: value}})
    })
    this.textFormControl.valueChanges.subscribe(value => {
      this.formGroup.patchValue({resource: {text: value}})
    })
  }

  cancel(): void {
    this.dialogRef.close();
  }

  onSave() {
    if (this.mode === 'add') {
      this.activitiesService.add(this.formGroup.getRawValue()).then(() => {
        this.dialogRef.close(true)
      }).catch(err => {
        console.log(err);
        this.dialogRef.close(false);
      });
    } else {
      const updatedActivity = this.formGroup.getRawValue();
      updatedActivity['id'] = this.activity.id;
      this.activitiesService.update(this.activity.id, updatedActivity).then(() => {
        this.dialogRef.close(true)
      }).catch(err => {
        console.log(err);
        this.dialogRef.close(false);
      });
    }
  }

  compareItems(i1: RefData, i2: RefData) {
    return i1 && i2 && i1.name === i2.name;
  }

  addOrUpdateEvent(urls: string[]) {
    let value: any = this.formGroup.controls['resource'];
    value.url = urls[0];
    this.formGroup.controls['resource'].setValue(value);
  }

  isUploadVisible() {
    return this.isInputRequired() && this.inputType == 'resource';
  }

  isUrlVisible() {
    return this.isInputRequired() && this.formGroup.controls['type'].value?.type?.contentType?.type !== 'game' && this.inputType == 'link'
  }

  isInputRequired(){
    return this.formGroup.controls['type'].value?.type?.contentType?.type !== 'game'
      && this.formGroup.controls['type'].value?.type?.contentType?.type !== 'practice'
      && this.formGroup.controls['type'].value?.type?.contentType?.type !== 'discussion'
  }

  setInputValue(value: any) {
    this.inputType = value
  }
}
