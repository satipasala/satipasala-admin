import {ChangeDetectorRef, Component} from '@angular/core';
import {AbstractFieldComponent} from "../AbstractFieldComponent";
import {FormField} from "../../../../../../base/src/lib/model/fields/FormField";
import {ErrorStateMatcherFactory} from "../../services/ErrorStateMatcherFactory";

@Component({
  selector: 'satipasala-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent extends AbstractFieldComponent<FormField<any>>{
  selected: any;
  constructor(public errorStateMatcherFactory: ErrorStateMatcherFactory,public cdRef: ChangeDetectorRef) {
    super(errorStateMatcherFactory, cdRef)

  }
}
