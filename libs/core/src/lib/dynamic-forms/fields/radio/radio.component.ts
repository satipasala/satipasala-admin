import {
  ChangeDetectorRef,
  Component
} from '@angular/core';
import {ErrorStateMatcherFactory} from "../../services/ErrorStateMatcherFactory";
import {AbstractFieldComponent} from "../AbstractFieldComponent";
import {FormField} from "../../../../../../base/src/lib/model/fields/FormField";

@Component({
  selector: 'satipasala-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent  extends AbstractFieldComponent<FormField<any>>{

  constructor(public errorStateMatcherFactory: ErrorStateMatcherFactory,public cdRef: ChangeDetectorRef) {
    super(errorStateMatcherFactory, cdRef)
  }
}
