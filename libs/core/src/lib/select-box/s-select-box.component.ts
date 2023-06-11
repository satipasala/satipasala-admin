import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {AbstractDataSourceManager} from "../AbstractDataSourceManager";
import {InfiniteScrollService} from "../../../../base/src/lib/services/InfiniteScrollService";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 's-select-box',
  templateUrl: './s-select-box.component.html',
  styleUrls: ['./s-select-box.component.scss']
})
export class SSelectBoxComponent extends AbstractDataSourceManager implements OnInit, OnChanges {
  @Input()
  displayField: string;

  @Input()
  formControlInstance: FormControl;

  @Output()
  valueChange: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  readonly: boolean = false;

  constructor(protected collectionService: InfiniteScrollService) {
    super(collectionService);

  }

  ngOnInit() {
    // console.log("n init")
  }

  ngOnChanges() {

  }


  compareOrgs(i1: any, i2: any): boolean {
    return i1 && i2 && i1.name === i2.name;
  }


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
