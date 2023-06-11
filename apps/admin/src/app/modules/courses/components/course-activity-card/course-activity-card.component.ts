import { Component, OnInit, Input } from '@angular/core';
import { Course, Activity } from '@satipasala/base';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'admin-course-activity-card',
  templateUrl: './course-activity-card.component.html',
  styleUrls: ['./course-activity-card.component.scss']
})
export class ActivityCardComponent implements OnInit {


   private _course: Course;

  private _activity: Activity;
  imageUrl: Observable<string>;

  @Input()
  formGroup: FormGroup;



  activityForm: FormGroup;

  constructor() {
    this.activityForm = new FormGroup({
      activity: new FormControl(),
      activityCheckBox: new FormControl(),
    });

    this.activityForm.get('activityCheckBox').valueChanges.subscribe(value => {
      if(value){
        this.course.tempActivities[this.activity.id] = this.activity;
      }else{
        delete  this.course.tempActivities[this.activity.id];
      }
    })
  }

  get course(): Course {
    return this._course;
  }
  @Input()
  set course(value: Course) {
    this._course = value;
  }

  @Input()
  set activity(value: Activity) {
    this._activity = value;
    this.activityForm.patchValue({
      activity: this._activity,
      activityCheckBox: this.isActivitySelected(this._activity)
    });
  }

  get activity(): Activity {
    return this._activity;
  }

  ngOnInit(): void {
    (this.formGroup.controls['activities'] as FormArray).push(this.activityForm);
  }

  isActivitySelected(activity: Activity): boolean {
    return this._course?.activities?.[activity.id] || this._course?.tempActivities?.[activity.id]
  }

}
