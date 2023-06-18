import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  AfterViewInit, ContentChild, TemplateRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { filter } from "rxjs/operators";
import { GlobalSearchService } from "@satipasala/base";
import { InfiniteScrollService } from "../../../../base/src/lib/services/InfiniteScrollService";
import { AbstractDataSourceManager } from "../AbstractDataSourceManager";

@Component({
  selector: 's-search-box',
  templateUrl: './s-search-box.component.html',
  styleUrls: ['./s-search-box.component.scss'],
  providers: [GlobalSearchService, InfiniteScrollService]
})
export class SSearchBoxComponent extends AbstractDataSourceManager implements OnInit, OnChanges {
  @Input()
  displayField: string;

  @Input()
  searchFields: string[];

  @Output()
  valueChange: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  searchControlName: string;

  searchFormControl: FormControl;

  @ContentChild(TemplateRef, { static: true, read: TemplateRef }) templateVariable: TemplateRef<any>;

  @Input()
  set parentForm(form: any) {
    this._parentForm = form;
    if (this.searchControlName && form.controls[this.searchControlName]) {
      this.searchFormControl = form.controls[this.searchControlName];
    } else {
      this.searchFormControl = new FormControl('', Validators.required);
    }
  };

  get parentForm() {
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
  fieldWidth: string = '';

  @Input()
  readonly: boolean = false;

  searchSubscription: Subscription;

  constructor(private searchService: GlobalSearchService, protected collectionService: InfiniteScrollService, private formBuilder: FormBuilder) {
    super(collectionService);
  }

  ngOnInit() {
    this.searchSubscription = this.searchService.connect(this.searchFields, filters => {
      this.searchBy = filters;
    }, error => {
      alert(error);
    });

    this.searchFormControl.valueChanges
      .pipe(filter(event => typeof (event) === 'string' || event instanceof String)).subscribe(value => {
        this.searchService.setSearchTerm(value.toString());
      });
  }

  ngOnChanges() {

  }


  displayFunction = (val?: any): string | undefined => {
    return val ? val[this.displayField] : undefined;
  };

  /**
   * Set the value on selection of option
   *
   * @param {boolean} isSelected
   * @param val
   */
  onSelectedOption(isSelected: boolean, val: any): void {
    if (isSelected) {
      this.valueChange.emit(val);
    }
  }

  clearText() {

  }

  nextBatch(offset) {
    //not implemented
  }

}
