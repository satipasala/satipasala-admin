import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output, 
} from '@angular/core'; 
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { GlobalSearchService } from "@satipasala/base";
import { InfiniteScrollService } from "../../../../base/src/lib/services/InfiniteScrollService";
import { AbstractDataSourceManager } from "../AbstractDataSourceManager";

@Component({
  selector: 's-select-box',
  templateUrl: './s-select-box.component.html',
  styleUrls: ['./s-select-box.component.scss'],
  providers: [GlobalSearchService, InfiniteScrollService]
})
export class SSelectBoxComponent extends AbstractDataSourceManager implements OnInit, OnChanges {
  @Input()
  displayField: string;

  @Input()
  searchControlName: string;

  @Input()
  set parentForm (form: any) {
    this._parentForm = form;
    if (this.searchControlName && form.controls[this.searchControlName]) {
      this.searchFormControl = form.controls[this.searchControlName];
    } else {
      this.searchFormControl = new FormControl('', Validators.required);
    }
  };

  get parentForm () {
    return this._parentForm;
  }

  private _parentForm: FormGroup;

  private _placeholder: string = 'Search';

  @Input()
  set placeholder(value: string) {
    if (value != undefined) {
      this._placeholder = value;
      this.formatRequiredFieldText(value);
    }
  }

  get placeholder() {
    return this._placeholder;
  }

  formatRequiredFieldText(requiredTxt : string){
    this.requiredField = requiredTxt;
  }
  requiredField: string = 'Search text';
 
  @Input()
  searchFormControl: FormControl;

  @Output()
  valueChange: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  readonly: boolean = false;

  searchFields: string[];

  constructor(protected collectionService: InfiniteScrollService, private formBuilder: FormBuilder) {
    super(collectionService);
  }

  ngOnInit () {
    this.searchBy = [];
    this.searchFormControl.valueChanges.subscribe(value => {
      this.onSelectedOption(true, value);
    })
  }

  ngOnChanges () {

  }


  compareOrgs (i1: any, i2: any): boolean {
    return i1 && i2 && i1.name === i2.name;
  }


  /**
   * Set the value on selection of option
   *
   * @param {boolean} isSelected
   * @param val
   */
  onSelectedOption (isSelected: boolean, val: any): void {
    if (isSelected) {
      this.valueChange.emit(val);
    }
  }

  clearText () {

  }

  nextBatch (offset) {
    //not implemented
  }

}
