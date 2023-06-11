import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {FormGroup} from "@angular/forms";
import {FormField} from "../../../../../base/src/lib/model/fields/FormField";
import {DynamicFormComponent} from "../dynamic-form-component/dynamic-form.component";

@Component({
  selector: 's-dynamic-stepper-form',
  templateUrl: './dynamic-stepper-form.component.html',
  styleUrls: ['./dynamic-stepper-form.component.scss']
})
export class DynamicStepperForm extends DynamicFormComponent<FormField<any>> {

  @Input() disableSubmit:boolean;
  isLinear = false;


  constructor() {
    super();
    this.form = new FormGroup({});
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
