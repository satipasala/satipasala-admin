import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Chip} from "../../../../../base/src/lib/model/Chip";
import {ChipList} from "../../../../../base/src/lib/model/ChipList";

@Component({
  selector: 's-chip-list',
  templateUrl: './s-chip-list.component.html',
  styleUrls: ['./s-chip-list.component.css']
})
export class SChipList implements OnInit {

  @Input() chipList:ChipList
  @Output() onChipClick:EventEmitter<Chip> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
