import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {FormField} from "../../../../../base/src/lib/model/fields/FormField";

@Component({
  selector: 'dynamic-form-component',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent<T extends FormField<any>> implements AfterViewInit {
  @Input() title;
  @Input() disableSubmit;
  @Input() showLabels = true;

  get fields(): T[] {
    return this._fields;
  }

  @Input()
  set fields(value: T[]) {
    this._removeFormControllers();
    this._fields = value;
    this._createForm();
  }

  private _fields: any[];

  @Input() form: FormGroup;

  @Output() onSubmit:EventEmitter< T[]> = new EventEmitter();

  constructor() {
  }

  /**
   * crete field contoles by its type
   */
  ngOnInit() {

  }


  _removeFormControllers(){
    if (this._fields != null &&  this.form != null) {
      for (let f of this._fields) {
        this.form.removeControl(f.id);
      }

    }
  }

  _createForm() {

    if (this._fields != null) {
      let fieldsCtrls = {};
      for (let f of this._fields) {
        /*if (f.type != 'checkbox') {
          fieldsCtrls[f.id] = new FormControl(f.value || '', this.getValidators(f.validators))
        } else {
          let opts = {};
          for (let opt of f.options) {
            opts[opt.value] = new FormControl(opt.value);
          }
          fieldsCtrls[f.id] = new FormGroup(opts)
        }*/

        fieldsCtrls[f.id] = new FormControl(f.value || '', this.getValidators(f.validators))
      }
      if(this.form == null){

        this.form = new FormGroup(fieldsCtrls);
      }else {
        for (let fieldName in fieldsCtrls) {
            this.form.registerControl(fieldName,fieldsCtrls[fieldName])
        }
      }
    }
  }

  /**
   * return the cvalidators from given string types
   * @param validatorName
   */
  getValidators(...validatorName): ValidatorFn[] {
    let validators: ValidatorFn[] = [Validators.required];
    validatorName.forEach(validator => {
      if (validator != null) {
        switch (validator.type) {
          case "required":
            validators.push(Validators.required);
            break;
          case 'email':
            validators.push(Validators.email);
            break;
          default:
            break;
        }
      }
    });

    return validators;
  }

  /**
   * not all fields are compatible with mat form. those fields are indentified here to remove the underline
   * @param field
   */
  isMatFormFieldType(field: FormField<any>) {
    return (
      field.type === 'dropdown' ||
      field.type === 'checkbox' ||
      field.type === 'radio' ||
      field.type === 'selection-list')
  }

  ngAfterViewInit(): void {
  }


  onFormSubmit(){
    this._fields.forEach(field => {
      this.form.controls[field.id].setValue(field.value,{emitEvent:true}) ;
    })

    this.onSubmit.emit(this.form.value)
  }

}
